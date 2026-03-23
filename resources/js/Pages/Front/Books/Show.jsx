import { Button } from '@/Components/ui/button';
import AppLayout from '@/Layouts/AppLayout';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Show(props) {
    useEffect(() => {
        if (props.flash_message?.message) {
            toast[props.flash_message.type || 'success'](props.flash_message.message);
        }
    }, [props.flash_message]);
    return (
        <div className="flex flex-col w-full pb-32 space-y-12">
            <div className="lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10">
                <div className="lg:col-span-4 lg:row-end-1">
                    <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-4 max-w-sm">
                        <img src={props.book.cover} alt={props.book.judul} />
                    </div>
                </div>

                <div className="mt-14 lg:col-span-8 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                    <div className="flex flex-col-reverse">
                        <div className="mt-4">
                            <h2 className="text-xl font-bold tracking-tighter text-foreground">{props.book.judul}</h2>

                            <p className="mt-2 text-sm text-muted-foreground">{props.book.created_at}</p>
                        </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{props.book.deskripsi}</p>
                    <div className="flex mt-10">
                        {props.book.active_borrowed ? (
                            <Button size="lg" variant="outline" disabled>
                                Sudah Dibooking — Menunggu Pengambilan
                            </Button>
                        ) : props.book.stock.available > 0 ? (
                            <Button
                                size="lg"
                                onClick={() => router.post(route('front.borroweds.store', { book: props.book.slug }))}
                            >
                                Booking Sekarang
                            </Button>
                        ) : (
                            <Button size="lg" variant="outline" disabled>
                                Buku Tidak Tersedia Saat Ini
                            </Button>
                        )}
                    </div>

                    <div className="flex flex-col justify-start gap-10 pt-10 mt-10 border-t border-gray-200 lg:flex-row">
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Tahun Publikasi</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.tahun_terbit}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start gap-10 pt-10 mt-10 border-t border-gray-200 lg:flex-row">
                        <div>
                            <h3 className="text-sm font-medium text-foreground">ISBN</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.isbn}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start gap-10 pt-10 mt-10 border-t border-gray-200 lg:flex-row">
                        <div>
                            <h3 className="text-sm font-medium text-foreground">Penerbit</h3>
                            <p className="mt-4 text-sm text-muted-foreground">{props.book.publisher_id.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
