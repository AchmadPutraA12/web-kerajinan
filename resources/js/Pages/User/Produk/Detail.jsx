import InputTextLabel from '@/Components/InputTextLabel';
import ProductLayout from '@/Layouts/ProductLayout';
import { FormatRupiah } from '@arismun/format-rupiah';
import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from 'react';

const Detail = ({ produks, contact, kategoris, errors: initialErrors, flash }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: ''
    });
    const [errors, setErrors] = useState(initialErrors || {});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleBuyClick = () => {
        setShowPopup(true);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleTelpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setFormData({
                ...formData,
                phone: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            try {
                router.post(route('transaksi.store'), {
                    ...formData,
                    price: produks.price,
                    nama_produk: produks.name,
                });
                setShowPopup(false);
            } catch (err) {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            }
        }
    };

    const isFormValid = () => {
        return formData.name && formData.phone && formData.address;
    };

    const addToCart = (item) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItemIndex = existingCart.findIndex(
            (cartItem) => cartItem.id === item.id
        );

        if (existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity += 1;
        } else {
            existingCart.push({ ...item, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    return (
        <ProductLayout contact={contact} kategoris={kategoris} head="Produk" flash={flash}>
            <ToastContainer />
            <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <div className="text-center">
                    <img
                        src={`/storage/${produks.image}`}
                        alt={produks.name}
                        className="w-full h-64 object-contain rounded-lg"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">{produks.name}</h2>
                    <p className="text-gray-600 mt-2">{produks.deskripsion}</p>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-semibold text-green-600">
                            <FormatRupiah value={produks.price} />
                        </span>
                    </div>
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={() => addToCart(produks)} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200">
                        <ShoppingCart />
                    </button>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        onClick={handleBuyClick}
                    >
                        Beli Sekarang
                    </button>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Informasi Pembeli</h2>
                        <form onSubmit={handleSubmit}>
                            <InputTextLabel
                                variant={"wajib"}
                                labelFor="name"
                                labelText="Nama Pembeli"
                                error={errors && errors.name ? errors.name : ""}
                                inputId="name"
                                inputProps={{
                                    value: formData.name,
                                    name: "name",
                                    type: "text",
                                    placeholder: "Masukkan Nama",
                                    onChange: handleChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"wajib"}
                                labelFor="phone"
                                labelText="No. Telepon"
                                error={errors && errors.phone ? errors.phone : ""}
                                inputId="phone"
                                inputProps={{
                                    value: formData.phone,
                                    name: "phone",
                                    type: "text",
                                    placeholder: "Masukkan No. Telepon",
                                    onChange: handleTelpChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"wajib"}
                                labelFor="address"
                                labelText="Alamat"
                                error={errors && errors.address ? errors.address : ""}
                                inputId="address"
                                inputProps={{
                                    value: formData.address,
                                    name: "address",
                                    type: "text",
                                    placeholder: "Masukkan Alamat",
                                    onChange: handleChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"opsional"}
                                labelFor="email"
                                labelText="Email (Opsional)"
                                error={errors && errors.email ? errors.email : ""}
                                inputId="email"
                                inputProps={{
                                    value: formData.email,
                                    name: "email",
                                    type: "email",
                                    placeholder: "Masukkan Email",
                                    onChange: handleChange,
                                }}
                            />

                            <div className="flex justify-between mt-5">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isFormValid()}
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                                >
                                    Konfirmasi Pembelian
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </ProductLayout>
    );
};

export default Detail;
