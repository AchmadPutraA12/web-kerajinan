import { Button } from "@/Components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Link } from "@inertiajs/react";
import DeleteDataPermanent from "@/Components/DeleteDataPermanent";
import { formatDate } from "@/lib/FormatDate";

const Kategori = [
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
                        className="text-xs font-semibold bg-green-100 border border-green-500 px-4 py-2 rounded-md text-green-500 hover:bg-green-200 hover:text-gray-white hover:border-gray-400"
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

export default Kategori;
