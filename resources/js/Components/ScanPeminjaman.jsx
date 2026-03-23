import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { IconBarcode, IconBook, IconCheck, IconLoader2, IconX, IconUser, IconCamera } from '@tabler/icons-react';

export default function ScanPeminjaman() {
    const [open, setOpen] = useState(false);
    const [nisn, setNisn] = useState('');
    const [isbn, setIsbn] = useState('');
    const [activeCamera, setActiveCamera] = useState(null); // 'nisn' | 'isbn' | null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const nisnRef = useRef(null);
    const isbnRef = useRef(null);
    const html5QrRef = useRef(null);
    const scannerStarted = useRef(false);

    const style = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;

    useEffect(() => {
        if (!open) {
            stopCamera();
            resetState();
        }
    }, [open]);

    useEffect(() => {
        if (activeCamera) {
            setTimeout(() => startCamera(activeCamera), 300);
        } else {
            stopCamera();
        }
    }, [activeCamera]);

    const startCamera = async (target) => {
        if (scannerStarted.current) return;
        const elementId = target === 'nisn' ? 'qr-nisn' : 'qr-isbn';
        try {
            const html5Qrcode = new Html5Qrcode(elementId);
            html5QrRef.current = html5Qrcode;
            scannerStarted.current = true;
            await html5Qrcode.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 150 } },
                async (decodedText) => {
                    await stopCamera();
                    if (target === 'nisn') {
                        setNisn(decodedText);
                        setActiveCamera(null);
                        setTimeout(() => isbnRef.current?.focus(), 100);
                    } else {
                        setIsbn(decodedText);
                        setActiveCamera(null);
                    }
                },
                () => {}
            );
        } catch {
            setActiveCamera(null);
            setError('Tidak dapat mengakses kamera.');
        }
    };

    const stopCamera = async () => {
        if (html5QrRef.current && scannerStarted.current) {
            try {
                await html5QrRef.current.stop();
                html5QrRef.current.clear();
            } catch (_) {}
            html5QrRef.current = null;
            scannerStarted.current = false;
        }
    };

    const resetState = () => {
        setNisn('');
        setIsbn('');
        setActiveCamera(null);
        setError(null);
        setSuccess(false);
    };

    const handleConfirm = async () => {
        if (!nisn.trim() || !isbn.trim()) return;
        setLoading(true);
        setError(null);
        try {
            await axios.post(route('admin.borrowed-scans.scan'), {
                nisn: nisn.trim(),
                isbn: isbn.trim(),
            });
            resetState();
            setSuccess(true);
            setTimeout(() => nisnRef.current?.focus(), 100);
        } catch (err) {
            setError(err.response?.data?.message ?? 'Terjadi kesalahan, coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        await handleConfirm();
    };

    const toggleCamera = (target) => {
        if (activeCamera === target) {
            setActiveCamera(null);
        } else {
            setActiveCamera(target);
        }
    };

    return (
        <div>
            <style>{style}</style>

            {/* Trigger card */}
            <div
                onClick={() => setOpen(true)}
                className="cursor-pointer rounded-xl text-white shadow-sm hover:brightness-110 transition-all duration-200 h-full"
                style={{
                    background: 'linear-gradient(270deg, #3b82f6, #6366f1, #8b5cf6, #3b82f6)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 4s ease infinite',
                }}
            >
                <div className="flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-2">
                    <p className="text-sm font-medium">Scan Peminjaman Buku</p>
                    <IconBarcode className="size-5 text-white" />
                </div>
                <div className="px-6 pb-6">
                    <p className="text-2xl font-bold">Konfirmasi</p>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <IconBarcode className="size-5 text-blue-600 dark:text-blue-400" />
                            Konfirmasi Peminjaman
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">

                        {/* Input NISN */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <IconUser className="size-4 text-blue-500" />
                                NISN Siswa
                                {nisn && <span className="text-xs text-emerald-500">✓ {nisn}</span>}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    ref={nisnRef}
                                    type="text"
                                    value={nisn}
                                    onChange={(e) => { setNisn(e.target.value); setError(null); setSuccess(false); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ketik atau scan NISN siswa..."
                                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                />
                                <button
                                    onClick={() => toggleCamera('nisn')}
                                    className={`px-3 rounded-lg border transition-all ${
                                        activeCamera === 'nisn'
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'border-slate-300 dark:border-slate-600 text-slate-500 hover:text-blue-500'
                                    }`}
                                >
                                    <IconCamera className="size-4" />
                                </button>
                            </div>
                            {activeCamera === 'nisn' && (
                                <div id="qr-nisn" className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2" />
                            )}
                        </div>

                        {/* Input ISBN */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <IconBook className="size-4 text-blue-500" />
                                ISBN Buku
                                {isbn && <span className="text-xs text-emerald-500">✓ {isbn}</span>}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    ref={isbnRef}
                                    type="text"
                                    value={isbn}
                                    onChange={(e) => { setIsbn(e.target.value); setError(null); setSuccess(false); }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ketik atau scan ISBN buku..."
                                    className="flex-1 px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                />
                                <button
                                    onClick={() => toggleCamera('isbn')}
                                    className={`px-3 rounded-lg border transition-all ${
                                        activeCamera === 'isbn'
                                            ? 'bg-blue-500 border-blue-500 text-white'
                                            : 'border-slate-300 dark:border-slate-600 text-slate-500 hover:text-blue-500'
                                    }`}
                                >
                                    <IconCamera className="size-4" />
                                </button>
                            </div>
                            {activeCamera === 'isbn' && (
                                <div id="qr-isbn" className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-2" />
                            )}
                        </div>

                        {/* Tombol Konfirmasi */}
                        <Button
                            onClick={handleConfirm}
                            disabled={loading || !nisn.trim() || !isbn.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                        >
                            {loading ? (
                                <>
                                    <IconLoader2 className="size-4 animate-spin mr-2" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <IconCheck className="size-4 mr-2" />
                                    Konfirmasi Peminjaman
                                </>
                            )}
                        </Button>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                <IconX className="size-4 flex-shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        {/* Sukses */}
                        {success && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-sm">
                                <IconCheck className="size-4 flex-shrink-0" />
                                Peminjaman berhasil dikonfirmasi! Siap scan berikutnya.
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}