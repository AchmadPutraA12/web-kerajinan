<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaksi_id',
        'nama_produk',
        'quantity',
        'harga_satuan',
        'total_price',
    ];

    public function Kategori(){
        return $this->belongsTo(Transaksi::class, 'transaksi_id');
    }
}
