import CardStat from '@/Components/CardStat';
import ChartCustom from '@/Components/ChartCustom';
import HeaderTitle from '@/Components/HeaderTitle';
import ScanPeminjaman from '@/Components/ScanPeminjaman';
import ScanPengembalian from '@/Components/ScanPengembalian';
import BookCard from '@/Components/ui/BookCard';
import EbookCard from '@/Components/ui/EbookCard';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import {
    IconArrowUpRight,
    IconBooks,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconUsersGroup,
} from '@tabler/icons-react';

export default function Dashboard(props) {
    //console.log(props.page_data.transactionChart);
    const auth = props.auth.user;
    return (
        <div className="flex flex-col w-full pb-32 space-y-4">
            <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconDashboard}
                ></HeaderTitle>
            </div>
            {auth.role.some((role) => ['admin'].includes(role)) && (
                <><>
                <div className="flex flex-col gap-4 md:gap-8">
    {/* Scan Pengembalian — full width */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <ScanPengembalian />
    <ScanPeminjaman />
</div>

    {/* 4 Card Stats */}
    <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
        <CardStat
            data={{
                title: 'Total Buku',
                icon: IconBooks,
                background: 'text-white  from-green-400 via-green-500 to-green-600',
                iconClassName: 'text-white',
            }}
        >
            <div className="text-2xl font-bold">{props.page_data.total_books}</div>
        </CardStat>
        <CardStat
            data={{
                title: 'Total Pengguna',
                icon: IconUsersGroup,
                background: 'text-white  from-purple-400 via-purple-500 to-purple-600',
                iconClassName: 'text-white',
            }}
        >
            <div className="text-2xl font-bold">{props.page_data.total_users}</div>
        </CardStat>
        <CardStat
            data={{
                title: 'Total Peminjaman',
                icon: IconCreditCardPay,
                background: 'text-white  from-rose-400 via-rose-500 to-rose-600',
                iconClassName: 'text-white',
            }}
        >
            <div className="text-2xl font-bold">{props.page_data.total_borrowed}</div>
        </CardStat>
        <CardStat
            data={{
                title: 'Total Pengembalian',
                icon: IconCreditCardRefund,
                background: 'text-white  from-lime-400 via-lime-500 to-lime-600',
                iconClassName: 'text-white',
            }}
        >
            <div className="text-2xl font-bold">{props.page_data.total_returned}</div>
        </CardStat>
    </div>
</div>
                
                <ChartCustom chartData={props.page_data.transactionsChart} /></><div className="flex flex-col justify-between w-full gap-2 lg:flex-row">
                        <Card className="w-full lg:w-1/2">
                            <CardHeader>
                                <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                                    <div className="flex flex-col gap-y-2">
                                        <CardTitle> Transaksi Peminjaman</CardTitle>
                                        <CardDescription>Data Peminjaman Terbaru</CardDescription>
                                    </div>
                                    <Button variant="green" asChild>
                                        {auth.role.some((role) => ['admin'].includes(role)) ? (
                                            <Link href={route('admin.borroweds.index')}>
                                                Lihat Semua
                                                <IconArrowUpRight className="size-4" />
                                            </Link>
                                        ) : (
                                            <Link href="#">
                                                Lihat Semua
                                                <IconArrowUpRight className="size-4" />
                                            </Link>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 [&_td:whitespace-nowrap] [&_td]:px-6 [&_th]:px-6">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>ID Pinjam</TableHead>
                                            <TableHead>Buku</TableHead>
                                            <TableHead>Peminjam</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    {props.page_data.borroweds.map((borroweds, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{borroweds.id}</TableCell>
                                            <TableCell>{borroweds.book.judul}</TableCell>
                                            <TableCell>{borroweds.user.nama}</TableCell>
                                        </TableRow>
                                    ))}
                                </Table>
                            </CardContent>
                        </Card>
                        <Card className="w-full lg:w-1/2">
                            <CardHeader>
                                <div className="flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center">
                                    <div className="flex flex-col gap-y-2">
                                        <CardTitle> Transaksi Pengembalian</CardTitle>
                                        <CardDescription>Data Pengembalian Terbaru</CardDescription>
                                    </div>
                                    <Button variant="green" asChild>
                                        {auth.role.some((role) => ['admin'].includes(role)) ? (
                                            <Link href={route('admin.return-books.index')}>
                                                Lihat Semua
                                                <IconArrowUpRight className="size-4" />
                                            </Link>
                                        ) : (
                                            <Link href="#">
                                                Lihat Semua
                                                <IconArrowUpRight className="size-4" />
                                            </Link>
                                        )}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0 [&_td:whitespace-nowrap] [&_td]:px-6 [&_th]:px-6">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>ID Pinjam</TableHead>
                                            <TableHead>Buku</TableHead>
                                            <TableHead>Peminjam</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {props.page_data.return_books.map((return_books, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{return_books.id}</TableCell>
                                                <TableCell>{return_books.book.judul}</TableCell>
                                                <TableCell>{return_books.user.nama}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div></>
                
                
            )}
            {auth.role.some((role) => ['member'].includes(role)) && (
    <>
        <div className="py-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Buku Terbaru</div>
                <Button variant="link" asChild>
                    <Link href={route('front.books.index')}>Lihat Semua</Link>
                </Button>
            </div>
            <div className="grid gap-4 py-10 border-b border-dashed border-muted md:gap-8 lg:grid-cols-4">
                {props.page_data.newest_books.map((book) => (
                    <BookCard key={book.id} item={book} />
                ))}
            </div>
        </div>
        <div className="py-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">Buku Paling Banyak Dipinjam</div>
                <Button variant="link" asChild>
                    <Link href={route('front.books.index')}>Lihat Semua</Link>
                </Button>
            </div>
            <div className="grid gap-4 py-10 border-b border-dashed border-muted md:gap-8 lg:grid-cols-4">
                {props.page_data.most_loan_books.map((book) => (
                    <BookCard key={book.id} item={book} />
                ))}
            </div>
        </div>
        <div className="py-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">E-Book Terbaru</div>
                <Button variant="link" asChild>
                    <Link href={route('front.ebooks.index')}>Lihat Semua</Link>
                </Button>
            </div>
            <div className="grid gap-4 py-10 border-b border-dashed border-muted md:gap-8 lg:grid-cols-4">
                {props.page_data.newest_ebooks.map((book) => (
                    <EbookCard key={book.id} item={book} />
                ))}
            </div>
        </div>
        <div className="py-2">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">E-Book Paling Banyak Didownload</div>
                <Button variant="link" asChild>
                    <Link href={route('front.ebooks.index')}>Lihat Semua</Link>
                </Button>
            </div>
            <div className="grid gap-4 py-10 border-b border-dashed border-muted md:gap-8 lg:grid-cols-4">
                {props.page_data.most_download_ebooks.map((book) => (
                    <EbookCard key={book.id} item={book} />
                ))}
            </div>
        </div>
        
        
        
        
    </>
)}

            
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;
