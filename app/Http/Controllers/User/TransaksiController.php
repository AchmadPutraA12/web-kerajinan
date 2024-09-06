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

        $token = "pa5kA2xeyK7X8P_p277C";
        $target = $request->phone;

        $curl = curl_init();

        $message = "Halo! Terima kasih telah berbelanja di Mekar Sari 🌸\n\n";
        $message .= "Kami senang menerima pesanan Anda! 🎉 Berikut detail pesanan Anda:\n\n";
        $message .= $request->nama_produk . " - 1 pcs\n";
        $message .= "Total Pesanan: Rp. " . number_format($request->price, 2, ",", ".") . "\n";
        $message .= "Ongkos Kirim: Rp[Biaya Pengiriman]\n";
        $message .= "Grand Total: Rp[Total Keseluruhan]\n\n";
        $message .= "✨ Segera lakukan pembayaran agar pesanan Anda bisa segera kami proses! ✨\n\n";
        $message .= "Anda dapat melakukan pembayaran melalui metode berikut:\n\n";
        $message .= "Transfer Bank:\n";
        $message .= "Bank: [Nama Bank]\n";
        $message .= "Nomor Rekening: [1234567890]\n";
        $message .= "Atas Nama: [Nama Pemilik Rekening]\n\n";
        $message .= "E-Wallet:\n";
        $message .= "Gopay: [Nomor Gopay]\n";
        $message .= "Dana: [Nomor Dana]\n\n";
        $message .= "COD (Bayar di tempat)\n\n";
        $message .= "Note: Setelah melakukan pembayaran, mohon kirimkan bukti transfer ke kami di whatsapp ini agar kami dapat segera memproses pesanan Anda. 📦\n\n";
        $message .= "Jika ada pertanyaan atau kebutuhan lainnya, jangan ragu untuk menghubungi kami. Tim Mekar Sari selalu siap membantu Anda! 😊";

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1, 
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => array(
                'target' => $target,
                'message' => $message,
            ),
            CURLOPT_HTTPHEADER => array(
                "Authorization: $token"
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);

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

        try {
            $token = "pa5kA2xeyK7X8P_p277C";
            $target = $request->phone;

            $curl = curl_init();

            $message = "Halo! Terima kasih telah berbelanja di Mekar Sari 🌸\n\n";
            $message .= "Kami senang menerima pesanan Anda! 🎉 Berikut detail pesanan Anda:\n\n";
            foreach ($request->cartItems as $item) {
                $message .= $item['name'] . " - " . $item['quantity'] ." pcs\n";
            }
            $message .= "Total Pesanan: Rp. " . number_format($request->totalPrice, 2, ",", ".") . "\n";
            $message .= "Ongkos Kirim: Rp[Biaya Pengiriman]\n";
            $message .= "Grand Total: Rp[Total Keseluruhan]\n\n";
            $message .= "✨ Segera lakukan pembayaran agar pesanan Anda bisa segera kami proses! ✨\n\n";
            $message .= "Anda dapat melakukan pembayaran melalui metode berikut:\n\n";
            $message .= "Transfer Bank:\n";
            $message .= "Bank: [Nama Bank]\n";
            $message .= "Nomor Rekening: [1234567890]\n";
            $message .= "Atas Nama: [Nama Pemilik Rekening]\n\n";
            $message .= "E-Wallet:\n";
            $message .= "Gopay: [Nomor Gopay]\n";
            $message .= "Dana: [Nomor Dana]\n\n";
            $message .= "COD (Bayar di tempat)\n\n";
            $message .= "Note: Setelah melakukan pembayaran, mohon kirimkan bukti transfer ke kami di whatsapp ini agar kami dapat segera memproses pesanan Anda. 📦\n\n";
            $message .= "Jika ada pertanyaan atau kebutuhan lainnya, jangan ragu untuk menghubungi kami. Tim Mekar Sari selalu siap membantu Anda! 😊";

            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://api.fonnte.com/send',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array(
                    'target' => $target,
                    'message' => $message,
                ),
                CURLOPT_HTTPHEADER => array(
                    "Authorization: $token"
                ),
            ));
            $response = curl_exec($curl);
            curl_close($curl);

            $invoice = mt_rand(1000000, 9999999);

            $transaksi = Transaksi::create([
                'name' => $request->name,
                'no_invoice' => 'INV-' . $invoice,
                'phone' => $request->phone,
                'address' => $request->address,
                'email' => $request->email,
                'total_harga' => $request->totalPrice,
            ]);

            // dd($request->cartItems);
            foreach ($request->cartItems as $item) {
                DetailTransaksi::create([
                    'transaksi_id' => $transaksi->id,
                    'nama_produk' => $item['name'],
                    'quantity' => $item['quantity'],
                    'harga_satuan' => $item['price'],
                    'total_price' => $item['price'] * $item['quantity'],
                ]);
            }
            return back()->with('success', 'Produk Telah Dibeli');
        } catch (\Exception $e) {
            return back()->with('error', 'produk gagal dibeli');
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
