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
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';
import { IconArrowsDownUp, IconBooks, IconPencil, IconPlus, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Index(props) {
    useEffect(() => {
        if (props.flash_message?.message) {
            toast[props.flash_message.type || 'success'](props.flash_message.message);
        }
    }, [props.flash_message]);
    //console.log('[Component] props.books:', props.books);
    const { data: books, meta } = props.books;
    const [params, setParams] = useState(() => ({
        search: props.state?.search || '',
        load: props.state?.load || 10,
        page: props.state?.page || 1,
    }));
    //console.log('[Component] render ulang, params:', params);
    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };
    useFilter({
        route: route('admin.books.index'),
        values: params,
        only: ['books'],
    });

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBooks}
                />

                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.books.create')}>
                        <IconPlus className="size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="Cari Kategori"
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                        />
                        <Select
                            value={params?.load}
                            onValueChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    load: parseInt(e, 10) || 0,
                                }))
                            }
                        >
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
                                        Kode Buku
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('judul')}
                                    >
                                        Judul Buku{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('isbn')}
                                    >
                                        ISBN{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>Stok</TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('tahun_terbit')}
                                    >
                                        Tahun Terbit{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('category.id')}
                                    >
                                        Kategori Buku{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('publisher.id')}
                                    >
                                        Penerbit{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('actions')}
                                    >
                                        Cover{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
                                <TableHead>
                                    <Button
                                        variant="ghost"
                                        className="group inline-flex "
                                        onClick={() => onSortable('created_at')}
                                    >
                                        Dibuat Pada{' '}
                                        <span className="ml-2 flex-none rounded text-muted-foreground">
                                            <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                        </span>
                                    </Button>
                                </TableHead>
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
                            {books.map((book, index) => (
                                <TableRow key={book.id}>
                                    <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>{book.judul}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>{book.stok.total}</TableCell>
                                    <TableCell>{book.tahun_terbit}</TableCell>
                                    <TableCell>{book.category.name}</TableCell>
                                    <TableCell>{book.publisher.name}</TableCell>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage
                                                src={book.cover}
                                                alt={book.judul}
                                                loading="eager"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', e);
                                                }}
                                            />
                                            <AvatarFallback>
                                                {book.judul.substring(0, 1)?.toUpperCase() ?? '-'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{book.created_at}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-x-1">
                                            <Button variant="green" size="sm" asChild>
                                                <Link href={route('admin.books.edit', [book])}>
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
                                                            Apakah anda yakin ingin menghapus buku ini?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan. Semua data yang terkait
                                                            dengan buku ini akan dihapus secara permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                router.delete(route('admin.books.destroy', [book]))
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
                        {meta.total} kategori
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
