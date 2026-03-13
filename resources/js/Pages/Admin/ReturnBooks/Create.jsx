import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCreditCardRefund } from '@tabler/icons-react';

export default function Create(props) {
    const onHandleReset = () => {
        reset();
    };
    const { data, setData, reset, put, processing, errors } = useForm({
        borrowed_at: props.date.borrowed.borrowed_at,
        borrowed_id: props.borrowed.id,
        returned_at: props.date.borrowed.returned_at,
        return_date: props.date.return_date,
        condition: null,
        notes: '',
        _method: props.page_settings.method,
    });
    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const onHandleSubmit = (e) => {
        e.preventDefault();

        put(props.page_settings.action);
    };

    return (
        <div className="flex w-full flex-col pb-32 space-y-4">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.return-books.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <div className="grid gap-4 lg:gap-8 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle> Data Peminjam</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Nama</Label>
                            <Input type="text" value={props.borrowed.user.nama} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>NISN</Label>
                            <Input type="text" value={props.borrowed.user.nisn} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Email</Label>
                            <Input type="text" value={props.borrowed.user.email} disabled />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle> Data Buku</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label>ID Buku</Label>
                            <Input type="text" value={props.borrowed.book.id} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Judul Buku</Label>
                            <Input type="text" value={props.borrowed.book.judul} disabled />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label>Penerbit</Label>
                            <Input type="text" value={props.borrowed.book.publisher.name} disabled />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Data Peminjaman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="borrowed_id"> ID Peminjaman</Label>
                            <Input
                                id="borrowed_id"
                                name="borrowed_id"
                                type="integer"
                                value={data.borrowed_id}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.borrowed_id && <InputError message={errors.borrowed_id} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="borrowed_at"> Tanggal Peminjaman</Label>
                            <Input
                                id="borrowed_at"
                                name="borrowed_at"
                                type="date"
                                value={data.borrowed_at}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.borrowed_at && <InputError message={errors.borrowed_at} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="returned_at">Batas Pengembalian</Label>
                            <Input
                                id="returned_at"
                                name="returned_at"
                                type="date"
                                value={data.returned_at}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.returned_at && <InputError message={errors.returned_at} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="return_date">Tanggal Pengembalian</Label>
                            <Input
                                id="return_date"
                                name="return_date"
                                type="date"
                                value={data.return_date}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.return_date && <InputError message={errors.return_date} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="condition">Kondisi</Label>
                            <Select
                                defaultValue={String(data.condition)}
                                onValueChange={(label) => setData('condition', label)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kondisi">
                                        {props.page_data.conditions.find(
                                            (condition) => String(condition.value) === String(data.condition),
                                        )?.label ?? 'Pilih kondisi'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.conditions.map((condition, index) => (
                                        <SelectItem key={index} value={String(condition.value)}>
                                            {condition.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.condition && <InputError message={errors.condition} />}
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="notes">Catatan</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Masukkan catatan ...."
                                value={data.notes}
                                onChange={onHandleChange}
                            ></Textarea>
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" onClick={onHandleReset} size="lg">
                                Reset
                            </Button>
                            <Button variant="green" type="submit" size="lg">
                                Kembalikan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle} />
);
