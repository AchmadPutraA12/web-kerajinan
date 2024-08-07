<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriProduk;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BackupController extends Controller
{
    public function index()
    {
        $kategori = KategoriProduk::onlyTrashed()->get();
        $produk = Produk::with('kategori')->onlyTrashed()->get();
        return Inertia::render('Admin/Backup/Index', [
            'kategori' => $kategori,
            'produk' => $produk,
        ]);
    }
}
