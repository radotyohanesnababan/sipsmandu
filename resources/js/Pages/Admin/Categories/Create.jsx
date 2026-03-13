import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconCategory } from '@tabler/icons-react';

export default function Create(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        description: '',
        _method: props.page_settings.method,
    });
    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
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
                    icon={IconCategory}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.categories.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Masukkan nama kategori"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Masukkan deskripsi kategori"
                                value={data.description}
                                onChange={onHandleChange}
                            />
                            {errors.description && <InputError message={errors.description} />}
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

Create.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle} />
);
