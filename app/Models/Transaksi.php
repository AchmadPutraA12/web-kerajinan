<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'no_invoice',
        'name',
        'phone',
        'address',
        'email',
        'total_harga',
        'status',
        'user_id',
    ];

    public function detailKategoris(){
        return $this->hasMany(DetailTransaksi::class, 'transaksi_id');
    }
}
