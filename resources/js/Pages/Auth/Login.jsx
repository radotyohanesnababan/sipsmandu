import ApplicationLogo from '@/Components/ApplicationLogo';
// Import InputError dihapus jika tidak ingin ada pesan di bawah input sama sekali
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'sonner';
import { useEffect } from 'react';


export default function Login({ status, canResetPassword }) {
    const { flash_message } = usePage().props;
    const slides = [
        'https://picsum.photos/1080/720?random=1',
        'https://picsum.photos/1080/720?random=2',
        'https://picsum.photos/1080/720?random=3',
    ];

    const { data, setData, post, processing, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        // Cek apakah flash_message ada dan memiliki pesan
        if (flash_message?.message) {
            const { type, message } = flash_message;
            if (type === 'error') {
                toast.error(message);
            } else if (type === 'success') {
                toast.success(message);
            } else {
                toast(message); 
            }
        }
    }, [flash_message]);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
            
            onError: (errors) => {
                
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
            onSuccess: () => {
                toast.success('Berhasil masuk!');
            }
        });
    };

    return (
        <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
            <div className="flex flex-col px-6 py-4">
                <ApplicationLogo size="12" />
                <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold">Masuk</h1>
                            <p className="text-balance text-muted-foreground">Masukkan email anda untuk masuk.</p>
                        </div>
                        <form onSubmit={onHandleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        autoComplete="username"
                                        isFocused={true}
                                        placeholder="adi@gmail.com"
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    
                                </div>

                                <div className="grid gap-2 ">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Lupa password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="new-password"
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-top space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="remember">Ingat saya</Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    variant="green"
                                    size="xl"
                                    className="w-full mt-2"
                                    disabled={processing}
                                >
                                    Masuk
                                </Button>
                            </div>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="underline">
                                Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Swiper Section */}
            <div className="hidden lg:block">
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
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
    );
}

Login.layout = (page) => <GuestLayout children={page} title="Login" />;