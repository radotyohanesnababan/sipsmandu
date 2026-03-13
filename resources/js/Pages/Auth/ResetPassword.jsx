import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ResetPassword({ token, email }) {
    //console.log('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    useEffect(() => {
        //console.log('Token dari React:', token);
        //console.log('Email dari React:', email);
    }, [token, email]);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
                <div className="flex flex-col px-6 py-4">
                    <ApplicationLogo size="12" />
                    <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                        <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Reset Password</h1>
                                <p className="text-balance text-muted-foreground">
                                    Gunakan password yang aman dan mudah diingat.
                                </p>
                            </div>
                            {/* Form */}
                            <form onSubmit={onHandleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            autoComplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />

                                        {errors.email && <InputError message={errors.email} className="mt-2" />}
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="password">Password</Label>

                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <InputError message={errors.password} />}
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                        <Input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                        {errors.password_confirmation && (
                                            <InputError message={errors.password_confirmation} className="mt-2" />
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="green"
                                        size="xl"
                                        className="mt-4 w-full"
                                        disabled={processing}
                                    >
                                        Reset Password
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ResetPassword.layout = (page) => (
    <GuestLayout title="Reset Password">
        <Head title="Reset Password" />
        {page}
    </GuestLayout>
);
