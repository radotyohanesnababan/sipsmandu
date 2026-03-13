import { Toaster } from '@/Components/ui/sonner';
import { Head, Link, usePage } from '@inertiajs/react';
import { IconBrandFacebook, IconBrandInstagram, IconLink } from '@tabler/icons-react';

export default function WelcomeLayout({ title, children, description }) {
    const auth = usePage().props.auth.user;

    const defaultTitle = 'SIMPAS — Perpustakaan SMAN 2 Siborongborong';
    const defaultDescription =
        'SIMPAS | Sistem Perpustakaan Digital SMAN 2 Siborongborong — koleksi buku lengkap, kemudahan akses, dan layanan terbaik untuk mendukung pembelajaran.';

    const pageTitle = title || defaultTitle;
    const pageDescription = description || defaultDescription;

    const navLinks = [
        { label: 'Beranda', href: '#beranda' },
        { label: 'Kategori', href: '#kategori' },
        { label: 'Tentang', href: '#tentang' },
    ];

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Tim Perpustakaan SMAN 2 Siborongborong" />
                <meta
                    name="keywords"
                    content="perpustakaan, SMAN 2 Siborongborong, SIMPAS, buku digital, sekolah, sma, siborongborong, buku, perpustakaan digital"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:url" content="https://SIMPAS.sman2siborongborong.sch.id" />
                <meta property="og:image" content="https://SIMPAS.sman2siborongborong.sch.id/storage/logo/logo.webp" />
                <meta property="og:site_name" content="Perpustakaan SMAN 2 Siborongborong" />
                <meta property="og:locale" content="id_ID" />
                <link rel="canonical" href="https://SIMPAS.sman2siborongborong.sch.id" />
            </Head>

            <Toaster position="top-center" richColors />

            <div className="flex flex-col min-h-screen text-gray-800 scroll-smooth overflow-x-hidden">

                {/* ─── HEADER ─── */}
                <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
                    <div className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-8">

                        {/* Logo + Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center shadow-sm">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.794 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.206 18 16.5 18s-3.332.477-4.5 1.247" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-lg font-black text-slate-800 tracking-tight">SIMPAS</span>
                                <span className="hidden sm:inline text-xs text-slate-400 font-medium ml-2">SMAN 2 Siborongborong</span>
                            </div>
                        </div>

                        {/* Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* CTA */}
                        <div className="flex items-center gap-2">
                            {auth ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 text-sm font-semibold rounded-xl bg-slate-800 text-white hover:bg-emerald-800 transition-colors duration-300 shadow-sm"
                                >
                                    Masuk
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* ─── MAIN ─── */}
                <main className="flex-1">{children}</main>

                {/* ─── FOOTER ─── */}
                <footer className="bg-slate-900 text-slate-400 pt-16 pb-0">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                            {/* Brand */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.794 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.206 18 16.5 18s-3.332.477-4.5 1.247" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-black text-white tracking-tight">SIMPAS</span>
                                </div>
                                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                    Sistem Perpustakaan Digital SMAN 2 Siborongborong — mendukung literasi dan semangat belajar.
                                </p>
                                <div className="flex items-start gap-2 text-slate-500 text-sm pt-1">
                                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <p>Jl. Pendidikan, Siborongborong</p>
                                        <p>Kabupaten Tapanuli Utara, Sumatera Utara</p>
                                    </div>
                                </div>
                            </div>

                            {/* Spacer */}
                            <div className="hidden md:block" />

                            {/* Kontak */}
                            <div className="md:col-span-1">
                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Hubungi Kami</h3>
                                <a
                                    href="mailto:sman2siborongborong@gmail.com"
                                    className="inline-block text-sm text-emerald-400 hover:text-emerald-300 transition-colors mb-6 break-all"
                                >
                                    sman2siborongborong@gmail.com
                                </a>

                                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Sosial Media</h3>
                                <div className="flex space-x-2">
                                    <a
                                        href="https://www.facebook.com"
                                        aria-label="Facebook Sekolah"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-emerald-800 border border-slate-700 hover:border-emerald-600 transition-colors"
                                    >
                                        <IconBrandFacebook className="w-4 h-4 text-slate-400 hover:text-white" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com"
                                        aria-label="Instagram Sekolah"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-emerald-800 border border-slate-700 hover:border-emerald-600 transition-colors"
                                    >
                                        <IconBrandInstagram className="w-4 h-4 text-slate-400 hover:text-white" />
                                    </a>
                                    <a
                                        href="https://sman2siborongborong.sch.id"
                                        aria-label="Website Sekolah"
                                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-emerald-800 border border-slate-700 hover:border-emerald-600 transition-colors"
                                    >
                                        <IconLink className="w-4 h-4 text-slate-400 hover:text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-slate-800 mt-12 py-5">
                        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
                            <span>&copy; {new Date().getFullYear()} Perpustakaan SMAN 2 Siborongborong. All rights reserved.</span>
                            <span className="text-slate-700">Powered by <span className="text-emerald-600 font-semibold">SIMPAS</span></span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}