import ComboBox from '@/Components/ComboBox';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCreditCardPay } from '@tabler/icons-react';

export default function Edit(props) {
    const onHandleReset = () => {
        reset();
    };
    const { data, setData, reset, post, processing, errors } = useForm({
        user_nisn: props.page_data.users.nama ?? null,
        book_id: props.page_data.books.judul ?? null,
        borrowed_at: props.page_data.date.borrowed_at ?? '',
        returned_at: props.page_data.date.returned_at ?? '',
        _method: props.page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.page_settings.action);
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardPay}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.borroweds.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="user_nisn">Nama</Label>
                            <ComboBox
                                items={props.page_data.users}
                                selectedItem={data.user_nisn}
                                onSelect={(currentValue) => setData('user_nisn', parseInt(currentValue))}
                            />
                            {errors.user_nisn && <InputError message={errors.user_nisn} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="book_id">Buku</Label>
                            <ComboBox
                                items={props.page_data.books}
                                selectedItem={data.book_id}
                                onSelect={(currentValue) => setData('book_id', parseInt(currentValue))}
                            />
                            {errors.book_id && <InputError message={errors.book_id} />}
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" onClick={onHandleReset} size="lg">
                                Reset
                            </Button>
                            <Button variant="green" type="submit" size="lg">
                                Simpan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Edit.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle} />
);
