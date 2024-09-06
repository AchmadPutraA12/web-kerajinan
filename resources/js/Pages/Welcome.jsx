import { Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { ChevronRight } from "lucide-react";
import Logo from "../../../public/Logo/kerajinan.png"
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ contact }) {
    return (
        <GuestLayout contact={contact} head="Home">
            <div className="w-full relative z-10 h-screen bg-[#F8EDE3] grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col gap-4 z-30 justify-center h-full lg:max-w-3xl px-10 md:px-14 lg:px-20">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#211f1f]">
                        Selamat Datang, di Mekar Sari
                    </h1>
                    <h2 className="text-sm sm:text-base md:text-xl font-medium text-[#211f1f]">
                        "Di sini, setiap kerang bercerita. Temukan keindahan dan keunikan kerajinan
                        tangan yang terinspirasi oleh lautan. Setiap produk adalah karya seni yang dibuat
                        dengan penuh cinta dan keahlian, menghadirkan sentuhan alam yang abadi ke dalam
                        kehidupan Anda. Jelajahi koleksi kami dan bawa pulang keindahan lautan ke dalam
                        rumah Anda."
                    </h2>
                    <Button
                        asChild
                        className="bg-[#ffffff] mt-5 w-52 text-black hover:bg-red-300 rounded-none"
                        size={"lg"}
                    >
                        <Link
                            href="/produk"
                            className="text-lg flex items-center gap-1 font-semibold"
                        >
                            <span>Cari Produk Disini</span>
                            <ChevronRight size={20} className="text-black" />
                        </Link>
                    </Button>
                </div>
                <img
                    className="absolute left-1/2 transform -translate-x-1/2 bottom-0 lg:left-auto lg:right-0 lg:bottom-0 lg:transform-none z-20 opacity-60 lg:opacity-100 max-w-[90%] lg:max-w-none"
                    src={Logo}
                    alt=""
                />
            </div>

            {" "}
            <div className="h-auto my-10 md:my-20 lg:my-40 bg-white flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <h2 className=" text-3xl md:text-5xl font-extrabold text-black">
                        Pelayanan Kami
                    </h2>
                    <div className="flex items-center mr-5 lg:mr-0 w-72 md:w-full justify-center flex-col lg:flex-row  gap-14 md:gap-16 lg:gap-20 mt-14 md:mt-16 lg:mt-20 lg:justify-around">
                        <div className="p-4 bg-white shadow-[8px_8px_0px_1px_#F8EDE3] w-full md:w-80 flex flex-col">
                            <svg
                                className="p-2 rounded-full bg-[#F8EDE3]"
                                xmlns="http://www.w3.org/2000/svg"
                                width={42}
                                height={42}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="m16 17l.21.21c.369.369.553.553.776.54c.223-.012.386-.215.712-.623L19 15.5m-6-.046v.386c0 1.202 0 1.803.148 2.353a4.36 4.36 0 0 0 1.014 1.827c.39.422.906.75 1.937 1.407c.461.294.692.441.938.51c.303.084.624.084.927 0c.245-.069.476-.216.937-.51c1.031-.657 1.547-.985 1.937-1.407a4.36 4.36 0 0 0 1.014-1.827c.148-.55.148-1.15.148-2.353v-.386c0-.748 0-1.122-.142-1.438a1.7 1.7 0 0 0-.369-.52c-.253-.24-.612-.372-1.33-.635l-1.474-.54c-.586-.214-.879-.321-1.185-.321s-.599.107-1.185.322l-1.474.54c-.718.262-1.077.393-1.33.634a1.7 1.7 0 0 0-.37.52c-.141.316-.141.69-.141 1.438m3.171-7.544V9.5m0-1.59c0-.754.634-1.365 1.415-1.365c.78 0 1.414.611 1.414 1.364V9.5m-2.829-1.59V5.181c0-.753-.633-1.364-1.414-1.364s-1.415.61-1.415 1.364m0 0V9.5m0-4.318V3.364C13.342 2.61 12.71 2 11.928 2s-1.414.61-1.414 1.364V6.09m0 0c0-.753-.634-1.364-1.415-1.364c-.78 0-1.414.61-1.414 1.364v6.547c0 .416-.533.613-.823.305l-2.29-2.439a1.415 1.415 0 0 0-1.615-.382c-1.008.417-1.245 1.888-.59 2.736c1.122 1.452 2.27 3.433 3.198 5.18C6.825 20.41 9.31 22 12.072 22M10.514 6.09V9.5"
                                    color="currentColor"
                                ></path>
                            </svg>
                            <div className="flex flex-col gap-2 mt-4">
                                <span className="text-lg font-semibold">
                                    Dream Room Elegance
                                </span>
                                <span className="text-zinc-500 font-medium">
                                    {" "}
                                    Kami mengutamakan kenyamanan dan keindahan
                                    di setiap sisi ruang
                                </span>
                            </div>
                        </div>{" "}
                        <div className="p-4 bg-white shadow-[8px_8px_0px_1px_#F8EDE3] w-full md:w-80 flex flex-col">
                            <svg
                                className="p-2 rounded-full bg-[#F8EDE3]"
                                xmlns="http://www.w3.org/2000/svg"
                                width={42}
                                height={42}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 0C8.249 0 3.725.861 0 2.755C0 6.845-.051 17.037 12 24C24.051 17.037 24 6.845 24 2.755C20.275.861 15.751 0 12 0m-.106 15.429L6.857 9.612c.331-.239 1.75-1.143 2.794.042l2.187 2.588c.009-.001 5.801-5.948 5.815-5.938c.246-.22.694-.503 1.204-.101z"
                                ></path>
                            </svg>
                            <div className="flex flex-col gap-2 mt-4">
                                <span className="text-lg font-semibold">
                                    High Quality Control
                                </span>
                                <span className="text-zinc-500 font-medium">
                                    {" "}
                                    Kami selalu menjaga kualitas produk tetap
                                    baik hingga ke tangan konsumen
                                </span>
                            </div>
                        </div>{" "}
                        <div className="p-4 bg-white shadow-[8px_8px_0px_1px_#F8EDE3] w-full md:w-80 flex flex-col">
                            <svg
                                className="p-2 rounded-full bg-[#F8EDE3]"
                                xmlns="http://www.w3.org/2000/svg"
                                width={42}
                                height={42}
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M4.1 38.2C1.4 34.2 0 29.4 0 24.6C0 11 11 0 24.6 0h109.3c11.2 0 21.7 5.9 27.4 15.5l68.5 114.1c-48.2 6.1-91.3 28.6-123.4 61.9zm503.7 0L405.6 191.5c-32.1-33.3-75.2-55.8-123.4-61.9l68.5-114.1C356.5 5.9 366.9 0 378.1 0h109.3C501 0 512 11 512 24.6c0 4.8-1.4 9.6-4.1 13.6zM80 336a176 176 0 1 1 352 0a176 176 0 1 1-352 0m184.4-94.9c-3.4-7-13.3-7-16.8 0l-22.4 45.4c-1.4 2.8-4 4.7-7 5.1l-50.2 7.3c-7.7 1.1-10.7 10.5-5.2 16l36.3 35.4c2.2 2.2 3.2 5.2 2.7 8.3l-8.6 49.9c-1.3 7.6 6.7 13.5 13.6 9.9l44.8-23.6c2.7-1.4 6-1.4 8.7 0l44.8 23.6c6.9 3.6 14.9-2.2 13.6-9.9l-8.6-49.9c-.5-3 .5-6.1 2.7-8.3l36.3-35.4c5.6-5.4 2.5-14.8-5.2-16l-50.1-7.3c-3-.4-5.7-2.4-7-5.1z"
                                ></path>
                            </svg>
                            <div className="flex flex-col gap-2 mt-4">
                                <span className="text-lg font-semibold">
                                    Exclusive & Premium Product
                                </span>
                                <span className="text-zinc-500 font-medium">
                                    {" "}
                                    seluruh produk kami eksklusif dengan
                                    menggunakan bahan premium
                                </span>
                            </div>
                        </div>{" "}
                    </div>
                </div>
            </div>
            <div className="h-auto px-6 my-20  lg:my-40 bg-white flex justify-center items-center">
                <div className="flex lg:flex-row flex-col-reverse items-center justify-center gap-8  w-full">
                    <div className="flex px-4 flex-col max-w-md">
                        <h2 className=" text-2xl lg:text-5xl font-extrabold text-black">
                            Kontak Kami
                        </h2>
                        <span className="text-xl mt-4 lg:mt-10  font-medium text-zinc-500">
                        Kami sangat senang jika Anda ingin menghubungi kami! 
                        Apakah Anda memiliki pertanyaan tentang produk kami, butuh bantuan, atau ingin berbagi saran? <br />
                        Tim kami selalu siap membantu Anda.
                        </span>{" "}
                        <span className="text-xl lg:text-3xl mt-8 font-semibold text-black">
                            Informasi Alamat Perusahaan
                        </span>
                        <div className="flex flex-col mt-6 gap-2">
                            <span>
                                Dusun Krojan Barat, Desa Klatakan, Kecamatan Kendit
                            </span>
                            <hr />
                        </div>{" "}
                        <div className="flex flex-col mt-4 gap-2">
                            <span>Situbondo</span>
                            <hr />
                        </div>{" "}
                        <div className="flex flex-col mt-4 gap-2">
                            <span>Jawa Timur 68352</span>
                            <hr />
                        </div>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d988.4543917437917!2d113.9232461588309!3d-7.702717409952286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd72642d1bdd291%3A0xb8d597e09b4ae849!2sKrojan%20Barat%2C%20Klatakan%2C%20Kec.%20Kendit%2C%20Kabupaten%20Situbondo%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1725608269153!5m2!1sid!2sid"
                        className="px-6 w-[340px] h-[280px] md:size-[400px] lg:size-[450px]"
                        loading="lazy"
                    ></iframe>
                </div>
            </div>{" "}
        </GuestLayout>
    );
}
