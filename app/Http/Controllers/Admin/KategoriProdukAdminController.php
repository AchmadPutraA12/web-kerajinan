<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KategoriProduk;
use App\Models\Produk;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

use function Termwind\render;

class KategoriProdukAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategori = KategoriProduk::oldest('created_at')->get();
        return Inertia::render('Admin/Kategori/Index', [
            'kategori' => $kategori,
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
        $request->validate(
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'Nama harus diisi',
            ]
        );

        $kategori = KategoriProduk::create([
            'name' => $request->name,
        ]);

        if ($kategori) {
            return back()->with('success', 'data kategori produk berhasil ditambahkan');
        } else {
            return back()->with('error', 'data kategori produk gagal ditambahkan');
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
        $request->validate([
            'name' => 'required',
        ], [
            'name.required' => 'Nama harus diisi',
        ]);

        $kategori = KategoriProduk::find($id);

        if (!$kategori) {
            return redirect()->back()->withErrors(['kategori_not_found' => 'Kategori tidak ditemukan']);
        }

        $kategori->name = $request->name;
        $kategori->save();

        return redirect()->back()->with('success', 'Kategori telah diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $produk = Produk::where('produk_ketegori_id', $id)->exists();
            
            if ($produk) {
                return Redirect::back()->with('error', 'Data produk tidak dapat dihapus karena terdapat data terkait');
            }

            $kategori = KategoriProduk::findOrFail($id);

            if ($kategori) {
                $kategori->delete();
                Redirect::back()->with('success', 'Data produk berhasil dihapus');
            } else {
                return Redirect::back()->with('error', 'Data produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Terjadi kesalahan saat menghapus data produk');
        }
    }


    public function restore($id)
    {
        try {
            $kategori = KategoriProduk::onlyTrashed()->where('id', $id)->first();

            if ($kategori) {
                $kategori->restore();
                return back()->with('success', 'Data kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Data kategori produk tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function restoreall()
    {
        try {
            $kategori = KategoriProduk::onlyTrashed()->restore();

            if ($kategori > 0) {
                return back()->with('success', 'Semua kategori produk berhasil direstore');
            } else {
                return back()->with('error', 'Tidak ada kategori produk yang dapat direstore');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function delete($id)
    {
        try {
            $kategori = KategoriProduk::onlyTrashed()->where('id', $id)->first();
            if ($kategori) {
                $kategori->forceDelete();
                return back()->with('success', 'Data kategori berhasil dihapus permanen');
            } else {
                return back()->with('error', 'Data kategori tidak ditemukan');
            }
        } catch (\Exception $e) {
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
