import AdminLayout from '@/Layouts/AdminLayout';
import { FormatRupiah } from '@arismun/format-rupiah';
import { Link } from '@inertiajs/react';
import { Banknote, ChevronRight, Package } from 'lucide-react';
import React from 'react';

const Index = ({ auth, flash, produkCount, kategoriCount, totalPendapatan }) => {
  return (
    <AdminLayout user={auth.user} flash={flash}>
      <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
        <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:w-1/3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="w-8 h-8 text-green-600" />
              <span className="text-lg font-semibold text-gray-700">Total Pendapatan</span>
            </div>
            <Link
              href="/admin/transaksi"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
            >
              <span className="text-sm font-medium">Detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-gray-900">
            <FormatRupiah value={totalPendapatan} />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:w-1/3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-700">Kategori Produk</span>
            </div>
            <Link
              href="/admin/kategori-produk"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
            >
              <span className="text-sm font-medium">Detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-gray-900">{kategoriCount}</div>
        </div>

        <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm lg:w-1/3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-500" />
              <span className="text-lg font-semibold text-gray-700">Produk</span>
            </div>
            <Link
              href="/admin/produk"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline"
            >
              <span className="text-sm font-medium">Detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-3xl font-bold text-gray-900">{produkCount}</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
