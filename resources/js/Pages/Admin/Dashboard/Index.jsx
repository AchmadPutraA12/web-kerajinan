import AdminLayout from "@/Layouts/AdminLayout"
import { FormatRupiah } from "@arismun/format-rupiah"
import { Link } from "@inertiajs/react"
import { Banknote, Package, Layers, ChevronRight, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

const StatCard = ({ icon: Icon, label, value, href, color, bgGradient }) => (
  <div className="group relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
    {/* Background Gradient */}
    <div
      className={`absolute inset-0 ${bgGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
    ></div>

    <div className="relative p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${bgGradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            {label}
          </h3>
        </div>
        <Link
          href={href}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
        >
          <span className="font-medium">Detail</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="text-3xl font-bold text-gray-900 group-hover:text-4xl transition-all duration-300">
        {typeof value === "number" ? value.toLocaleString("id-ID") : <FormatRupiah value={value} />}
      </div>
    </div>
  </div>
)

// Function to format rupiah for Y-axis - Indonesian format
const formatRupiahAxis = (value) => {
  if (value >= 1000000000) {
    // Milyar
    const milyar = (value / 1000000000).toFixed(1)
    return `Rp ${milyar}M`
  } else if (value >= 1000000) {
    // Juta
    const juta = (value / 1000000).toFixed(1)
    return `Rp ${juta}Jt`
  } else if (value >= 1000) {
    // Ribu
    const ribu = (value / 1000).toFixed(0)
    return `Rp ${ribu}K`
  } else if (value === 0) {
    return "Rp 0"
  } else {
    return `Rp ${value.toLocaleString("id-ID")}`
  }
}

// Custom Tooltip Component with better rupiah formatting
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4 min-w-[220px]">
        <p className="font-semibold text-gray-800 mb-3 text-center border-b border-gray-100 pb-2">{`Bulan ${label}`}</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"></div>
          <span className="text-sm text-gray-600 font-medium">Pendapatan:</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <FormatRupiah value={Number(payload[0].value)} className="font-bold text-xl text-blue-700" />
        </div>
      </div>
    )
  }
  return null
}

const Index = ({ auth, flash, produkCount, kategoriCount, totalPendapatan, pendapatanPerBulan }) => {
  const chartData = pendapatanPerBulan || []
  const maxValue = chartData.length ? Math.max(...chartData.map((d) => d.total)) : 0

  return (
    <AdminLayout user={auth.user} flash={flash}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Banknote}
            label="Total Pendapatan"
            value={totalPendapatan}
            href="/admin/transaksi"
            color="text-white"
            bgGradient="bg-gradient-to-br from-emerald-500 to-green-600"
          />
          <StatCard
            icon={Layers}
            label="Kategori Produk"
            value={kategoriCount}
            href="/admin/kategori-produk"
            color="text-white"
            bgGradient="bg-gradient-to-br from-amber-500 to-orange-600"
          />
          <StatCard
            icon={Package}
            label="Jumlah Produk"
            value={produkCount}
            href="/admin/produk"
            color="text-white"
            bgGradient="bg-gradient-to-br from-blue-500 to-indigo-600"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Grafik Pendapatan Bulanan
                </h2>
                <p className="text-gray-600 mt-1 text-lg">Tren pendapatan dalam periode terakhir</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {chartData.length > 0 ? (
              <div className="w-full h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    barCategoryGap="25%"
                  >
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                        <stop offset="50%" stopColor="#1d4ed8" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8} />
                      </linearGradient>
                      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.1" />
                      </filter>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.7} />

                    <XAxis
                      dataKey="bulan"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 14,
                        fill: "#64748b",
                        fontWeight: 500,
                      }}
                      dy={10}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "#64748b",
                        fontWeight: 500,
                      }}
                      tickFormatter={formatRupiahAxis}
                      width={100}
                    />

                    <Tooltip content={<CustomTooltip />} />

                    <Bar dataKey="total" radius={[12, 12, 0, 0]} fill="url(#barGradient)" filter="url(#shadow)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <div className="p-4 rounded-full bg-gray-100 mb-4">
                  <Package className="w-12 h-12 opacity-50" />
                </div>
                <p className="text-xl font-semibold mb-2">Belum ada data pendapatan</p>
                <p className="text-sm text-gray-400">Data akan muncul setelah ada transaksi</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Index
