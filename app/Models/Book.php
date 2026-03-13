<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Enums\BookStatus;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
//use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Stock;
use App\Observers\BookObserver;

#[ObservedBy(BookObserver::class)]
class Book extends Model
{
    use HasFactory;
    use LogsActivity;
    protected $fillable = [
        'judul',
        'slug',
        'tahun_terbit',
        'isbn',
        'deskripsi',
        'publisher_id',
        'kondisi',
        'category_id',
        'stok',
        'cover'
    ];
    
    protected $casts = [
        'kondisi' => BookStatus::class,
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable() 
            ->logOnlyDirty() 
            ->dontSubmitEmptyLogs();
    }
public function getCoverUrlAttribute()
{
    return $this->cover
        ? asset('storage/' . $this->cover)
        : asset('storage/books/no_cover.jpg');
}


    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }
    public function borroweds()
    {
        return $this->hasMany(Borrowed::class);
    }

    public function stock_rombel_borrow(int $qty): void
{
    $this->stock->decrement('available', $qty);
    $this->stock->increment('borrowed', $qty);
}
 
public function stock_rombel_return(int $qty): void
{
    $this->stock->increment('available', $qty);
    $this->stock->decrement('borrowed', $qty);
}

    public function scopeFilter(Builder $query, array $filters) : void
    {
        $query->when($filters['search']?? null, function($query, $search){

            $query->where(function($query) use ($search) {
                $query->whereAny([
                    'id',
                    'judul',
                    'slug',
                    'tahun_terbit',
                    'isbn',
                    'kondisi',
                ], 'REGEXP', $search);
            });
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sort['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sort['direction'] ?? 'asc');
        });
    }

    public function updateStock($columnToDecrement, $columnToIncrement)
    {

        $stock = $this->stock;
        if(!$stock) {
            throw new \Exception('Stok buku tidak ditemukan.');
        }
        if($stock->$columnToDecrement > 0) {
            return $stock->update([
                $columnToDecrement => $stock->$columnToDecrement - 1,
                $columnToIncrement => $stock->$columnToIncrement + 1,
                
            ]);
            

            
        } else {
            throw new \Exception('Stok tidak mencukupi untuk melakukan peminjaman.');
        }
    }

    public function stock_borrowed(){
        return $this->updateStock('available', 'borrowed');
    }
    public function stock_lost(){
        return $this->updateStock('borrowed', 'lost');
    }
   public function stock_damaged(){
       return $this->updateStock('borrowed', 'damaged');
   }
    public function stock_returned(){
        return $this->updateStock('borrowed', 'available');
    }

    public static function leastLoanBooks($limit = 5)
    {
        return self::query()
            ->select(['id', 'judul', 'slug', 'publisher_id','category_id', 'cover'])
            ->withCount(['borroweds as loans_count'])
            ->orderBy('loans_count')
            ->limit($limit)
            ->get();
    }

    
    public static function mostLoanBooks($limit = 5)
    {
        return self::query()
            ->select(['id', 'judul','slug', 'publisher_id','category_id','cover'])
            ->withCount(['borroweds as loans_count'])
            ->orderByDesc('loans_count')
            ->limit($limit)
            ->get();
    }

    public static function newestBooks($limit = 5)
    {
        return self::query()
            ->select(['id', 'judul', 'slug', 'publisher_id','category_id','cover'])
            ->latest('created_at')
            ->limit($limit)
            ->get();
    }
}
