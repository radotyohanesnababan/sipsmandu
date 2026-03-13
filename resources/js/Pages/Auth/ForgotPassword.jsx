import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
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
                                <h1 className="text-3xl font-bold">Lupa Password</h1>
                                <p className="text-balance text-muted-foreground">
                                    Masukkan email anda untuk mereset password.
                                </p>
                            </div>

                            <form onSubmit={onHandleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="user1@gmail.com"
                                            autocomplete="username"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="green"
                                        size="xl"
                                        className="w-full"
                                        disabled={processing}
                                    >
                                        Email Password Reset Link
                                    </Button>
                                </div>

                                {errors.email && <InputError message={errors.email} />}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
ForgotPassword.layout = (page) => <GuestLayout children={page} title="Lupa Password" />;
