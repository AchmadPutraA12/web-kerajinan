<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KategoriProduk extends Model
{
    use HasFactory, HasUuids, SoftDeletes;
    
    protected $fillable = [
        'name',
    ];

    protected $dates = [
        'deleted_at'
    ];

    public function produks(){
        return $this->hasMany(Produk::class, 'produk_ketegori_id');
    }
}
