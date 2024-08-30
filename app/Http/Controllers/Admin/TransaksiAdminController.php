<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiAdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transaksi = Transaksi::oldest('name')->get();
        return Inertia::render('Admin/Transaksi/Index', [
            'transaksis' => $transaksi,
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $transaksi = Transaksi::with('detailKategoris')->where('no_invoice', $id)->first();
        return Inertia::render('Admin/Transaksi/Show', [
            'transaksis' => $transaksi
        ]);
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
        $transaksi = Transaksi::findOrFail($id);

        if ($request->has('status')) {
            $transaksi->update([
                'status' => $request->status
            ]);
            return back()->with('success', 'status transaksi berhasil diperbarui');
        } else {
            return back()->with('error', 'status transaksi gagal diperbarui');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
