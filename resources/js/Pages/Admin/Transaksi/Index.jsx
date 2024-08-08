import AdminLayout from '@/Layouts/AdminLayout'
import React from 'react'

const Index = ({ auth }) => {
    return (
        <AdminLayout
            head="Transaksi"
            tittleHead="Manajemen Transaksi"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data transaksi dengan lebih efisien."
            user={auth.user}
        >
            Transaksi
        </AdminLayout>
    )
}

export default Index