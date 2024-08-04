import React, { useState } from "react";
import Logo from "../../../../public/Logo/logo-transparant-2.png";
import { Link } from "@inertiajs/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="w-full z-50 py-2 bg-[#09090C] px-2 md:px-8 lg:px-16 flex items-center justify-between top-0 fixed">
            <Link href="/">
                <img src={Logo} alt="logo" className="w-44 lg:w-52" />
            </Link>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-300 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>

            <ul className="hidden text-gray-300 md:flex items-center gap-8 mr-12">
                {" "}
                <li className="flex flex-col relative">
                    <Link
                        href="/"
                        className={`${window.location.pathname === "/"
                            ? "text-yellow-300 font-medium"
                            : null
                            }`}
                    >
                        Home
                    </Link>
                    {window.location.pathname === "/" ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-yellow-300"></div>
                    ) : null}
                </li>
                <li className="flex flex-col relative">
                    <Link
                        href="/produk"
                        className={`${window.location.pathname.startsWith("/produk")
                            ? "text-yellow-300 font-medium"
                            : null
                            }`}
                    >
                        Produk
                    </Link>
                    {window.location.pathname.startsWith("/produk") ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-yellow-300"></div>
                    ) : null}
                </li>
            </ul>

            {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-[#09090C] text-gray-300 flex flex-col items-start px-2 py-4 md:hidden">
                    <li className="w-full">
                        <Link
                            href="/"
                            className={`block py-2 px-4 ${window.location.pathname === "/"
                                ? "text-yellow-300 font-medium"
                                : ""
                                }`}
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link
                            href="/produk"
                            className={`block py-2 px-4 ${window.location.pathname.startsWith("/produk")
                                ? "text-yellow-300 font-medium"
                                : ""
                                }`}
                            onClick={toggleMenu}
                        >
                            Produk
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
