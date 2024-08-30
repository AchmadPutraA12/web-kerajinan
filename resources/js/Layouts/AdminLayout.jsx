import React, { useEffect, useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import { Head, Link } from "@inertiajs/react";
import {
    LayoutDashboardIcon,
    SquareGanttChart,
    Package,
    Banknote,
    DatabaseBackupIcon,
    ChevronLeft,
    Headphones,
} from "lucide-react";
import NavbarAdmin from '@/Components/NavbarAdmin';
import LogoAdmin from '../../../public/Logo/Logo.png';
import LogoAdmin2 from '../../../public/Logo/Logo-2.png';
import { toast } from "react-toastify";
import Toastify from '@/Components/Toastify';

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

const AdminLayout = ({ head, children, tittleHead, tittleDesc, flash, user }) => {
    const [handleSmallScreen, setHandleSmallScreen] = useState(() => {
        const storedValue = localStorage.getItem("handleSmallScreen");
        return storedValue ? JSON.parse(storedValue) : true;
    });

    useEffect(() => {
        localStorage.setItem(
            "handleSmallScreen",
            JSON.stringify(handleSmallScreen)
        );
    }, [handleSmallScreen]);

    useEffect(() => {
        if (flash && flash?.error) {
            toast.error(flash.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else if (flash && flash?.success) {
            toast.success(flash.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [flash]);

    return (
        <>
            <Head title={"admin - " + head} />
            <NavbarAdmin searchTerm="searchTerm" user={user} />
            <aside
                className={`
                    p-4 hidden z-[100] border-r-2 lg:z-10 lg:flex  flex-col top-0 gap-4 h-screen fixed left-0 bg-[#F8EDE3] 
                    ${handleSmallScreen ? "w-64" : "w-24"}
                `}
            >
                <div className="flex items-center justify-center rounded-xl relative">
                    <img
                        src={LogoAdmin}
                        className={`w-[90%]  ${handleSmallScreen ? "visible" : "hidden"
                            }`}
                        alt=""
                    />
                    <img
                        src={LogoAdmin2}
                        className={`size-10 m-4 ${handleSmallScreen ? "hidden" : "block"
                            }`}
                        alt=""
                    />
                    <button
                        onClick={() => setHandleSmallScreen(!handleSmallScreen)}
                    >
                        <ChevronLeft
                            className={`bg-[#8D493A] text-white hover:scale-125 hover:border-[4.5px] transform duration-300 rounded-full size-8 top-0 -right-[29px] border-2 border-white absolute ${handleSmallScreen ? "" : "rotate-180"
                                }`}
                        />
                    </button>
                </div>

                <ul
                    className={`
                        flex flex-col gap-1.5 text-sm font-medium overflow-y-auto h-4/5 scroll-me-12 
                        ${handleSmallScreen ? null : "items-center"}
                    `}
                >
                    {sidebarItems.map((item, index) =>
                        item.separator ? (
                            <li
                                key={index}
                                className="my-1 border-t mt-2 flex border-gray-300"
                            >
                                <span className="text-[#8D493A] mt-4 text-xs">
                                    {item.label}
                                </span>
                            </li>
                        ) : (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-2 p-2 rounded-lg transform duration-100 ${window.location.pathname === item.href
                                        ? "bg-[#8D493A] text-white font-semibold"
                                        : "text-[#8D493A] hover:bg-gray-700 hover:text-[#fdfdfd]"
                                        }`}
                                >
                                    {handleSmallScreen ? (
                                        <div>{item.icon}</div>
                                    ) : (
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    {item.icon}
                                                </TooltipTrigger>
                                                <TooltipContent className="text-xs font-semibold ml-10 bg-yellow-300 border-none text-black">
                                                    <p>{item.label}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}

                                    <span
                                        className={`text-xs ${handleSmallScreen
                                            ? "block"
                                            : "hidden"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </aside>
            {flash?.success && <Toastify />}
            {flash?.error && <Toastify />}
            <div
                className={`mt-28 mx-4 md:mx-0 md:px-8 pb-16 ${handleSmallScreen ? "lg:ml-64" : "lg:ml-28"
                    }`}
            >
                <div className="flex flex-col gap-1">
                    <span className="text-xl md:text-2xl lg:text-4xl font-bold">
                        {tittleHead}
                    </span>
                    <span className="text-gray-500 text-sm md:text-lg font-medium">
                        {tittleDesc}
                    </span>
                </div>
                {children}
            </div>
        </>
    );
}

export default AdminLayout;
