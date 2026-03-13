import PrimaryButton from '@/Components/PrimaryButton';
import { Button } from '@/Components/ui/button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                {status === 'verification-link-sent' && (
                                    <Alert variant="success">
                                        <AlertDescription>
                                            A new verification link has been sent to the email address you provided.
                                        </AlertDescription>
                                    </Alert>
                                )}
                                <h1 className="text-3xl font-bold">Verifikasi Email</h1>
                                <p className="text-balance text-muted-foreground">
                                    Terima kasih telah mendaftar! Sebelum memulai, dapatkah Anda memverifikasi alamat
                                    email Anda dengan mengeklik tautan yang baru saja kami kirimkan kepada Anda? Jika
                                    Anda tidak menerima email tersebut, kami akan dengan senang hati mengirimkan email
                                    lain kepada Anda.
                                </p>
                            </div>
                            {/* FORM */}
                            <form onSubmit={onHandleSubmit}>
                                <div className="grid gap-4 ">
                                    <Button variant="green" size="xl" className="w-full" disabled={processing}>
                                        Kirim Ulang Tautan Verifikasi
                                    </Button>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </form>
                            <div className="mt-4 text-center text-sm ">
                                <Link href={route('logout')} method="post" as="button" className="underline">
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}
            </div>
        </>
    );
}

VerifyEmail.layout = (page) => <GuestLayout children={page} title="Verifikasi Email" />;
