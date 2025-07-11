import React, { useState, useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { FormatRupiah } from '@arismun/format-rupiah';
import InputTextLabel from '@/Components/InputTextLabel';
import { usePage, router } from '@inertiajs/react';

const Keranjang = ({ contact, flash }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
    });
    const { props } = usePage();
    const errors = props?.errors || {};
    const { auth } = usePage().props;
    const user = auth?.user;
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleAddQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleReduceQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity -= 1;
        if (updatedCart[index].quantity === 0) {
            updatedCart.splice(index, 1);
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const totalPrice = cartItems.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

    const handleCheckout = () => {
        if (!user) {
            router.visit('/login');
            return;
        }
        setShowPopup(true);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    const handleTelpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 12) {
            if (value === '' || value.startsWith('0')) {
                setFormData({
                    ...formData,
                    phone: value
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isFormValid()) {
            router.post(route('transaksi.cart'), {
                ...formData,
                cartItems,
                totalPrice,
            }, {
                onSuccess: () => {
                    setShowPopup(false);
                    setFormData({
                        phone: '',
                        address: '',
                        kode_pos: '',
                        nama_jalan: '',
                        no_rumah: '',
                        detail_lainnya: '',
                    });
                    setShowPopup(false);
                    setCartItems([]);
                    localStorage.removeItem('cart');
                    window.dispatchEvent(new Event('cartUpdated'));
                }
            });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isFormValid = () => {
        return formData.phone && formData.address;
    };

    return (
        <GuestLayout flash={flash} contact={contact} head="Keranjang">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 mx-auto mt-32 max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h5 className="text-lg font-bold mb-4">Item Name</h5>
                        {cartItems.map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <img
                                        className="w-24 h-24 object-cover object-center rounded-md"
                                        src={`/storage/${item.image}`}
                                        alt={item.name}
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{item.name}</p>
                                        <p className="text-sm text-gray-600">{item.deskripsion}</p>
                                        <p className="text-sm text-gray-600"><FormatRupiah value={item.price} /></p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <button onClick={() => handleReduceQuantity(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">-</button>
                                    <p className="mx-2">{item.quantity}</p>
                                    <button onClick={() => handleAddQuantity(index)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">+</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <div className="text-lg font-bold mb-4">
                            <p>Harga: <FormatRupiah value={totalPrice} /></p>
                            <p>Total: {cartItems.length} items</p>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleCheckout}
                                className={`font-bold py-2 px-4 rounded ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                disabled={cartItems.length === 0}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Informasi Pembeli</h2>
                        <form onSubmit={handleSubmit}>
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
                                variant={"wajib"}
                                labelFor="kode_pos"
                                labelText="Kode Pos"
                                error={errors && errors.kode_pos ? errors.kode_pos : ""}
                                inputId="kode_pos"
                                inputProps={{
                                    value: formData.kode_pos,
                                    name: "kode_pos",
                                    type: "text",
                                    placeholder: "Masukkan Kode Pos",
                                    onChange: handleChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"wajib"}
                                labelFor="nama_jalan"
                                labelText="Nama Jalan"
                                error={errors && errors.nama_jalan ? errors.nama_jalan : ""}
                                inputId="nama_jalan"
                                inputProps={{
                                    value: formData.nama_jalan,
                                    name: "nama_jalan",
                                    type: "text",
                                    placeholder: "Masukkan Nama Jalan",
                                    onChange: handleChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"wajib"}
                                labelFor="no_rumah"
                                labelText="No Rumah"
                                error={errors && errors.no_rumah ? errors.no_rumah : ""}
                                inputId="no_rumah"
                                inputProps={{
                                    value: formData.no_rumah,
                                    name: "no_rumah",
                                    type: "text",
                                    placeholder: "Masukkan No Rumah",
                                    onChange: handleChange,
                                }}
                            />

                            <InputTextLabel
                                variant={"optionals"}
                                labelFor="detail_lainnya"
                                labelText="Detail Lainnya"
                                error={errors && errors.detail_lainnya ? errors.detail_lainnya : ""}
                                inputId="detail_lainnya"
                                inputProps={{
                                    value: formData.detail_lainnya,
                                    name: "detail_lainnya",
                                    type: "text",
                                    placeholder: "Masukkan Detail Lainnya",
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
        </GuestLayout>
    );
}

export default Keranjang;
