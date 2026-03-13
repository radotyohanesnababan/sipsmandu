import WelcomeLayout from '@/Layouts/WelcomeLayout';
import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const BookIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
            d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.794 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.206 18 16.5 18s-3.332.477-4.5 1.247" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
);

export default function Welcome(props) {
    const auth = props.auth.user;
    const categories = props.page_data.categories || [];
    const slides = ['/storage/libfront1(1).webp', '/storage/libfront1(2).webp', '/storage/libfront1(3).webp'];

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50">

            {/* ─── HERO ─── */}
            <section
                id="beranda"
                className="relative flex flex-col justify-center overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 md:min-h-[88vh]"
                style={{ background: 'linear-gradient(135deg, #f8faf8 0%, #eef3ef 40%, #e6ede8 100%)' }}
            >
                {/* Decorative blobs */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute -top-16 -right-16 w-72 h-72 md:w-[480px] md:h-[480px] rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #6ee7b7, transparent 70%)' }} />
                    <div className="absolute bottom-0 -left-10 w-52 h-52 md:w-[320px] md:h-[320px] rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, #94a3b8, transparent 70%)' }} />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="container mx-auto px-5 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

                        {/* Text */}
                        <div className="space-y-5 md:space-y-7 text-center md:text-left order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Sistem Perpustakaan Digital
                            </div>

                            <div>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-800 leading-[1.05] tracking-tight">
                                    SIMPAS
                                </h1>
                                <p className="mt-2 text-slate-500 font-medium text-sm tracking-widest uppercase">
                                    Perpustakaan · SMAN 2 Siborongborong
                                </p>
                            </div>

                            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                Temukan, pinjam, dan baca koleksi buku pilihan untuk mendukung proses belajarmu — kapan saja, di mana saja.
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-900/20"
                                >
                                    Mulai Sekarang
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <a
                                    href="#tentang"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-white hover:border-slate-400 transition-all duration-200"
                                >
                                    Pelajari Lebih
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="flex justify-center md:justify-start gap-6 md:gap-8 pt-4 border-t border-slate-200">
                                {[
                                    { num: '1.200+', label: 'Koleksi Buku' },
                                    { num: '24/7', label: 'Akses Online' },
                                    { num: '300+', label: 'Pengguna Aktif' },
                                ].map((s) => (
                                    <div key={s.label} className="text-center md:text-left">
                                        <p className="text-xl md:text-2xl font-black text-slate-800">{s.num}</p>
                                        <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative order-1 md:order-2">
                            <div className="absolute -inset-3 rounded-[2rem] bg-emerald-100/60 blur-xl -z-10" />
                            <div className="rounded-2xl md:rounded-[1.75rem] overflow-hidden ring-1 ring-slate-200 shadow-xl md:shadow-2xl">
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    spaceBetween={0}
                                    centeredSlides={true}
                                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                                    pagination={{ clickable: true }}
                                    loop={true}
                                    className="w-full h-52 sm:h-64 md:h-[380px]"
                                >
                                    {slides.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={src}
                                                alt={`Slide ${i + 1}`}
                                                className="w-full h-full object-cover"
                                                loading={i === 0 ? 'eager' : 'lazy'}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            {/* Floating badge — hidden on small screens */}
                            <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100 items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <BookIcon />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-700">Koleksi Terbaru</p>
                                    <p className="text-xs text-slate-400">Diperbarui mingguan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── KATEGORI ─── */}
            <section id="kategori" className="bg-white py-14 md:py-20 px-5 sm:px-6 border-t border-slate-100">
                <div className="container mx-auto">
                    <div className="text-center mb-8 md:mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Koleksi Kami</span>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">Jelajahi Kategori Buku</h2>
                        <p className="text-slate-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
                            Temukan bacaan favoritmu dari berbagai kategori yang tersedia di SIMPAS.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                        {categories.slice(0, 6).map((item, idx) => (
                            <div
                                key={item.id || idx}
                                className="group flex flex-col items-center justify-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 cursor-default"
                            >
                                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white group-hover:bg-emerald-100 border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center transition-colors duration-300">
                                    <svg className="w-5 h-5 text-slate-500 group-hover:text-emerald-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.794 18 7.5 18s3.332.477 4.5 1.247m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.523 18.206 18 16.5 18s-3.332.477-4.5 1.247" />
                                    </svg>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 group-hover:text-emerald-800 text-center transition-colors duration-300 leading-tight">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TENTANG ─── */}
            <section id="tentang" className="py-14 md:py-24 px-5 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f1f5f2 0%, #eaf0ea 100%)' }}>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">

                        {/* Swiper */}
                        <div className="relative">
                            <div className="absolute -inset-2 rounded-[2rem] bg-slate-200/50 -z-10 blur-lg" />
                            <div className="rounded-2xl md:rounded-[1.5rem] overflow-hidden ring-1 ring-slate-200 shadow-lg md:shadow-xl">
                                <Swiper
                                    modules={[Autoplay, Pagination, Navigation]}
                                    spaceBetween={0}
                                    centeredSlides={true}
                                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                                    pagination={{ clickable: true }}
                                    navigation={true}
                                    loop={true}
                                    className="w-full h-56 sm:h-72 md:h-[420px]"
                                >
                                    {slides.map((src, i) => (
                                        <SwiperSlide key={i}>
                                            <img
                                                src={src}
                                                alt={`Slide ${i + 1}`}
                                                className="w-full h-full object-cover"
                                                loading={i === 0 ? 'eager' : 'lazy'}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* Text */}
                        <div className="space-y-5 md:space-y-6">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Tentang</span>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-800 mt-2 leading-tight">
                                    Perpustakaan SMAN 2 Siborongborong
                                </h2>
                            </div>

                            <p className="text-slate-600 leading-relaxed text-sm">
                                SIMPAS hadir untuk mendukung kegiatan belajar mengajar dengan menyediakan berbagai koleksi buku pelajaran, referensi, dan literatur umum. Kami terus berinovasi agar siswa dan guru dapat mengakses informasi dengan cepat dan mudah.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Kami percaya bahwa membaca adalah jendela dunia — dan melalui SIMPAS, setiap siswa dapat memperluas wawasan kapan pun dan di mana pun.
                            </p>

                            <div className="grid grid-cols-1 gap-2.5 md:gap-3 pt-1">
                                {[
                                    { title: 'Koleksi Terintegrasi', desc: 'Buku digital dan cetak tersedia dalam satu platform.' },
                                    { title: 'Akses 24/7', desc: 'Seluruh siswa dan guru dapat membaca kapan saja.' },
                                    { title: 'Peminjaman Efisien', desc: 'Sistem peminjaman dan pengembalian yang terkomputerisasi.' },
                                ].map((f) => (
                                    <div key={f.title} className="flex items-start gap-3">
                                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                                            <CheckIcon />
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-800">{f.title}. </span>
                                            <span className="text-sm text-slate-500">{f.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-1">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-emerald-800 transition-colors duration-300"
                                >
                                    Daftar & Mulai Membaca
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Welcome.layout = (page) => (
    <WelcomeLayout
        children={page}
        title="SIMPAS | Perpustakaan SMAN 2 Siborongborong"
        description="SIMPAS — Sistem Perpustakaan Digital SMAN 2 Siborongborong. Koleksi buku lengkap, akses mudah, dan layanan terbaik untuk mendukung pembelajaran."
    />
);