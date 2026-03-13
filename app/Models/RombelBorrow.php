<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RombelBorrow extends Model
{
    protected $fillable = [
        'user_nisn',
        'book_id',
        'kelas',
        'qty',
        'borrowed_at',
        'due_at',
        'returned_at',
        'status',
        'catatan',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime:d-m-Y H:i',
            'due_at'      => 'datetime:d-m-Y H:i',
            'returned_at' => 'datetime:d-m-Y H:i',
        ];
    }

    // ─── Relations ───────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_nisn', 'nisn');
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // ─── Helpers ─────────────────────────────────────────────

    public function getIsLateAttribute(): bool
    {
        return $this->status === 'Dipinjam' && Carbon::now()->isAfter($this->due_at);
    }

    public function getLateDurationAttribute(): string
    {
        if (! $this->is_late) return '';
        return Carbon::now()->diff($this->due_at)->format('%h jam %i menit');
    }

    // Auto-update status jadi Terlambat kalau sudah lewat due_at
    public function syncStatus(): void
    {
        if ($this->status === 'Dipinjam' && Carbon::now()->isAfter($this->due_at)) {
            $this->update(['status' => 'Terlambat']);
        }
    }
}