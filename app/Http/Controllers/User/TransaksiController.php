<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/Produk/Keranjang');
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
        $request->validate(
            [
                'name' => 'required',
                'phone' => 'required',
                'address' => 'required',
                'email' => 'nullable',
            ],
        );

        $invoice = mt_rand(1000000, 9999999);

        $transaksi = Transaksi::create([
            'name' => $request->name,
            'no_invoice' => 'INV-' . $invoice,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => $request->email,
            'total_harga' => $request->price,
        ]);

        DetailTransaksi::create([
            'transaksi_id' => $transaksi->id,
            'nama_produk' => $request->nama_produk,
            'quantity' => 1,
            'harga_satuan' => $request->price,
            'total_price' => $request->price,
        ]);

        return back()->with('success', 'Produk Telah Dibeli');
    }

    public function cart(Request $request)
    {
        dd($request->all());
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
