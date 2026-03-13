import HeaderTitle from '@/Components/HeaderTitle';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/hooks/useFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link, router } from '@inertiajs/react';
import { IconArrowsDownUp, IconPlus, IconRefresh, IconTrash, IconUsers, IconArrowBackUp } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const statusVariant = {
    Dipinjam: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Dikembalikan: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Terlambat: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export default function Index(props) {
    useEffect(() => {
        if (props.flash_message?.message) {
            toast[props.flash_message.type || 'success'](props.flash_message.message);
        }
    }, [props.flash_message]);

    const rombels = props.rombels.data ?? [];
const meta = {
    current_page: props.rombels.current_page,
    per_page: props.rombels.per_page,
    from: props.rombels.from,
    total: props.rombels.total,
    has_pages: props.rombels.last_page > 1,
    links: props.rombels.links,
};
    const [params, setParams] = useState({
        search: props.state?.search || '',
        load: props.state?.load || 10,
        status: props.state?.status || '',
    });

    useFilter({
        route: route('admin.rombel-borrows.index'),
        values: params,
        only: ['rombels'],
    });
        console.log(props.rombels); 

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUsers}
                />
                <Link href={route('admin.rombel-borrows.create')}>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        <IconPlus className="size-4 mr-1" />
                        Tambah Peminjaman Rombel
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                        <Input
                            className="w-full sm:w-1/4"
                            placeholder="Cari kelas, siswa, buku..."
                            value={params.search}
                            onChange={(e) => setParams((p) => ({ ...p, search: e.target.value }))}
                        />
                        
<Select 
    value={params.status || "all"} // Kasih fallback ke "all" kalau status kosong
    onValueChange={(v) => setParams((p) => ({ ...p, status: v === "all" ? "" : v }))}
>
    <SelectTrigger className="w-full sm:w-40">
        <SelectValue placeholder="Semua Status" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="all">Semua Status</SelectItem> {/* Berikan value "all" */}
        <SelectItem value="Dipinjam">Dipinjam</SelectItem>
        <SelectItem value="Dikembalikan">Dikembalikan</SelectItem>
        <SelectItem value="Terlambat">Terlambat</SelectItem>
    </SelectContent>
</Select>
                        <Select value={params.load} onValueChange={(v) => setParams((p) => ({ ...p, load: v }))}>
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Load" />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 25, 50].map((n) => (
                                    <SelectItem key={n} value={n}>{n}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="red" onClick={() => setParams({ search: '', load: 10, status: '' })} size="xl">
                            <IconRefresh className="size-4" />
                            Bersihkan
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_th]:py-4 [&_td]:py-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>A.N. Siswa</TableHead>
                                <TableHead>Kelas</TableHead>
                                <TableHead>Buku</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Dipinjam</TableHead>
                                <TableHead>Batas Kembali</TableHead>
                                <TableHead>Dikembalikan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rombels.map((r, i) => (
                                <TableRow key={r.id}>
                                    <TableCell>{i + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{r.user?.nama}</p>
                                            <p className="text-xs text-muted-foreground">{r.user?.nisn}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.kelas}</TableCell>
                                    <TableCell className="max-w-[180px] truncate">{r.book?.judul}</TableCell>
                                    <TableCell>{r.qty} eks</TableCell>
                                    <TableCell>{r.borrowed_at}</TableCell>
                                    <TableCell>{r.due_at}</TableCell>
                                    <TableCell>{r.returned_at ?? '-'}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusVariant[r.status]}`}>
                                            {r.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {r.status !== 'Dikembalikan' && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-300 hover:bg-emerald-50">
                                                            <IconArrowBackUp className="size-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Konfirmasi Pengembalian</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Kembalikan {r.qty} eksemplar "{r.book?.judul}" dari kelas {r.kelas}?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => router.post(route('admin.rombel-borrows.return', r.id))}
                                                            >
                                                                Kembalikan
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="red" size="sm">
                                                        <IconTrash className="size-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => router.delete(route('admin.rombel-borrows.destroy', r.id))}
                                                        >
                                                            Hapus
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
                        Menampilkan <span className="font-medium text-orange-500">{meta.from ?? 0}</span> dari {meta.total} data
                    </p>
                    {meta.has_pages && (
                        <Pagination>
                            <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                {meta.links.map((link, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink href={link.url} isActive={link.active}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                            </PaginationContent>
                        </Pagination>
                    )}
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