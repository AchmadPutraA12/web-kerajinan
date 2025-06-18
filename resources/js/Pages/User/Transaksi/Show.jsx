import AdminLayout from '@/Layouts/AdminLayout';
import React from 'react';
import { Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { FormatRupiah } from "@arismun/format-rupiah";
import GuestLayout from '@/Layouts/GuestLayout';

const Show = ({ auth, transaksis, contact }) => {
    return (
        <GuestLayout contact={contact} head="Home">
            <div className="w-full overflow-auto mt-32 pl-32 pr-32">
                <Link
                    href="/transaksi"
                    className="flex underline mt-4 items-center gap-2"
                >
                    <ChevronLeft />
                    <span>Kembali</span>
                </Link>

                <div className="w-full mt-6 bg-[#6C4E31] text-white p-2 pl-4">
                    <span className="font-semibold">Customer</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl">
                    <div className="grid grid-cols-2 gap-4 text-lg font-medium">
                        <span>Nama Pembeli</span>
                        <span>: {transaksis.name}</span>

                        <span>Email Pembeli</span>
                        <span>: {transaksis.email || 'N/A'}</span>

                        <span>No Telepon</span>
                        <span>: {transaksis.phone}</span>

                        <span>Alamat Pembeli</span>
                        <span>: {transaksis.address}</span>
                    </div>
                </div>

                <div className="w-full mt-4 bg-[#6C4E31] text-white p-2 pl-4">
                    <span className="font-semibold">Detail Transaksi</span>
                </div>
                <ul className="list-decimal gap-4 p-4 rounded-xl">
                    {transaksis.detail_kategoris.map((item) => (
                        <li
                            key={item.id}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-4"
                        >
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                                <span className="text-lg font-medium">
                                    {item.nama_produk}
                                </span>
                                <span className="hidden md:block">-</span>
                                <span className="text-lg font-medium">
                                    {item.quantity} pcs
                                </span>
                            </div>

                            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                                <span className="text-lg">
                                    Harga Satuan : <FormatRupiah value={item.harga_satuan} />
                                </span>
                                <span className="text-lg">
                                    Total Harga : <FormatRupiah value={item.total_price} />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </GuestLayout>
    );
};

export default Show;
