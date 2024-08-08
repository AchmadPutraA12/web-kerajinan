<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriProduk;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProdukAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategoris = KategoriProduk::all();
        $produks = Produk::with('kategori')->oldest('created_at')->get();
        return Inertia::render('Admin/Produk/Index', [
            'produks' => $produks,
            'kategoris' => $kategoris
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required',
            'produk_ketegori_id' => 'required',
            'deskripsion' => 'required',
            'price' => 'required',
            'image' => 'required|mimes:png,jpg,jpeg|max:2048',
        ]);

        $foto = $request->file('image');
        $filename = uniqid() . '.webp';
        $path = 'product-image/' . $filename;

        if (!Storage::disk('public')->exists('product-image')) {
            Storage::disk('public')->makeDirectory('product-image');
        }

        $manager = new ImageManager(new Driver());
        $image = $manager->read($foto->getRealPath());
        $image->toWebp()->save(storage_path('app/public/' . $path));

        $produk = Produk::create([
            'name' => $request->name,
            'produk_ketegori_id' => $request->produk_ketegori_id,
            'deskripsion' => $request->deskripsion,
            'price' => $request->price,
            'image' => $path,
        ]);

        if ($produk) {
            return back()->with('success', 'data Produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data Produk gagal ditambahkan');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->all());
        try {
            $request->validate([
                'name' => 'required',
                'produk_ketegori_id' => 'required',
                'deskripsion' => 'required',
                'price' => 'required',
                'image' => 'nullable|mimes:png,jpg,jpeg,webp|max:2048',
            ]);

            $product = Produk::find($id);

            if (!$product) {
                return back()->with('error', 'Data Produk tidak ditemukan');
            }

            $product->update([
                'name' => $request->name,
                'produk_ketegori_id' => $request->produk_ketegori_id,
                'deskripsion' => $request->deskripsion,
                'price' => $request->price,
            ]);

            if ($request->hasFile('image')) {
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }

                $foto = $request->file('image');
                $filename = uniqid() . '.webp';
                $path = 'product-image/' . $filename;

                if (!Storage::disk('public')->exists('product-image')) {
                    Storage::disk('public')->makeDirectory('product-image');
                }

                $manager = new ImageManager(new Driver());
                $image = $manager->read($foto->getRealPath());
                $image->toWebp()->save(storage_path('app/public/' . $path));

                $product->update(['image' => $path]);
            }

            return back()->with('success', 'Data Produk berhasil diubah');
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $produk = Produk::find($id);
            if ($produk) {
                $produk->delete();
                return back()->with('success', 'data produk berhasil di hapus');
            } else {
                return back()->with('error', 'data produk produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function restore($id)
    {
        try {
            $produk = Produk::onlyTrashed()->where('id', $id)->first();

            if ($produk) {
                $produk->restore();
                return back()->with('success', 'Data produk produk berhasil direstore');
            } else {
                return back()->with('error', 'Data produk produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $produk = Produk::onlyTrashed()->restore();

            if ($produk > 0) {
                return back()->with('success', 'Semua produk produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada produk produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $produk = Produk::onlyTrashed()->where('id', $id)->first();
            if ($produk) {
                if ($produk->image) {
                    Storage::disk('public')->delete($produk->image);
                    $produk->forceDelete();
                }
                return back()->with('success', 'Data produk berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
