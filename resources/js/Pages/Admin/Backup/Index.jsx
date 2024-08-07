import React, { useEffect, useState } from 'react';
import DataTableCustom from '@/Components/DataTableCustom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/lib/FormatDate";
import { Link } from "@inertiajs/react";
import DeleteDataPermanent from "@/Components/DeleteDataPermanent";
import { FormatRupiah } from '@arismun/format-rupiah';

const Index = ({ kategori, produk }) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultValueTabsBackup") || "produkKategori";
    });

    useEffect(() => {
        localStorage.setItem("defaultValueTabsBackup", defaultValueTabs);
    }, [defaultValueTabs]);

    const columnsKategori = [
        {
            id: "No",
            header: "No",
            cell: (info) => info.row.index + 1,
            enableSorting: false,
            enableHiding: false,
            sortUndefined: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            sortingFn: "text",
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span>{formatDate(row.getValue("created_at"))}</span>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                const kategori = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            preserveScroll
                            preserveState
                            className="text-xs font-semibold bg-green-100 border border-green-500 px-4 py-2 rounded-md text-green-500  hover:bg-green-200 hover:text-gray-white hover:border-gray-400"
                            type="button"
                            method="get"
                            href={route(
                                "admin.kategori-produk.restore",
                                kategori.id
                            )}
                        >
                            Restore
                        </Link>
                        <DeleteDataPermanent
                            paramLink="admin.kategori-produk.delete"
                            id={kategori.id}
                        />
                    </div>
                );
            },
        },
    ];

    const columnsProduk = [
        {
            id: "No",
            header: "No",
            cell: (info) => info.row.index + 1,
            enableSorting: false,
            enableHiding: false,
            sortUndefined: false,
        },
        {
            id: "kategori.name",
            accessorKey: "kategori.name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Kategori
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return (
                    <span className=" bg-yellow-200 rounded-lg px-4 py-1">
                        {row.original.kategori.name}
                    </span>
                );
            },
            sortingFn: "text",
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            sortingFn: "text",
        },
        {
            id: "deskripsion",
            accessorKey: "deskripsion",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Deskripsi
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            sortingFn: "text",
        },
        {
            accessorKey: "image",
            header: "Gambar",
            cell: ({ row }) => {
                return (
                    <img
                        className="size-32 md:size-20 rounded-lg object-contain"
                        src={
                            window.location.origin +
                            "/storage/" +
                            row.getValue("image")
                        }
                        alt=""
                    />
                );
            },
        },
        {
            accessorKey: "price",
            header: "Harga",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Deskripsi
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <FormatRupiah value={row.getValue("price")} />;
            },
        },
        {
            accessorKey: "created_at",
            header: ({ column }) => (
                <Button
                    variant="tableHeader"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Dibuat
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span>{formatDate(row.getValue("created_at"))}</span>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                const produk = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Link
                            preserveScroll
                            preserveState
                            className="text-xs font-semibold bg-green-100 border border-green-500 px-4 py-2 rounded-md text-green-500  hover:bg-green-200 hover:text-gray-white hover:border-gray-400"
                            type="button"
                            method="get"
                            href={route(
                                "admin.produk.restore",
                                produk.id
                            )}
                        >
                            Restore
                        </Link>
                        <DeleteDataPermanent
                            paramLink="admin.produk.delete"
                            id={produk.id}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <Tabs defaultValue={defaultValueTabs} className="mt-6">
            <TabsList className="grid grid-cols-2 lg:grid-cols-7 gap-4 h-14 w-full md:h-12">
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("produkKategori")}
                    value="produkKategori"
                    className="relative pr-6"
                >
                    Kategori Produk
                    {kategori.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${kategori.length <= 9
                                ? "p-1 px-2.5"
                                : "p-1 px-1.5"
                                }`}
                        >
                            {kategori.length}
                        </div>
                    ) : null}
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setDefaultValueTabs("produk")}
                    value="produk"
                    className="relative pr-6"
                >
                    Produk
                    {produk.length ? (
                        <div
                            className={`absolute bg-yellow-500 border-yellow-100 border-2 rounded-full -top-2 -right-2 ${produk.length <= 9
                                ? "p-1 px-2.5"
                                : "p-1 px-1.5"
                                }`}
                        >
                            {produk.length}
                        </div>
                    ) : null}
                </TabsTrigger>
            </TabsList>
            <TabsContent value="produkKategori" className="mt-32 lg:mt-0">
                <DataTableCustom data={kategori} columns={columnsKategori} />
            </TabsContent>
            <TabsContent value="produk" className="mt-32 lg:mt-0">
                <DataTableCustom data={produk} columns={columnsProduk} />
            </TabsContent>
        </Tabs>
    );
};

Index.layout = (page) => (
    <AdminLayout
        children={page}
        head="backup"
        tittleDesc="Terhubung dengan berbagai fitur dan pengaturan untuk Backup data Database."
        tittleHead="Manajemen Backup Data"
        flash={page.props.flash}
    />
);

export default Index;
