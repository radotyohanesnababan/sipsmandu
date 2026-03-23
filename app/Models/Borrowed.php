<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Borrowed extends Model
{
    protected $fillable = [
        'user_nisn',
        'book_id',
        'borrowed_at',
        'expired_at',
        'status',
        'returned_at',
    ];
    protected $casts = [
        'borrowed_at' => 'date',
        'returned_at' => 'date',
        'expired_at' => 'date',
    ];
    public function user() 
    {
        return $this->belongsTo(User::class, 'user_nisn', 'nisn');
    }
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
    public function returnBook()
    {
        return $this->hasOne(ReturnBook::class, 'borrowed_id', 'id');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->whereAny([
                    'id',
                    'user_nisn',
                    'book_id',
                    'returned_at',
                    'borrowed_at',
                ], 'REGEXP', $search);
            });
        });
    }
    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }

    public static function checkBorrowedBook(int $user_nisn, int $book_id): bool
{
    return self::query()
        ->where('user_nisn', $user_nisn)
        ->where('book_id', $book_id)
        ->whereIn('status', ['pending', 'active']) // ← tambah ini
        ->exists();
}

    public static function activeBorrowedBook(int $user_nisn): int
{
    return self::query()
        ->where('user_nisn', $user_nisn)
        ->whereIn('status', ['pending', 'active']) // ← tambah ini
        ->count();
}

    public static function totalLoanBooks(): array
    {
        return [
            'days'=> self::whereDate('created_at', Carbon::now()->toDateString())->count(),
            'weeks'=> self::whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->count(),
            'months'=> self::whereBetween('created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->whereYear('created_at', Carbon::now()->year)->count(),
            'years'=> self::whereBetween('created_at', [Carbon::now()->startOfYear(), Carbon::now()->endOfYear()])->count(),
        ];
    }
}
