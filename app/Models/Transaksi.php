<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    public $guarded = ['id'];

    public function detailKategoris()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaksi_id');
    }
}
