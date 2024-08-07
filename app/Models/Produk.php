<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produk extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    
    protected $fillable = [
        'name',
        'produk_ketegori_id',
        'deskripsion',
        'image',
        'price'
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function kategori(){
        return $this->belongsTo(KategoriProduk::class, 'produk_ketegori_id');
    }
}
