import { Head } from '@inertiajs/react';
import { Toaster } from 'sonner';

export default function GuestLayout({ title, children }) {
    return (
        <>
            <Head title={title}>    
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content="Perpustakaan SMA N 2 Siborongborong" />
                <meta name="author" content="Tim Perpustakaan SMA N 2 Siborongborong" />
                <meta
                    name="keywords"
                    content="perpustakaan, SMA N 2 Siborongborong, SIMPAS, buku digital, sekolah, smp, tarutung, buku"
                />
                <meta
                    name="description"
                    content="SIMPAS | Sistem Perpustakaan SMA N 2 Siborongborong — jelajahi koleksi buku dan sumber belajar."
                />
                <meta property="og:description" content="Akses koleksi buku SMA N 2 Siborongborong secara online." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://SIMPAS.my.id" />
                <meta property="og:image" content="/storage/logo/logo.webp" />
            </Head>
            <Toaster position="top-center" richColors closeButton />
            {children}
        </>
    );
}
