import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Link } from "@inertiajs/react";
import DeleteDataPermanent from "@/Components/DeleteDataPermanent";
import { FormatRupiah } from '@arismun/format-rupiah';
import { formatDate } from "@/lib/FormatDate";

const Produk = [
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
        header: ({ column }) => (
            <Button
                variant="tableHeader"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Kategori
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="bg-yellow-200 rounded-lg px-4 py-1">
                {row.original.kategori.name}
            </span>
        ),
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
        header: ({ column }) => (
            <Button
                variant="tableHeader"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Deskripsi
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        ),
        sortingFn: "text",
    },
    {
        accessorKey: "image",
        header: "Gambar",
        cell: ({ row }) => (
            <img
                className="size-32 md:size-20 rounded-lg object-contain"
                src={
                    window.location.origin +
                    "/storage/" +
                    row.getValue("image")
                }
                alt=""
            />
        ),
    },
    {
        accessorKey: "price",
        header: "Harga",
        cell: ({ row }) => (
            <FormatRupiah value={row.getValue("price")} />
        ),
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
                        className="text-xs font-semibold bg-green-100 border border-green-500 px-4 py-2 rounded-md text-green-500 hover:bg-green-200 hover:text-gray-white hover:border-gray-400"
                        type="button"
                        method="get"
                        href={route("admin.produk.restore", produk.id)}
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

export default Produk;
