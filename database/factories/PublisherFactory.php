<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publisher>
 */
class PublisherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
            static $names = [
                'Gramedia',
                'Erlangga',
                'Mizan',
                'Bhuana Ilmu Populer',
                'Salam Semesta',
                'Pustaka Alvabet',
                'Penerbit Andi',
                'Penerbit Haru',
                'Penerbit Buku Kompas',
                'Penerbit Bentang Pustaka',
                'Penerbit Republika',
                'Penerbit Hikmah',
                'Penerbit Diva Press',
                'Penerbit Grasindo',
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