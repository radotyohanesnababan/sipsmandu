import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconVersions } from '@tabler/icons-react';

export default function Create(props) {
    const { data, setData, reset, post, processing, errors } = useForm({
        name: '',
        guard_name: 'web',
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
                    icon={IconVersions}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.permissions.index')}>
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
                                placeholder="Masukkan nama izin"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="guard_name">Guard Name</Label>
                            <Select
                                defaultValue={data.guard_name}
                                onValueChange={(value) => setData('guard_name', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {['web', 'api'].find((guard) => guard === data.guard_name) ?? 'Pilih Guard'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {['web', 'api'].map((guard) => (
                                        <SelectItem key={guard} value={guard}>
                                            {guard.charAt(0).toUpperCase() + guard.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.guard_name && <InputError message={errors.guard_name} />}
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
