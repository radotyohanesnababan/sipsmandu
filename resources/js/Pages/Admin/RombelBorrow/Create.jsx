import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconUsers, IconArrowLeft, IconLoader2 } from '@tabler/icons-react';
import { useState } from 'react';

export default function Create(props) {
    const { data, setData, post, processing, errors } = useForm({
        user_nisn: '',
        book_id: '',
        kelas: '',
        qty: '',
        catatan: '',
    });

    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookChange = (bookId) => {
        setData('book_id', bookId);
        const book = props.books.find((b) => String(b.id) === String(bookId));
        setSelectedBook(book ?? null);
    };

    const submit = (e) => {
        e.preventDefault();
        post(props.action);
    };

    return (
        <div className="flex flex-col w-full pb-32">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconUsers}
                />
                <Link href={route('admin.rombel-borrows.index')}>
                    <Button variant="outline">
                        <IconArrowLeft className="size-4 mr-1" />
                        Kembali
                    </Button>
                </Link>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-base">Form Peminjaman Rombel</CardTitle>
                </CardHeader>
                <form onSubmit={submit}>
                    <CardContent className="space-y-5">

                        {/* A.N. Siswa */}
                        <div className="space-y-1.5">
                            <Label>A.N. Siswa (Penanggung Jawab)</Label>
                            <Select value={data.user_nisn.toString()} onValueChange={(v) => setData('user_nisn', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih siswa..." />
                                </SelectTrigger>
                                <SelectContent>
    {props.users.map((u) => (
        <SelectItem key={u.nisn} value={u.nisn.toString()}> {/* <--- Tambah .toString() di sini */}
            {u.nama} — {u.nisn}
        </SelectItem>
    ))}
</SelectContent>
                            </Select>
                            <InputError message={errors.user_nisn} />
                        </div>

                        {/* Kelas Target */}
                        <div className="space-y-1.5">
                            <Label>Kelas Target</Label>
                            <Input
                                value={data.kelas}
                                onChange={(e) => setData('kelas', e.target.value)}
                                placeholder="Contoh: X IPA 1, XI IPS 2"
                            />
                            <InputError message={errors.kelas} />
                        </div>

                        {/* Buku */}
                        <div className="space-y-1.5">
                            <Label>Buku</Label>
                            <Select value={String(data.book_id)} onValueChange={handleBookChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih buku..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.books.map((b) => (
                                        <SelectItem key={b.id} value={String(b.id)}>
                                            {b.judul} {b.isbn ? `— ${b.isbn}` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {selectedBook && (
                                <p className="text-xs text-muted-foreground">
                                    Stok tersedia: <span className="font-semibold text-emerald-600">{selectedBook.stock?.available ?? '?'} eksemplar</span>
                                </p>
                            )}
                            <InputError message={errors.book_id} />
                        </div>

                        {/* Jumlah */}
                        <div className="space-y-1.5">
                            <Label>Jumlah (Qty)</Label>
                            <Input
                                type="number"
                                min={1}
                                value={data.qty}
                                onChange={(e) => setData('qty', e.target.value)}
                                placeholder="Jumlah eksemplar yang dipinjam"
                            />
                            <InputError message={errors.qty} />
                        </div>

                        {/* Catatan */}
                        <div className="space-y-1.5">
                            <Label>Catatan <span className="text-muted-foreground font-normal">(opsional)</span></Label>
                            <textarea
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                                placeholder="Catatan tambahan..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            />
                            <InputError message={errors.catatan} />
                        </div>

                        {/* Info 24 jam */}
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
                            <svg className="size-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Batas pengembalian otomatis <strong>24 jam</strong> dari waktu peminjaman dicatat.
                        </div>
                    </CardContent>

                    <CardFooter className="border-t pt-4 flex justify-end gap-3">
                        <Link href={route('admin.rombel-borrows.index')}>
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                            {processing ? (
                                <><IconLoader2 className="size-4 animate-spin mr-2" /> Menyimpan...</>
                            ) : (
                                'Simpan Peminjaman'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

Create.layout = (page) => (
    <AppLayout title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle}>
        {page}
    </AppLayout>
);