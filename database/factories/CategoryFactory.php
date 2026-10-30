<?php

namespace Database\Factories;

use Faker\Guesser\Name;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
        public function definition(): array
        {
            static $names = [
                'Novel',
                'Komik',
                'Majalah',
                'Ensiklopedia',
                'Buku Pelajaran/Paket',
                'Buku Referensi',
                'Buku Fiksi',
                'Buku Non-Fiksi',
            ];
            static $i = 0;

            $name = $names[$i % count($names)];
            $i++;

            return [
                'name' => $name,
                'slug' => str()->slug($name) . str()->lower(str()->random(4)),
            ];
        }
}
