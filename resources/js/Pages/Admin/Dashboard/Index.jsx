import AdminLayout from '@/Layouts/AdminLayout'
import { FormatRupiah } from '@arismun/format-rupiah'
import { Link } from '@inertiajs/react'
import { Banknote, ChevronRight, Package, Users2Icon } from 'lucide-react'
import React from 'react'

const Index = ({ auth, flash }) => {
  return (
    <AdminLayout user={auth.user} flash={flash}>
      <div className="gap-4 mt-3 w-full flex-col  md:flex-row flex 5 rounded-md shadow-sm">
        <div className="flex flex-col gap-2 p-4 lg:w-1/2 bg-zinc-200">
          <Banknote className="size-8" />
          <span className="text-sm md:text-lg font-medium">
            Total Pendapatan
          </span>
          <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
            <span className="text-base md:text-2xl font-bold">
              <FormatRupiah />
            </span>
            <Link
              href="/admin/transaksi"
              className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
            >
              <span className="text-sm font-medium">detail</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-4 lg:w-1/2 bg-zinc-200">
          <div className="flex items-center gap-2">
            {/* <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            /> */}
            <span>-</span>
            {/* <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            /> */}
          </div>
          <span className="text-base mt-4 md:text-2xl font-bold">
            <FormatRupiah />
          </span>
        </div>
      </div>
      <div className="gap-4 mt-3 flex-col  md:flex-row w-full flex 5 rounded-md shadow-sm">
        <div className="flex flex-col gap-2 p-4 lg:w-1/2 bg-zinc-200">
          <Users2Icon className="size-8" />
          <span className="text-sm md:text-lg font-medium">
            Total Pengunjung
          </span>
          <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
            <span className="text-base md:text-2xl font-bold">
              {/* {laravelVisit.length} */}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 p-4 lg:w-1/2 bg-zinc-200">
          <div className="flex items-center gap-2">
            {/* <Input
              type="date"
              value={startDateVisit}
              onChange={(e) => setStartDateVisit(e.target.value)}
            /> */}
            <span>-</span>
            {/* <Input
              type="date"
              value={endDateVisit}
              onChange={(e) => setEndDateVisit(e.target.value)}
            /> */}
          </div>
          <span className="text-base mt-4 md:text-2xl font-bold">
            {/* {filteredVisits.length} */}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-4">
        <div className="border-s-4 bg-gray-100/80 border-green-500 w-full rounded-md shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            <Package className="w-8 h-8" />
            <span className="text-sm md:text-lg font-medium">
              Kategori Produk
            </span>
            <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
              <span className="text-base md:text-2xl font-bold">
                {/* {productCategories.length} */}
              </span>
              <Link
                href="/admin/kategori-produk"
                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
              >
                <span className="text-sm font-medium">
                  detail
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-s-4 bg-gray-100/80 border-blue-500 w-full rounded-md shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            <Package className="w-8 h-8" />
            <span className="text-sm md:text-lg font-medium">
              Produk
            </span>
            <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
              <span className="text-base md:text-2xl font-bold">
                {/* {product.length} */}
              </span>
              <Link
                href="/admin/produk"
                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
              >
                <span className="text-sm font-medium">
                  detail
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-s-4 bg-gray-100/80 border-red-500 w-full rounded-md shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            <Package className="w-8 h-8" />
            <span className="text-sm md:text-lg font-medium">
              Produk dan Mockup
            </span>
            <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
              <span className="text-base md:text-2xl font-bold">
                {/* {productWithProductColor.length} */}
              </span>
              <Link
                href="/admin/produk-mockup"
                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
              >
                <span className="text-sm font-medium">
                  detail
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-s-4 bg-gray-100/80 border-blue-500 w-full rounded-md shadow-sm">
          <div className="flex flex-col gap-2 p-4">
            <Package className="w-8 h-8" />
            <span className="text-sm md:text-lg font-medium">
              Kolaborasi
            </span>
            <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:items-center">
              <span className="text-base md:text-2xl font-bold">
                {/* {collaborations.length} */}
              </span>
              <Link
                href="/admin/kolaborasi"
                className="text-blue-500 hover:text-blue-700 underline flex items-center gap-1"
              >
                <span className="text-sm font-medium">
                  detail
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Index