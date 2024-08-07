import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageContactCenter from "../../../../../public/img/contact-center.png";
import Edit from "./Edit";

const Index = ({ contactAdmin, flash }) => {
    return (
        <AdminLayout
            head="kontak admin"
            tittleDesc="Proses dan kegiatan yang dilakukan untuk mengelola data
                        Kontak Admin"
            tittleHead="Manajemen Kontak Admin"
            flash={flash}
        >
            <div className="mt-5 relative flex flex-col max-w-4xl items-center md:flex-row md:items-start gap-5 md:gap-12 rounded-lg p-5 bg-brandy-rose-100">
                <img
                    className="w-[185px] h-40"
                    src={ImageContactCenter}
                    alt=""
                />
                <div className="flex flex-col gap-7 w-full">
                    <span className="font-semibold text-xl">
                        Informasi Layanan
                    </span>
                    <div>
                        <Edit contactCenter={contactAdmin} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
