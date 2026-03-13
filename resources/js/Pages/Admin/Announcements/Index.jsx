import HeaderTitle from '@/Components/HeaderTitle';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { IconAlertCircle, IconArrowsDownUp, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
    useEffect(() => {
        if (props.flash_message?.message) {
            toast[props.flash_message.type || 'success'](props.flash_message.message);
        }
    }, [props.flash_message]);

    const { data: announcements, meta } = props.announcements;
    const [params, setParams] = useState(() => ({
        search: props.state?.search || '',
        load: props.state?.load || 10,
        page: props.state?.page || 1,
    }));

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconAlertCircle}
                />

                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.announcements.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="px-0 py-0 [&-td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_th]:py-4 [&_td]:py-4">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Aktif</TableHead>
                                <TableHead>Dibuat Pada</TableHead>
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
                            {announcements.map((announcement, index) => (
                                <TableRow key={announcement.id}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{announcement.title}</TableCell>
                                    <TableCell>{announcement.is_active}</TableCell>
                                    <TableCell>{announcement.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="green" size="sm" asChild>
                                                <Link href={route('admin.announcements.edit', [announcement])}>
                                                    <IconPencil className="size-4" />
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <IconTrash size="4"></IconTrash>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah anda yakin ingin menghapus Pengumuman ini?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan. Semua data yang terkait
                                                            dengan Pengumuman ini akan dihapus secara permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(
                                                                    route('admin.announcements.destroy', [
                                                                        announcement,
                                                                    ]),
                                                                )
                                                            }
                                                        >
                                                            Lanjutkan
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
                        {meta.total} Pengumuman
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
