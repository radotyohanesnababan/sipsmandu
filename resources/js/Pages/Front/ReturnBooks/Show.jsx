import HeaderTitle from '@/Components/HeaderTitle';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { IconCircleCheck, IconCreditCardRefund } from '@tabler/icons-react';

export default function Show(props) {
    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center ">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconCreditCardRefund}
                />
            </div>
            <Card>
                <CardHeader className="flex flex-col gap-6 text-sm border-b border-muted lg:flex-row lg:items-center lg:justify-between lg:px-6">
                    <div>
                        <dt className="font-medum text-foreground">ID Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.borrowed.id}</dd>
                    </div>
                    <div>
                        <dt className="font-medum text-foreground">Peminjam</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.user.nama}</dd>
                    </div>
                    <div>
                        <dt className="font-medum text-foreground">Tanggal Peminjaman</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.borrowed.borrowed_at}</dd>
                    </div>
                    <div>
                        <dt className="font-medum text-foreground">ID Pengembalian</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.id}</dd>
                    </div>
                    <div>
                        <dt className="font-medum text-foreground">Status</dt>
                        <dd className="mt-1 text-muted-foreground">{props.return_book.status}</dd>
                    </div>
                </CardHeader>
                <CardContent className="py-6 divide-y divide-gray-200">
                    <div className="flex items-center lg:items-start">
                        <div className="flex-shrink-0 w-20 h-10 overflow-hidden bg-gray-200 rounded-lg lg:h-40 lg:w-40">
                            <img
                                src={props.return_book.book.cover}
                                alt={props.return_book.book.judul}
                                className="object-cover obect-center w-full h-full"
                            />
                        </div>
                        <div className="flex-1 ml-6 text-sm">
                            <h5 className="text-lg font-bold leading-relaxed">{props.return_book.book.judul}</h5>
                            <p className="hidden text-muted-foreground lg:mt-2 lg:block">
                                {props.return_book.book.deskripsi}
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center">
                        <IconCircleCheck className="text-green-500 size-5" />
                        <p className="ml-2 text-sm font-medium text-muted-foreground">
                            Dikembalikan pada tanggal{' '}
                            <time dateTime={props.return_book.return_date}>{props.return_book.return_date}</time>
                        </p>
                    </div>

                    <div className="flex pt-6 text-sm font-medium lg:items-center lg:border-none lg:pt-0">
                        <div className="flex justify-between flex-1">
                            <Button variant="link">
                                <Link href={route('front.books.show', [props.return_book.book.slug])}>Lihat Buku</Link>
                            </Button>
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <h2 className="font-semibold leading-relaxed text-foreground">Informasi Pengembalian</h2>

            {props.return_book.status === 'Dikembalikan' ? (
                <Alert variant="success">
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Setelah melalui pengecekan, buku anda telah <strong>dikembalikan</strong> pada tanggal{' '}
                        <time dateTime={props.return_book.return_date}>{props.return_book.return_date}</time>.
                    </AlertDescription>
                </Alert>
            ) : props.return_book.status === 'Pengecekan' ? (
                <Alert variant="info">
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Buku anda <strong>sedang dalam proses pengecekan</strong> oleh petugas perpustakaan. Mohon
                        tunggu konfirmasi lebih lanjut.
                    </AlertDescription>
                </Alert>
            ) : (
                <Alert variant="destructive">
                    <AlertTitle>Informasi</AlertTitle>
                    <AlertDescription>
                        Setelah melalui pengecekan, buku anda <strong>hilang</strong>. Silahkan download surat pernyataan buku hilang dibawah ini dan serahkan ke
                        petugas perpustakaan.
                    </AlertDescription>
                    <a
                        href={route('front.return-books.download', props.return_book.id)}
                        className="inline-block bg-red-400 font-semibold py-2 px-2 rounded-lg mt-4 border border-red-500 hover:bg-red-500 text-white text-md"
                        target="_blank"
                    >
                        Download Surat Pernyataan
                    </a>


                    <AlertDescription></AlertDescription>
                </Alert>
            )}

            <Card>
                <CardContent className="p-6 space-y-20">
                    <div className="px-4 py-6 rounded-lg">
                        <dl className="flex flex-col text-sm leading-relaxed gap-x-12 gap-y-4 text-foreground lg:flex-row justify-between">
                            <div className="flex flex-col">
                                <dt className="font-semibold">ID Peminjaman</dt>
                                <dd>{props.return_book.borrowed.id}</dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="font-semibold">Tanggal Peminjaman</dt>
                                <dd>{props.return_book.borrowed.borrowed_at}</dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="font-semibold">Batas Pengembalian</dt>
                                <dd>{props.return_book.borrowed.returned_at}</dd>
                            </div>
                            <div className="flex flex-col border bg-gray-200 rounded-lg p-2 ">
                                <dt className="font-semibold text-gray-500">Tanggal Pengembalian</dt>
                                <dd>{props.return_book.return_date}</dd>
                            </div>
                        </dl>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

Show.layout = (page) => (
    <AppLayout title={page.props.page_settings.title} subtitle={page.props.page_settings.subtitle}>
        {page}
    </AppLayout>
);
