import HeaderTitle from '@/Components/HeaderTitle';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconArrowsDownUp, IconGitPullRequest, IconKeyframe, IconRefresh } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
    useEffect(() => {
        if (props.flash_message?.message) {
            toast[props.flash_message.type || 'success'](props.flash_message.message);
        }
    }, [props.flash_message]);

    const { data: roles, meta } = props.roles;
    const [params, setParams] = useState(() => ({
        search: props.state?.search || '',
        load: props.state?.load || 10,
        page: props.state?.page || 1,
    }));
    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };
    useFilter({
        route: route('admin.assign-permissions.index'),
        values: params,
        only: ['roles'],
    });

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconKeyframe}
                />
            </div>
            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="Cari Peran"
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                        />
                        <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 50, 75, 100].map((number, index) => (
                                    <SelectItem key={index} value={number}>
                                        {number}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="red" onClick={() => setParams(props.state)} size="xl">
                            <IconRefresh className="size-4"></IconRefresh>
                            Bersihkan
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_th]:py-4 [&_td]:py-4">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('id')}
                                    >
                                        #{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('id')}
                                    >
                                        ID{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('name')}
                                    >
                                        Nama{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>

                                <TableHead></TableHead>
                                <TableHead>
                                    <Button variant="ghost" className="group inline-flex ">
                                        Aksi{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role, index) => (
                                <TableRow key={role.id}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>
                                        {role.permissions.map((permission, index) => (
                                            <span className="w-auto text-wrap " key={index}>
                                                <Badge variant="outline">{permission}</Badge>
                                            </span>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="green" size="sm" asChild>
                                                <Link href={route('admin.assign-permissions.edit', [role])}>
                                                    <IconGitPullRequest className="size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <p className="mb-2 text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-orange-500">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} izin
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && (
                            <Pagination>
                                <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                    {meta.links.map((link, index) => (
                                        <PaginationItem key={index} className="mx-1 mb1 lb:mb-0">
                                            <PaginationLink href={link.url} isActive={link.active}>
                                                {link.label}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => (
    <AppLayout title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle}>
        {page}
    </AppLayout>
);
