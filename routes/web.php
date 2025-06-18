<?php

use App\Http\Controllers\Admin\BackupController;
use App\Http\Controllers\Admin\ContactAdminController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\KategoriProdukAdminController;
use App\Http\Controllers\Admin\ProdukAdminController;
use App\Http\Controllers\Admin\TransaksiAdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\GuestController;
use App\Http\Controllers\User\ProdukController;
use App\Http\Controllers\User\TransaksiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GuestController::class, 'index'])->name('home');

Route::get('/produk', [ProdukController::class, 'index'])->name('produk.index');
Route::get('/produk/kategori/{id}', [ProdukController::class, 'show'])->name('produk.show');
Route::get('/produk/{id}', [ProdukController::class, 'detail'])->name('produk.detail');
Route::post('/transaksi', [TransaksiController::class, 'store'])->name('transaksi.store');
Route::post('/transaksi/cart', [TransaksiController::class, 'cart'])->name('transaksi.cart');
Route::get('/keranjang', [TransaksiController::class, 'index'])->name('keranjang.index');

Route::middleware('auth')->group(function () {
    Route::get('/transaksi', [TransaksiController::class, 'indexTransaksi'])->name('transaksi.index');
    Route::get('/transaksi/{id}', [TransaksiController::class, 'show'])->name('transaksi.show');
});

Route::middleware('auth', 'CekCategory:1')->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', [DashboardAdminController::class, 'index'])->name('dashboard');
    Route::resource('transaksi', TransaksiAdminController::class)->names('transaksi');
    Route::resource('kategori-produk', KategoriProdukAdminController::class)->names('kategori-produk');
    Route::resource('produk', ProdukAdminController::class)->names('produk');
    Route::resource('backup', BackupController::class)->names('backup');
    Route::resource('kontak-admin', ContactAdminController::class)->names('kontak-admin');

    Route::get('/kategori-produk/backup/{id}', [KategoriProdukAdminController::class, 'restore'])->name('kategori-produk.restore');
    Route::get('/produk/backup/{id}', [ProdukAdminController::class, 'restore'])->name('produk.restore');

    Route::get('/kategori-produk/delete/{id}', [KategoriProdukAdminController::class, 'delete'])->name('kategori-produk.delete');
    Route::get('/produk/delete/{id}', [ProdukAdminController::class, 'delete'])->name('produk.delete');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
