import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Head, Link, useForm } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Register({ kelas = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: '',
        email: '',
        nisn: '',
        password: '',
        password_confirmation: '',
        kelas_id: '',
    });
    const slides = [
        'https://picsum.photos/1080/720?random=1',
        'https://picsum.photos/1080/720?random=2',
        'https://picsum.photos/1080/720?random=3',
    ];

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div>
            <Head title="Register" />

            <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-20">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Daftar</h1>
                                <p className="text-balance text-muted-foreground">
                                    Masukkan informasi siswa anda untuk mendaftar.
                                </p>
                            </div>
                            <form onSubmit={submit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="nama">Nama</Label>

                                        <Input
                                            id="nama"
                                            name="nama"
                                            value={data.nama}
                                            autoComplete="nama"
                                            onChange={onHandleChange}
                                        />

                                        {errors.nama && <InputError message={errors.nama} />}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="nisn">NISN</Label>

                                        <Input
                                            id="nisn"
                                            name="nisn"
                                            value={data.nisn}
                                            autoComplete="nisn"
                                            onChange={onHandleChange}
                                        />

                                        {errors.nisn && <InputError message={errors.nisn} />}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="kelas">Kelas</Label>
                                        <Select
                                            value={data.kelas_id || ''}
                                            onValueChange={(value) => setData('kelas_id', value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Pilih Kelas" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.isArray(kelas) && kelas.length > 0 ? (
                                                    kelas.map((k) => (
                                                        <SelectItem key={k.id} value={String(k.id)}>
                                                            {k.tingkat}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="">Belum ada data kelas</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.kelas_id} className="mt-2" />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="email"
                                            type="email"
                                            onChange={onHandleChange}
                                        />

                                        {errors.email && <InputError message={errors.email} />}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>

                                        <Input
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password && <InputError message={errors.password} />}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>

                                        <Input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={onHandleChange}
                                        />

                                        {errors.password_confirmation && (
                                            <InputError message={errors.password_confirmation} />
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="green"
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Daftar Sekarang!
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-4 text-center text-sm">
                                Sudah punya akun?
                                <Link href={route('login')} className="underline">
                                    Masuk
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: false,
                        }}
                        navigation={false}
                        className="w-full h-full"
                    >
                        {slides.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
