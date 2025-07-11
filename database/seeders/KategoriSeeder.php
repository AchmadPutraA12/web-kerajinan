<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategoris = [
            [
                'id' => '4f08a083-6715-4c3c-a264-c9bc52510a91',
                'name' => 'Lantai Box',
            ],
            [
                'id' => '4f08a083-6715-4c3c-a264-c9bc52510121',
                'name' => 'Lantai Roll',
            ],
        ];

        foreach ($kategoris as $kategori) {
            \App\Models\KategoriProduk::create($kategori);
        }
    }
}
