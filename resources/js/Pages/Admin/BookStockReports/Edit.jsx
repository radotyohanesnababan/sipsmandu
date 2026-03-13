import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconStack } from '@tabler/icons-react';
import { useRef } from 'react';

export default function Edit(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        total: props.stock.total ?? 0,
        available: props.stock.available ?? 0,
        borrowed: props.stock.borrowed ?? 0,
        lost: props.stock.lost ?? 0,
        _method: props.page_settings.method,
    });
    const calculateMinimumTotal = (available, borrowed, lost) => {
        return available + borrowed + lost;
    };
    const initialTotal = useRef(data.total);
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        const newValue = parseInt(value, 10) || 0;

        setData((prevData) => {
            const minimumTotal = initialTotal.current;

            const parsedValue = Number(newValue) || 0;

            // kalau field yang diubah 'total'
            if (name === 'total') {
                const validTotal = newValue >= minimumTotal ? newValue : minimumTotal;
                const totalDiff = validTotal - prevData.total;
                const newAvailable = prevData.available + totalDiff;

                return {
                    ...prevData,
                    total: validTotal,
                    available: newAvailable >= 0 ? newAvailable : 0,
                };
            }
            return {
                ...prevData,
                [name]: newValue,
            };
        });
    };
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
                    icon={IconStack}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.book-stock-reports.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="total">Total</Label>
                            <Input
                                type="number"
                                id="total"
                                name="total"
                                placeholder="Masukkan total"
                                value={data.total}
                                onChange={onHandleChange}
                            />
                            {errors.total && <InputError message={errors.total} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="available">Tersedia</Label>
                            <Input
                                id="available"
                                name="available"
                                value={data.available}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.available && <InputError message={errors.available} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="borrowed">Dipinjam</Label>
                            <Input
                                id="borrowed"
                                name="borrowed"
                                value={data.borrowed}
                                onChange={onHandleChange}
                                disabled
                            />
                            {errors.borrowed && <InputError message={errors.borrowed} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="lost">Hilang</Label>
                            <Input id="lost" name="lost" value={data.lost} onChange={onHandleChange} disabled />
                            {errors.lost && <InputError message={errors.lost} />}
                        </div>
                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" onClick={() => reset()} size="lg">
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
