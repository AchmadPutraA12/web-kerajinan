<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProdukSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //


        $produks = [
            [
                'id' => '23feace2-7b13-41cb-a3ae-36b0a59bd145',
                'name' => 'sate',
                'produk_ketegori_id' => '4f08a083-6715-4c3c-a264-c9bc52510a91',
                'deskripsion' => 'sate berasal dari madura',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'price' => 10000,
            ],
            [
                'id' => '84e9c52f-7903-4220-9136-00d51beaba18',
                'name' => 'nastar',
                'produk_ketegori_id' => '4f08a083-6715-4c3c-a264-c9bc52510121',
                'deskripsion' => 'jajan nastar enaak',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'price' => 20000,
            ],
            [
                'id' => 'b6bb5182-9aaa-46a8-b750-4a81eedf4c3f',
                'name' => 'aqua',
                'produk_ketegori_id' => '4f08a083-6715-4c3c-a264-c9bc52510a91',
                'deskripsion' => 'minuman botol',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'price' => 3000,
            ],
            [
                'id' => '7312d6de-b3d6-445f-8bec-6e1fed76e674',
                'name' => 'monitor',
                'produk_ketegori_id' => '4f08a083-6715-4c3c-a264-c9bc52510121',
                'deskripsion' => 'monitor ini jajan',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'price' => 900000,
            ],
        ];

        foreach ($produks as $produk) {
            \App\Models\Produk::create($produk);
        }
    }
}
