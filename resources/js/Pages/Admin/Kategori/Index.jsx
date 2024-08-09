import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/Components/ui/tabs';
import AdminLayout from '@/Layouts/AdminLayout';
import React, { useEffect, useState } from 'react';
import Create from './Create';
import DataTableCustom from '@/Components/DataTableCustom';
import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Edit from "./Edit";
import DeleteData from "@/Components/DeleteData";
import {formatDate} from "@/lib/FormatDate"

const Index = ({ kategori, flash, auth }) => {
  const [defaultValueTabs, setDefaultValueTabs] = useState(() => {
    return localStorage.getItem("defaultValueTabs") || "add";
  });

  useEffect(() => {
    localStorage.setItem("defaultValueTabs", defaultValueTabs);
  }, [defaultValueTabs]);

  const columns = [
    {
      id: "No",
      header: "No",
      cell: (info) => info.row.index + 1,
      enableSorting: false,
      enableHiding: false,
      sortUndefined: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="tableHeader"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Nama
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      sortingFn: "text",
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="tableHeader"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Tanggal Dibuat
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{formatDate(row.getValue("created_at"))}</span>;
      },
      sortingFn: "text",
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => {
        const product_category = row.original;

        return (
          <div className="flex items-center gap-2">
            <Edit category_product={product_category} />
            <DeleteData
              paramId={`/admin/kategori-produk/${product_category.id}`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <AdminLayout
      head="Kategori Produk"
      tittleHead="Kategori Produk"
      tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data Kategori Produk dengan lebih efisien."
      flash={flash}
      user={auth.user}
    >
      <Tabs defaultValue={defaultValueTabs} className="mt-6">
        <TabsList className="overflow-x-auto md:overflow-hidden">
          <TabsTrigger
            value="add"
            onClick={() => setDefaultValueTabs("add")}
          >
            Tambah
          </TabsTrigger>
          <TabsTrigger
            value="table"
            onClick={() => setDefaultValueTabs("table")}
          >
            Tabel{" "}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <Create />
        </TabsContent>
        <TabsContent value="table">
          <DataTableCustom
            data={kategori}
            columns={columns}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}

export default Index;
