import HeaderTitle from '@/Components/HeaderTitle';
import { MultiSelect } from '@/Components/MultiSelect';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconKeyframe } from '@tabler/icons-react';
import { useState } from 'react';

export default function Edit(props) {
    const [selectedPermissions, setSelectedPermissions] = useState(
        Array.from(new Set(props.role.permissions.map((permission) => permission.id))),
    );
    const { data, setData, reset, post, processing, errors } = useForm({
        name: props.role.name ?? '',
        permissions: selectedPermissions,
        _method: props.page_settings.method,
    });
    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handlePermissionChange = (selected) => {
        setSelectedPermissions(selected);
        setData('permissions', selected);
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
                    icon={IconKeyframe}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.assign-permissions.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Peran</Label>
                            <Input id="name" name="name" disabled value={data.name} onChange={onHandleChange} />
                            {errors.name && <InputError message={errors.name} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="permissions">Izin</Label>
                            <MultiSelect
                                options={props.permissions}
                                onValueChange={handlePermissionChange}
                                defaultValue={selectedPermissions}
                                placeholder="Pilih Izin"
                                variant="inverted"
                            />

                            {errors.permissions && <InputError message={errors.permissions} />}
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
