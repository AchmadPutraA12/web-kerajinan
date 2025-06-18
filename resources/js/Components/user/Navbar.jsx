import React, { useState, useEffect, useRef } from "react";
import Logo from "../../../../public/Logo/Logo.png";
import { Link, usePage, router } from "@inertiajs/react";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { auth } = usePage().props;
    const user = auth?.user;

    useEffect(() => {
        const updateCartCount = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalItems);
        };
        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);
        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const handleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };

    return (
        <nav className="w-full z-50 py-2 bg-[#F8EDE3] px-2 md:px-8 lg:px-16 flex items-center justify-between top-0 fixed">
            <Link href="/">
                <img src={Logo} alt="logo" className="w-44 lg:w-52" />
            </Link>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-[#A02334] focus:outline-none">
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

            <ul className="hidden text-[#215a93] md:flex items-center gap-8 mr-12">
                <li className="flex flex-col relative">
                    <Link
                        href="/"
                        className={`${window.location.pathname === "/"
                            ? "text-[#A02334] font-medium"
                            : null
                            }`}
                    >
                        Home
                    </Link>
                    {window.location.pathname === "/" ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-[#A02334]"></div>
                    ) : null}
                </li>
                <li className="flex flex-col relative">
                    <Link
                        href="/produk"
                        className={`${window.location.pathname.startsWith("/produk")
                            ? "text-[#800000] font-medium"
                            : null
                            }`}
                    >
                        Produk
                    </Link>
                    {window.location.pathname.startsWith("/produk") ? (
                        <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-[#800000]"></div>
                    ) : null}
                </li>
                {user ? (
                    <li className="flex flex-col relative">
                        <Link
                            href="/transaksi"
                            className={`${window.location.pathname.startsWith("/transaksi")
                                ? "text-[#800000] font-medium"
                                : null
                                }`}
                        >
                            Transaksi
                        </Link>
                        {window.location.pathname.startsWith("/transaksi") ? (
                            <div className="w-[130%] -translate-x-2 h-px absolute  -bottom-2 bg-[#800000]"></div>
                        ) : null}
                    </li>

                ) : (
                    <>

                    </>
                )}

                <li className="flex flex-col relative">
                    <Link
                        href="/keranjang"
                        className={`${window.location.pathname === "/keranjang"
                            ? "text-[#800000] font-medium"
                            : null
                            }`}
                    >
                        <div className="relative">
                            <ShoppingCart />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </Link>
                    {window.location.pathname === "/keranjang" ? (
                        <div className="w-[170%] -translate-x-2 h-px absolute  -bottom-2 bg-[#800000]"></div>
                    ) : null}
                </li>
                <li className="ml-2 flex items-center relative" ref={dropdownRef}>
                    {!user ? (
                        <Link
                            href="/login"
                            className="bg-[#A02334] text-white px-4 py-2 rounded-md hover:bg-[#800000] transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <button
                                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-[#FFE5B4] transition"
                                onClick={handleDropdown}
                            >
                                <span className="font-semibold">{user.name}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                                    <div className="px-4 py-2 border-b text-sm text-gray-700">
                                        <div>{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-[#A02334] hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </li>
            </ul>

            {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-[#FFEEAD] text-[#215a93] flex flex-col items-start px-2 py-4 md:hidden z-40">
                    <li className="w-full">
                        <Link
                            href="/"
                            className={`block py-2 px-4 ${window.location.pathname === "/"
                                ? "text-[#800000] font-medium"
                                : ""
                                }`}
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            href="/produk"
                            className={`block py-2 px-4 ${window.location.pathname.startsWith("/produk")
                                ? "text-[#800000] font-medium"
                                : ""
                                }`}
                            onClick={toggleMenu}
                        >
                            Produk
                        </Link>
                        {user ? (
                            <Link
                                href="/transaksi"
                                className={`block py-2 px-4 ${window.location.pathname.startsWith("/transaksi")
                                    ? "text-[#800000] font-medium"
                                    : ""
                                    }`}
                                onClick={toggleMenu}
                            >
                                Transaksi
                            </Link>
                        ) : (
                            <>

                            </>
                        )}
                        <Link
                            href="/keranjang"
                            className={`block py-2 px-4 ${window.location.pathname === "/keranjang"
                                ? "text-[#800000] font-medium"
                                : ""
                                }`}
                            onClick={toggleMenu}
                        >
                            Cart
                            {cartCount > 0 && (
                                <span className="ml-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    {!user ? (
                        <li className="w-full">
                            <Link
                                href="/"
                                className={`block py-2 px-4 ${window.location.pathname === "/"
                                    ? "text-[#800000] font-medium"
                                    : ""
                                    }`}
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/produk"
                                className={`block py-2 px-4 ${window.location.pathname.startsWith("/produk")
                                    ? "text-[#800000] font-medium"
                                    : ""
                                    }`}
                                onClick={toggleMenu}
                            >
                                Produk
                            </Link>
                            <Link
                                href="/login"
                                className="block py-2 px-4 bg-[#A02334] text-white rounded hover:bg-[#800000] mt-2"
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li className="w-full px-4 py-2">
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.email}</div>
                            </li>
                            <li className="w-full">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-[#A02334] hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
