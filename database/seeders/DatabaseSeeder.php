<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Kelas;
use App\Models\Publisher;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Buat user admin
        User::factory()->create([
            'nisn' => '1370198567',
            'nama' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => 'password',
        ])->assignRole(Role::firstOrCreate(['name' => 'admin']));

        // Buat user member
        User::factory()->create([
            'nisn' => '2167284722',
            'nama' => 'Test Member',
            'email' => 'member@example.com',
            'password' => 'password',
        ])->assignRole(Role::firstOrCreate(['name' => 'member']));

        // Buat kategori & publisher
        Publisher::factory()->count(11)->create();
        Category::factory()->count(8)->create();

        //Buat Kelas
        $kelasList = [
            'X',
            'XI',
            'XII',
        ];

        foreach ($kelasList as $tingkat) {
            Kelas::firstOrCreate(['tingkat' => $tingkat]);
        }

    }
}
