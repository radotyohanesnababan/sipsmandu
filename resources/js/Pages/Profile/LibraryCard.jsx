import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import AppLayout from "@/Layouts/AppLayout";
import { IconCards } from "@tabler/icons-react";
import { Head } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";

export default function LibraryCard({ user}) {

    const cardRef = useRef();
    const [processing, setProcessing] = useState(false);

    const downloadCard = async () => {
    try {
        setProcessing(true);

        const canvas = await html2canvas(cardRef.current, { scale: 2 });
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `Kartu_${user.nama.replace(/\s+/g, "_")}.png`;
        link.click();
    } catch (error) {
        console.error(error);
    } finally {
        setProcessing(false);
    }
}

    return (
        <>
            <Head title="Kartu Perpustakaan" />
            <HeaderTitle title="Kartu Perpustakaan" subtitle="Cetak dan unduh kartu anggota perpustakaan" icon={IconCards} />
            <div className="max-w-2xl mx-auto py-10"></div>
            <div className="p-6 flex flex-col items-center">

            <h1 className="text-2xl font-bold mb-4">Kartu Perpustakaan</h1>

            <div 
                ref={cardRef}
                className="w-[320px] h-[200px] bg-white rounded-xl shadow-xl border p-4 relative flex"
                style={{ backgroundImage: "url('/storage/bgcard.jpg')", backgroundSize: "cover" }}
            >
                <div className="ml-4 flex flex-col justify-center">
                    <h2 className="font-bold text-lg text-black">{user.nama}</h2>
                    <p className="text-sm text-black">NISN: {user.nisn ?? "-"}</p>
                    <p className="text-sm text-black">Kelas: {user.kelas_id ?? "-"}</p>
                    <p className="text-xs mt-2 text-gray-500">Kartu Perpustakaan SMA N 2 Siborongborong</p>
                </div>
                <div className="absolute top-2 right-3 text-sm font-semibold text-gray-600">
                    {new Date().getFullYear()}
                </div>
                <img 
                    src="/storage/logosekolah-rbg.png"
                    className="absolute left-1/2 top-2 w-10 -translate-x-1/2"
                    alt="logo"
                />
                
            </div>
            <Button
                onClick={downloadCard}
                className="mt-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold"
                disabled={processing}
            >
                {processing ? 'Mengunduh...' : 'Unduh sebagai Gambar'}
            </Button>
        </div>
        </>
    );      
}

LibraryCard.layout = (page) => (
  <AppLayout
    title={page.props.page_settings?.title ?? 'Kartu Perpustakaan'}
    subtitle={page.props.page_settings?.subtitle ?? 'Cetak dan unduh kartu anggota perpustakaan'}
  >
    {page}
  </AppLayout>
);

