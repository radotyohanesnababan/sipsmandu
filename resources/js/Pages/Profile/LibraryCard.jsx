import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import AppLayout from "@/Layouts/AppLayout";
import { IconCards } from "@tabler/icons-react";
import { Head } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { QRCodeSVG } from 'qrcode.react';

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
    className="w-[380px] h-[220px] bg-white rounded-2xl shadow-xl border relative overflow-hidden flex flex-col"
    style={{ backgroundImage: "url('/storage/bgcard.jpg')", backgroundSize: "cover" }}
>
    {/* Header bar */}
    <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <img 
            src="/storage/logosekolah.webp"
            className="w-8 h-8 object-contain"
            alt="logo"
        />
        <div>
            <p className="text-xs font-bold text-black leading-tight">SMA N 2 Siborongborong</p>
            <p className="text-xs text-gray-600 leading-tight">Kartu Anggota Perpustakaan</p>
        </div>
        <span className="ml-auto text-xs font-semibold text-gray-600">{new Date().getFullYear()}</span>
    </div>

    {/* Divider */}
    <div className="mx-4 border-t border-black/10" />

    {/* Body */}
    <div className="flex flex-1 items-center px-4 py-2 gap-4">
        {/* Info siswa */}
        <div className="flex-1">
            <h2 className="font-bold text-base text-black leading-tight">{user.nama}</h2>
            <p className="text-xs text-gray-700 mt-1">NISN: {user.nisn ?? "-"}</p>
            <p className="text-xs text-gray-700">Kelas: {user.kelas_id ?? "-"}</p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="bg-white p-1 rounded-lg">
                <QRCodeSVG 
                    value={String(user.nisn ?? '')}
                    size={75}
                    bgColor="#ffffff"
                    fgColor="#000000"
                />
            </div>
            
        </div>
    </div>
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

