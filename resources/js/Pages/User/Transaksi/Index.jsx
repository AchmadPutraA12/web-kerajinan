import DataTableCustom from '@/Components/DataTableCustom';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/Components/ui/dropdown-menu';
import AdminLayout from '@/Layouts/AdminLayout'
import GuestLayout from '@/Layouts/GuestLayout';
import { FormatRupiah } from '@arismun/format-rupiah';
import { Link, router } from '@inertiajs/react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import React from 'react'

const Index = ({ auth, transaksis, flash, contact }) => {
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
            id: "no_invoice",
            accessorKey: "no_invoice",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        No Invoice
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            sortingFn: "text",
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
            id: "phone",
            accessorKey: "phone",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Phone
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            sortingFn: "text",
        },
        {
            id: "address",
            accessorKey: "address",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Alamat
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            sortingFn: "text",
        },
        {
            accessorKey: "total_harga",
            header: ({ column }) => {
                return (
                    <Button
                        variant="tableHeader"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Total Harga
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <FormatRupiah value={row.getValue("total_harga")} />;
            },
        },
        {
            id: "status",
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        size={"sm"}
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell(props) {
                return (
                    <div>
                        <Button
                            className={`flex items-center justify-center px-4 py-2 gap-2 hover:text-white ${props.row.getValue("status") === "pending"
                                ? "bg-[#8D493A] text-white hover:bg-[#8D493A]"
                                : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                            variant="outline"
                        >
                            {props.row.getValue("status")}
                        </Button>
                    </div>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: "Actions",
            cell: ({ row }) => {
                const transaksi = row.original;

                return (
                    <div className="flex items-center gap-2">
                        <Button className="bg-[#d46d27]" variant="default" size={"sm"} asChild>
                            <Link
                                className="text-xs"
                                href={route(
                                    "transaksi.show",
                                    transaksi.no_invoice
                                )}
                            >
                                Detail
                            </Link>
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <GuestLayout contact={contact} head="Home">
            <div className="w-full overflow-auto mt-32">
                <DataTableCustom data={transaksis} columns={columns} />
            </div>

        </GuestLayout>
    )
}

export default Index