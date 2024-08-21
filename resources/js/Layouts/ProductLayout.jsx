import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import GuestLayout from "./GuestLayout";
import Toastify from "@/Components/Toastify";
import { toast } from "react-toastify";

export default function ProductLayout({ children, head, kategoris, contact, flash }) {
    return (
        <GuestLayout head={head} contact={contact} flash={flash}>
            <section className="mt-24 lg:mt-32 md:px-16 flex container gap-5 px-4 lg:px-20 relative">
               
                <div className="w-1/4 hidden lg:block">
                    <div className="bg-white p-4 border sticky top-20 rounded-xl flex flex-col">
                        <h2 className="text-lg font-semibold">Kategori Produk</h2>
                        <div className="flex flex-col gap-3">
                            <Link href={route("produk.index")}>
                                All
                            </Link>
                            {kategoris.map(kategori => (
                                <Link key={kategori.id} href={`/produk/kategori/${kategori.id}`}>
                                    {kategori.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full">{children}</div>
            </section>
        </GuestLayout>
    );
}
