import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowLeft, IconBooks } from '@tabler/icons-react';
import { useRef } from 'react';

export default function Edit(props) {
    const fileInputCover = useRef(null);
    const fileInputPDF = useRef(null);
    const onHandleReset = () => {
        reset();
        fileInputCover.current.value = null;
        fileInputPDF.current.value = null;
    };
    const { data, setData, reset, post, processing, errors } = useForm({
        judul: props.ebook.judul || '',
        tahun_terbit: props.ebook.tahun_terbit || null,
        deskripsi: props.ebook.deskripsi || '',
        isbn: props.ebook.isbn || '',
        cover: null,
        file_path: null,
        category_id: props.ebook.category_id || null,
        publisher_id: props.ebook.publisher_id || null,
        _method: props.page_settings.method,
    });
    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(props.page_settings.action, { forceFormData: true });
    };

    return (
        <div className="flex w-full flex-col pb-32">
            <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <HeaderTitle
                    title={props.page_settings.title}
                    subtitle={props.page_settings.subtitle}
                    icon={IconBooks}
                />
                <Button variant="green" size="lg" asChild>
                    <Link href={route('admin.ebooks.index')}>
                        <IconArrowLeft className="size-4"></IconArrowLeft>Kembali
                    </Link>
                </Button>
            </div>
            <Card>
                <CardContent className="p-6">
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="judul">Judul</Label>
                            <Input
                                id="judul"
                                name="judul"
                                placeholder="Masukkan judul buku"
                                value={data.judul}
                                onChange={onHandleChange}
                            />
                            {errors.judul && <InputError message={errors.judul} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="deskripsi">Deskripsi</Label>
                            <Textarea
                                id="deskripsi"
                                name="deskripsi"
                                placeholder="Masukkan deskripsi kategori"
                                value={data.deskripsi}
                                onChange={onHandleChange}
                            />
                            {errors.deskripsi && <InputError message={errors.deskripsi} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="isbn">ISBN</Label>
                            <Input
                                id="isbn"
                                name="isbn"
                                placeholder="Masukkan ISBN buku"
                                value={data.isbn}
                                onChange={onHandleChange}
                            />
                            {errors.isbn && <InputError message={errors.isbn} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="tahun_terbit">Tahun Terbit</Label>
                            <Select
                                defaultValue={String(data.tahun_terbit)}
                                onValueChange={(value) => setData('tahun_terbit', parseInt(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {data.tahun_terbit ? String(data.tahun_terbit) : 'Pilih tahun terbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.tahun_terbit.map((tahun_terbit, index) => (
                                        <SelectItem key={index} value={String(tahun_terbit)}>
                                            {tahun_terbit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.tahun_terbit && <InputError message={errors.tahun_terbit} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="category_id">Kategori Buku</Label>
                            <Select
                                defaultValue={String(data.category_id)}
                                onValueChange={(value) => setData('category_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori buku">
                                        {props.page_data.categories.find(
                                            (category) => String(category.id) === String(data.category_id),
                                        )?.name ?? 'Pilih kategori buku'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.categories.map((category, index) => (
                                        <SelectItem key={index} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category_id && <InputError message={errors.category_id} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="publisher_id">Penerbit</Label>
                            <Select
                                defaultValue={String(data.publisher_id)}
                                onValueChange={(value) => setData('publisher_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih penerbit">
                                        {props.page_data.publishers.find(
                                            (publisher) => String(publisher.id) === String(data.publisher_id),
                                        )?.name ?? 'Pilih penerbit'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.page_data.publishers.map((publisher, index) => (
                                        <SelectItem key={index} value={String(publisher.id)}>
                                            {publisher.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.publisher_id && <InputError message={errors.publisher_id} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="cover">Cover</Label>
                            <p className="text-sm text-muted-foreground">File yang diterima : JPG,PNG,BMP.</p>
                            <Input
                                cursor="pointer"
                                id="cover"
                                name="cover"
                                type="file"
                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                ref={fileInputCover}
                            />
                            {errors.cover && <InputError message={errors.cover} />}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="file_path">File PDF</Label>
                            <p className="text-sm text-muted-foreground">File yang diterima : PDF</p>
                            <Input
                                cursor="pointer"
                                id="file_path"
                                name="file_path"
                                type="file"
                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                ref={fileInputPDF}
                            />
                            {errors.file_path && <InputError message={errors.file_path} />}
                        </div>

                        <div className="flex justify-end gap-x-2">
                            <Button type="button" variant="ghost" onClick={onHandleReset} size="lg">
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
