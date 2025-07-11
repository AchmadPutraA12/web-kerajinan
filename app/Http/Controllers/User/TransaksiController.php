<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\DetailTransaksi;
use App\Models\Transaksi;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function indexTransaksi()
    {
        $transaksi = Transaksi::oldest('name')->where('user_id', Auth::user()->id)->get();
        return Inertia::render('User/Transaksi/Index', [
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
        $request->validate(
            [
                'phone' => ['required', 'string', 'regex:/^0[0-9]{9,11}$/'],
                'kode_pos' => ['required', 'string', 'digits_between:4,8'],
                'nama_jalan' => ['required', 'string', 'max:255'],
                'no_rumah' => ['required', 'string', 'max:20'],
                'detail_lainnya' => ['nullable', 'string', 'max:255'],
                'address' => ['required', 'string', 'max:255'],
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
            'user_id' => Auth::user()->id,
            'name' => Auth::user()->name,
            'no_invoice' => 'INV-' . $invoice,
            'phone' => $request->phone,
            'address' => $request->address,
            'email' => Auth::user()->email,
            'total_harga' => $request->price,
            'kode_pos' => $request->kode_pos,
            'nama_jalan' => $request->nama_jalan,
            'no_rumah' => $request->no_rumah,
            'detail_lainnya' => $request->detail_lainnya,

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
        $request->validate(
            [
                'phone' => ['required', 'string', 'regex:/^0[0-9]{9,11}$/'],
                'kode_pos' => ['required', 'string', 'digits_between:4,8'],
                'nama_jalan' => ['required', 'string', 'max:255'],
                'no_rumah' => ['required', 'string', 'max:20'],
                'detail_lainnya' => ['nullable', 'string', 'max:255'],
                'address' => ['required', 'string', 'max:255'],
            ],
        );

        try {
            $token = "pa5kA2xeyK7X8P_p277C";
            $target = $request->phone;

            $curl = curl_init();

            $message = "Halo! Terima kasih telah berbelanja di Mekar Sari 🌸\n\n";
            $message .= "Kami senang menerima pesanan Anda! 🎉 Berikut detail pesanan Anda:\n\n";
            foreach ($request->cartItems as $item) {
                $message .= $item['name'] . " - " . $item['quantity'] . " pcs\n";
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
                'user_id' => Auth::user()->id,
                'name' => Auth::user()->name,
                'no_invoice' => 'INV-' . $invoice,
                'phone' => $request->phone,
                'address' => $request->address,
                'email' => Auth::user()->email,
                'total_harga' => $request->totalPrice,
                'kode_pos' => $request->kode_pos,
                'nama_jalan' => $request->nama_jalan,
                'no_rumah' => $request->no_rumah,
                'detail_lainnya' => $request->detail_lainnya,
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
        $transaksi = Transaksi::with('detailKategoris')->where('no_invoice', $id)->first();
        return Inertia::render('User/Transaksi/Show', [
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
