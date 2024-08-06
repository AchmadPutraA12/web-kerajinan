<?php

use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\KategoriProdukAdminController;
use App\Http\Controllers\Admin\ProdukAdminController;
use App\Http\Controllers\Admin\TransaksiAdminController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('index');
    Route::resource('transaksi', TransaksiAdminController::class)->names('transaksi');
    Route::resource('kategori-produk', KategoriProdukAdminController::class)->names('kategori-produk');
    Route::resource('produk', ProdukAdminController::class)->names('produk');
    Route::resource('backup', BackupController::class)->names('backup');

    Route::get('/kategori-produk/backup/{id}', [KategoriProdukAdminController::class, 'restore'])->name('kategori-produk.restore');
    Route::get('/produk/backup/{id}', [ProdukAdminController::class, 'restore'])->name('produk.restore');

    Route::get('/kategori-produk/delete/{id}', [KategoriProdukAdminController::class, 'delete'])->name('kategori-produk.delete');
    Route::get('/produk/delete/{id}', [ProdukAdminController::class, 'delete'])->name('produk.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
