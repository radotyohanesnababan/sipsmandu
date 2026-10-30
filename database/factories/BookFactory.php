<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Models\Stock;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
{
    static $no = 0;
    $no++;

    $judul = 'Buku Contoh ' . $no;

    return [
        'judul' => $judul,
        'slug' => Str::slug($judul) . '-' . Str::lower(Str::random(5)),
        'tahun_terbit' => random_int(1990, 2025),
        'isbn' => '978' . str_pad((string) random_int(0, 9999999999), 10, '0', STR_PAD_LEFT),
        'deskripsi' => 'Deskripsi contoh untuk ' . $judul . '.',
        'kondisi' => 'Tersedia',
        'cover' => 'storage/covers/samplecover.jpg',
        'category_id' => Category::inRandomOrder()->value('id'),
        'publisher_id' => Publisher::inRandomOrder()->value('id'),
    ];
}
}
