import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLinkResponsive from '@/Components/NavLinkResponsive';
import {
    IconAntenna,
    IconBooks,
    IconBuilding,
    IconCards,
    IconCategory,
    IconChartArea,
    IconChartDots2,
    IconCreditCardPay,
    IconCreditCardRefund,
    IconDashboard,
    IconFileExcel,
    IconNotebook,
    IconStack,
    IconUser,
    IconUsersGroup,
} from '@tabler/icons-react';

export default function SidebarResponsive({ url, auth }) {
    return (
        <>
            {auth.role.some((role) => ['admin'].includes(role)) && (
                <nav className="grid gap-6 text-lg font-medium">
                    <ApplicationLogo />
                    <nav className="grid  items-start  text-sm font-semibold lg:px-4">
                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                        <NavLinkResponsive
                            url={route('dashboard')}
                            active={url.startsWith('/dashboard')}
                            title="Dashboard"
                            icon={IconDashboard}
                        />
                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Laporan Performa</div>
                        <NavLinkResponsive
                            url={route('admin.reports.index')}
                            active={url.startsWith('/admin/reports')}
                            title="Laporan Performa"
                            icon={IconChartArea}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Peminjaman</div>
                        <NavLinkResponsive
                                                url={route('admin.rombel-borrows.index')}
                                                active={url.startsWith('/admin/rombel-borrows')}
                                                title="Peminjaman Rombel"
                                                icon={IconCreditCardPay}
                                            />
                        <NavLinkResponsive
                            url={route('admin.borroweds.index')}
                            active={url.startsWith('/admin/borrowed')}
                            title="Riwayat Peminjaman"
                            icon={IconCreditCardPay}
                        />
                        <NavLinkResponsive
                            url={route('admin.loan-statistics.index')}
                            active={url.startsWith('/admin/loan-statistics')}
                            title="Statistik Peminjaman"
                            icon={IconCreditCardPay}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Pengembalian</div>
                        <NavLinkResponsive
                            url={route('admin.return-books.index')}
                            active={route().current('admin.return-books.*')}
                            title="Validasi Pengembalian"
                            icon={IconCreditCardRefund}
                        />
                        <NavLinkResponsive
                            url={route('admin.return-books-records.index')}
                            active={route().current('admin.return-books-records.*')}
                            title="Riwayat Pengembalian"
                            icon={IconCreditCardRefund}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Master</div>
                        <NavLinkResponsive
                            url={route('admin.books.index')}
                            active={url.startsWith('/admin/books')}
                            title="Buku"
                            icon={IconBooks}
                        />
                        <NavLinkResponsive
                            url={route('admin.publishers.index')}
                            active={url.startsWith('/admin/publishers')}
                            title="Penerbit"
                            icon={IconBuilding}
                        />
                        <NavLinkResponsive
                            url={route('admin.categories.index')}
                            active={url.startsWith('/admin/categories')}
                            title="Kategori"
                            icon={IconCategory}
                        />
                        <NavLinkResponsive
                            url={route('admin.book-stock-reports.index')}
                            title="Stok Buku"
                            icon={IconStack}
                            active={url.startsWith('/admin/book-stock-reports')}
                        />
                        <NavLinkResponsive
                            url={route('admin.ebooks.index')}
                            title="E-book"
                            icon={IconNotebook}
                            active={url.startsWith('/admin/ebook')}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Anggota</div>
                        <NavLinkResponsive
                            url={route('admin.users.index')}
                            title="Daftar Anggota"
                            icon={IconUsersGroup}
                            active={url.startsWith('/admin/users')}
                        />
                        <NavLinkResponsive
                            url={route('admin.kelas.index')}
                            title="Kenaikan Kelas"
                            icon={IconUsersGroup}
                            active={url.startsWith('/admin/kelas')}
                        />
                        {/* <div className="px-3 py-2 text-sm font-semibold text-foreground">Peran dan Izin</div>
                        <NavLinkResponsive
                            url={route('admin.roles.index')}
                            title="Peran"
                            icon={IconAlertCircle}
                            active={url.startsWith('/admin/roles')}
                        />
                        <NavLinkResponsive
                            url={route('admin.permissions.index')}
                            title="Izin"
                            icon={IconUser}
                            active={url.startsWith('/admin/permissions')}
                        />
                        <NavLinkResponsive
                            url={route('admin.assign-permissions.index')}
                            title="Izin"
                            icon={IconUser}
                            active={url.startsWith('/admin/assign-permissions')}
                        /> */}

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                        <NavLinkResponsive
                        url={route('admin.import-books.index')}
                        title="Import Buku"
                        icon={IconFileExcel}
                        active={url.startsWith('/admin/import-books')}
                    /><NavLinkResponsive
                        url={route('admin.import-members.index')}
                        title="Import Anggota"
                        icon={IconFileExcel}
                        active={url.startsWith('/admin/import-members')}
                    />
                        <NavLinkResponsive
                            url={route('admin.announcements.index')}
                            title="Pengumuman"
                            icon={IconAntenna}
                            active={url.startsWith('/admin/announcements')}
                        />
                        <NavLinkResponsive
                            url={route('profile.edit')}
                            title="Edit Profil"
                            icon={IconUser}
                            active={url.startsWith('/profile')}
                        />
                    </nav>
                </nav>
            )}

            {auth.role.some((role) => ['member'].includes(role)) && (
                <nav className="grid gap-6 text-lg font-medium">
                    <ApplicationLogo />
                    <nav className="grid  items-start  text-sm font-semibold lg:px-4">
                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Dashboard</div>
                        <NavLinkResponsive
                            url={route('dashboard')}
                            active={url.startsWith('/dashboard')}
                            title="Dashboard"
                            icon={IconDashboard}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Peminjaman</div>
                        <NavLinkResponsive
                            url={route('front.borroweds.index')}
                            active={url.startsWith('/borroweds')}
                            title="Peminjaman"
                            icon={IconCreditCardPay}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Pengembalian</div>
                        <NavLinkResponsive
                            url={route('front.return-books.index')}
                            active={url.startsWith('/return-books')}
                            title="Pengembalian"
                            icon={IconCreditCardRefund}
                        />
                        <NavLinkResponsive url="#" title="Riwayat Pengembalian" icon={IconChartDots2} />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Koleksi Perpustakaan</div>
                        <NavLinkResponsive
                            url={route('front.books.index')}
                            active={url.startsWith('/books')}
                            title="Buku"
                            icon={IconBooks}
                        />

                        <NavLinkResponsive
                            url={route('front.categories.index')}
                            active={url.startsWith('/categories')}
                            title="Kategori"
                            icon={IconCategory}
                        />
                        <NavLinkResponsive
                            url={route('admin.book-stock-reports.index')}
                            title="Stok Buku"
                            icon={IconStack}
                            active={url.startsWith('/admin/book-stock-reports')}
                        />
                        <NavLinkResponsive
                            url={route('front.ebooks.index')}
                            title="E-book"
                            icon={IconNotebook}
                            active={url.startsWith('/ebook')}
                        />

                        <div className="px-3 py-2 text-sm font-semibold text-foreground">Lainnya</div>
                       <NavLinkResponsive
                                               url={route('profile.edit')}
                                               title=" Edit Profil"
                                               icon={IconUser}
                                               active={route().current('profile.edit')}
                                           />
                                           <NavLinkResponsive
                                               url={route('profile.card')}
                                               title="Lihat Kartu Anggota"
                                               icon={IconCards}
                                               active={route().current('profile.card')}
                                           />
                    </nav>
                </nav>
            )}
        </>
    );
}
