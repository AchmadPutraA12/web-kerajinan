import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import ProductLayout from "@/Layouts/ProductLayout";
import { FormatRupiah } from "@arismun/format-rupiah";
import { Link } from "@inertiajs/react";
import { Skeleton } from "@/Components/ui/skeleton";

export default function Index({ produks, kategoris, contact }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchContainerRef = useRef(null);

    useEffect(() => {
        if (produks) {
            const filtered = produks.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSuggestions(filtered);
            setSelectedIndex(-1);
        }
    }, [searchQuery, produks]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchContainerRef.current &&
                !searchContainerRef.current.contains(event.target)
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter" && selectedIndex >= 0) {
            setSearchQuery(suggestions[selectedIndex].name);
            setSuggestions([]);
        }
    };

    const filteredProducts = suggestions.length > 0 ? suggestions : produks;

    return (
        <ProductLayout contact={contact} kategoris={kategoris} head="Produk">
            <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center top-0 sticky z-20 bg-white rounded-xl mb-5 justify-between">
                    <Input
                        placeholder="Cari Produk"
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {/* Menggunakan grid Tailwind */}
                    {filteredProducts && filteredProducts.map(product => (
                        <div key={product.id} className="p-4 rounded-xl border shadow-md">
                            <img className="object-contain w-full h-40 rounded-lg" src={`/storage/${product.image}`} alt={product.name} />
                            <div className="flex flex-col mt-6 gap-2">
                                <span className="text-sm lg:text-2xl font-semibold">
                                    {product.name}
                                </span>
                                <div className="text-sm lg:text-xl">
                                    <FormatRupiah value={product.price} />
                                </div>
                                <Button asChild>
                                    <Link href={`/produk/${product.id}`}>Detail Produk</Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProductLayout>
    );
}
