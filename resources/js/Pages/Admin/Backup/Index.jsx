import React, { useEffect, useState } from 'react';
import DataTableCustom from '@/Components/DataTableCustom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import kategoriColumns from '@/Pages/Admin/Backup/Colum/Kategori';
import produkColumns from '@/Pages/Admin/Backup/Colum/Produk';

const Index = ({ kategori, produk }) => {
    const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
        return localStorage.getItem("defaultValueTabsBackup") || "produkKategori";
    });

    useEffect(() => {
        localStorage.setItem("defaultValueTabsBackup", defaultValueTabs);
    }, [defaultValueTabs]);

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
                <DataTableCustom data={kategori} columns={kategoriColumns} />
            </TabsContent>
            <TabsContent value="produk" className="mt-32 lg:mt-0">
                <DataTableCustom data={produk} columns={produkColumns} />
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
        user={page.props.auth.user}
    />
);

export default Index;
