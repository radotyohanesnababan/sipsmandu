import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';

import { IconAlertCircle, IconArrowLeft } from '@tabler/icons-react';

export default function Create(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        title: '',
        content: '',
        is_active: false,
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
                    icon={IconAlertCircle}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.announcements.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="title">Judul</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Masukkan Judul"
                                value={data.title}
                                onChange={onHandleChange}
                            />
                            {errors.title && <InputError message={errors.title} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="content">Isi Pengumuman</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Masukkan isi pengumuman"
                                value={data.content}
                                onChange={onHandleChange}
                            />
                            {errors.content && <InputError message={errors.content} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <div className="flex items-top space-x-2">
                                <Checkbox
                                    id="is_active"
                                    name="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked)}
                                />
                                <div className="grid gap-1/5 leading-none">
                                    <Label htmlFor="is_active">Apakah Aktif?</Label>
                                </div>
                            </div>
                            {errors.is_active && <InputError message={errors.is_active} />}
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
