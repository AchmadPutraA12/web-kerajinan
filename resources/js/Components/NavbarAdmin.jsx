import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/Components/ui/sheet";
import LogoAdmin from '../../../public/Logo/Logo.png';
import {
    Headphones,
    LogOut,
    Menu,
    User,
} from "lucide-react";
import { Link } from '@inertiajs/react';
import {
    LayoutDashboardIcon,
    SquareGanttChart,
    Package,
    Banknote,
    DatabaseBackupIcon,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';

const sidebarItems = [
    { separator: true, label: "Navigasi" },
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboardIcon size={20} />,
    },
    {
        label: "Transaksi",
        href: "/admin/transaksi",
        icon: <Banknote size={20} />,
    },
    { separator: true, label: "Produk" },
    {
        label: "Kategori Produk",
        href: "/admin/kategori-produk",
        icon: <SquareGanttChart size={20} />,
    },
    {
        label: "Produk",
        href: "/admin/produk",
        icon: <Package size={20} />
    },
    { separator: true, label: "Pengaturan" },
    {
        label: "Kontak Admin",
        href: "/admin/kontak-admin",
        icon: <Headphones size={20} />,
    },
    {
        label: "Backup",
        href: "/admin/backup",
        icon: <DatabaseBackupIcon size={20} />,
    },
];

const NavbarAdmin = ({ user }) => {

    return (
        <nav className="w-full h-20 z-[100] lg:z-10 bg-[#F8EDE3] lg:bg-gray-50 items-center top-0 fixed flex p-4 justify-between lg:justify-end">
            <div className="flex items-center gap-1 lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button>
                            <Menu className="w-6 h-6 text-gray-400" />
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        className="bg-[#F8EDE3] border-none pt-24 flex flex-col gap-1.5 text-sm font-medium overflow-y-auto h-[100vh] scroll-me-12"
                        side={"left"}
                    >
                        {sidebarItems.map((item, index) =>
                            item.separator ? (
                                <div
                                    key={index}
                                    className="my-1 border-t mt-2 flex border-gray-300"
                                >
                                    <span className="text-gray-400 mt-4 text-xs">
                                        {item.label}
                                    </span>
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={`flex items-center gap-2 p-2 rounded-lg transform duration-100 ${window.location.pathname === item.href
                                        ? "bg-[#8D493A] text-white font-semibold"
                                        : "text-[#8D493A] hover:bg-gray-700 hover:text-[#fdfdfd]"
                                        }`}
                                >
                                    <div>{item.icon}</div>
                                    <span>{item.label}</span>
                                </Link>
                            )
                        )}
                    </SheetContent>
                </Sheet>

                <img src={LogoAdmin} className="w-44" alt="Logo Admin" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="items-center gap-3 cursor-pointer flex">
                        <img
                            className="w-9 h-9 rounded-full"
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=cemet`}
                            alt="User Avatar"
                        />
                        <div className="flex-col w-auto hidden md:flex">
                            <span className="text-sm font-semibold line-clamp-1 text-white lg:text-black">
                                {user.name}
                            </span>
                            <span className="text-xs font-medium text-gray-400">
                                {user.email}
                            </span>
                        </div>
                        <svg
                            className="hidden md:block ml-2 text-white lg:text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m7 10l5 5m0 0l5-5"
                            ></path>
                        </svg>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-white z-[110]">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <Link href={route("admin.profile.edit")}>
                            <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <Link href={route("logout")} method="post">
                        <DropdownMenuItem className="cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}

export default NavbarAdmin;
