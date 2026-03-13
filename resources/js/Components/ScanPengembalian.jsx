import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Html5Qrcode } from 'html5-qrcode';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { IconBarcode, IconBook, IconCheck, IconLoader2, IconX, IconAlertTriangle, IconUser, IconCamera, IconKeyboard } from '@tabler/icons-react';

export default function ScanPengembalian() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('ketik');
    const [isbn, setIsbn] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [kondisi, setKondisi] = useState('');
    const [catatan, setCatatan] = useState('');
    const [scanning, setScanning] = useState(false);
    const inputRef = useRef(null);
    const html5QrRef = useRef(null);
    const scannerStarted = useRef(false);

    const kondisiOptions = [
        { value: 'Baik', label: 'Baik' },
        { value: 'Rusak', label: 'Rusak' },
        { value: 'Hilang', label: 'Hilang' },
    ];

    const style = `
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 100);
            resetState();
        } else {
            stopCamera();
        }
    }, [open]);

    useEffect(() => {
        if (mode === 'kamera' && open && !result && candidates.length === 0) {
            setTimeout(() => startCamera(), 300);
        } else {
            stopCamera();
            if (mode === 'ketik') {
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }
    }, [mode]);

    const startCamera = async () => {
        if (scannerStarted.current) return;
        try {
            setScanning(true);
            const html5Qrcode = new Html5Qrcode('qr-reader');
            html5QrRef.current = html5Qrcode;
            scannerStarted.current = true;
            await html5Qrcode.start(
                { facingMode: 'environment' },
                { fps: 10, qrbox: { width: 250, height: 150 } },
                async (decodedText) => {
                    await stopCamera();
                    await fetchByIsbn(decodedText);
                },
                () => {}
            );
        } catch (err) {
            setScanning(false);
            setError('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
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
        setScanning(false);
    };

    const resetState = () => {
        setIsbn('');
        setCandidates([]);
        setResult(null);
        setError(null);
        setSuccess(false);
        setKondisi('');
        setCatatan('');
    };

    const fetchByIsbn = async (isbnValue) => {
        setLoading(true);
        setError(null);
        setCandidates([]);
        setResult(null);
        try {
            const res = await axios.get(route('admin.scan-return.find'), {
                params: { isbn: isbnValue.trim() },
            });
            const data = res.data.data;
            if (data.length === 1) {
                setResult(data[0]);
            } else {
                setCandidates(data);
            }
        } catch (err) {
            setError(err.response?.data?.message ?? 'Terjadi kesalahan, coba lagi.');
            if (mode === 'kamera') {
                setTimeout(() => startCamera(), 1500);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleScan = async (e) => {
        if (e.key !== 'Enter' || !isbn.trim()) return;
        e.preventDefault();
        await fetchByIsbn(isbn);
    };

    const handleSelectCandidate = (candidate) => {
        setResult(candidate);
        setCandidates([]);
    };

    const handleBack = () => {
        setResult(null);
        setCandidates([]);
        setKondisi('');
        setCatatan('');
        setError(null);
        if (mode === 'kamera') {
            setTimeout(() => startCamera(), 300);
        }
    };

    const handleConfirm = async () => {
        if (!result) return;
        if (!kondisi) {
            setError('Pilih kondisi buku terlebih dahulu.');
            return;
        }
        setConfirming(true);
        try {
            await axios.post(route('admin.scan-return.confirm'), {
                borrowed_id: result.borrowed_id,
                kondisi,
                catatan,
            });
            setSuccess(true);
            setResult(null);
            setIsbn('');
            setKondisi('');
            setCatatan('');
            if (mode === 'ketik') {
                setTimeout(() => inputRef.current?.focus(), 100);
            } else {
                setTimeout(() => startCamera(), 300);
            }
        } catch (err) {
            setError(err.response?.data?.message ?? 'Gagal mengkonfirmasi pengembalian.');
        } finally {
            setConfirming(false);
        }
    };

    const handleModeSwitch = (newMode) => {
        setMode(newMode);
        resetState();
    };

    return (
        <div>
            <style>{style}</style>

            {/* Trigger card */}
            <div
                onClick={() => setOpen(true)}
                className="cursor-pointer rounded-xl text-white shadow-sm hover:brightness-110 transition-all duration-200 h-full"
                                style={{
                    background: 'linear-gradient(270deg, #f59e0b, #10b981, #059669, #0ea5e9, #6366f1, #10b981)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 4s ease infinite',
                }}
            >
                <div className="flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-2">
                    <p className="text-sm font-medium">Scan Pengembalian Buku</p>
                    <IconBarcode className="size-5 text-white" />
                </div>
                <div className="px-6 pb-6">
                    <p className="text-2xl font-bold">Verifikasi</p>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <IconBarcode className="size-5 text-emerald-600 dark:text-emerald-400" />
                            Verifikasi Pengembalian
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">

                        {/* Toggle mode */}
                        <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                            <button
                                onClick={() => handleModeSwitch('ketik')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                    mode === 'ketik'
                                        ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                            >
                                <IconKeyboard className="size-4" />
                                Ketik / Scanner USB
                            </button>
                            <button
                                onClick={() => handleModeSwitch('kamera')}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                                    mode === 'kamera'
                                        ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                            >
                                <IconCamera className="size-4" />
                                Kamera
                            </button>
                        </div>

                        {/* Mode ketik */}
                        {mode === 'ketik' && (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Scan atau ketik ISBN buku
                                </label>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={isbn}
                                    onChange={(e) => {
                                        setIsbn(e.target.value);
                                        setError(null);
                                        setCandidates([]);
                                        setResult(null);
                                        setSuccess(false);
                                    }}
                                    onKeyDown={handleScan}
                                    placeholder="Arahkan scanner ke barcode buku..."
                                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    disabled={loading || confirming}
                                />
                                <p className="text-xs text-slate-400 dark:text-slate-500">Tekan Enter setelah scan / input ISBN</p>
                            </div>
                        )}

                        {/* Mode kamera */}
                        {mode === 'kamera' && !result && candidates.length === 0 && (
                            <div className="space-y-2">
                                <div
                                    id="qr-reader"
                                    className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700"
                                />
                                {scanning && (
                                    <p className="text-xs text-center text-slate-400 dark:text-slate-500">
                                        Arahkan kamera ke barcode ISBN buku...
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Loading */}
                        {loading && (
                            <div className="flex items-center justify-center gap-2 py-4 text-slate-500 dark:text-slate-400 text-sm">
                                <IconLoader2 className="size-4 animate-spin" />
                                Mencari data buku...
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                <IconX className="size-4 flex-shrink-0 mt-0.5" />
                                {error}
                            </div>
                        )}

                        {/* Sukses */}
                        {success && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-sm">
                                <IconCheck className="size-4 flex-shrink-0" />
                                Pengembalian berhasil dikonfirmasi! Siap scan berikutnya.
                            </div>
                        )}

                        {/* Pilihan peminjam — kalau > 1 */}
                        {candidates.length > 1 && (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="px-4 py-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800">
                                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                                        {candidates.length} pengajuan ditemukan — pilih peminjam:
                                    </p>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {candidates.map((c) => (
                                        <button
                                            key={c.borrowed_id}
                                            onClick={() => handleSelectCandidate(c)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                                                <IconUser className="size-4 text-emerald-700 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{c.peminjam.nama}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">NISN: {c.peminjam.nisn} · Pinjam: {c.borrowed_at}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Detail peminjaman */}
                        {result && (
                            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                                        <IconBook className="size-5 text-emerald-700 dark:text-emerald-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{result.buku.judul}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">ISBN: {result.buku.isbn}</p>
                                    </div>
                                    <button
                                        onClick={handleBack}
                                        className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0"
                                    >
                                        ← Ganti
                                    </button>
                                </div>

                                <div className="p-4 space-y-2.5">
                                    {[
                                        { label: 'Peminjam', value: result.peminjam.nama },
                                        { label: 'NISN', value: result.peminjam.nisn },
                                        { label: 'Tanggal Pinjam', value: result.borrowed_at },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between text-sm">
                                            <span className="text-slate-500 dark:text-slate-400">{label}</span>
                                            <span className="font-medium text-slate-800 dark:text-slate-100">{value}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Batas Kembali</span>
                                        <span className={`font-medium ${result.is_late ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-100'}`}>
                                            {result.due_date}
                                        </span>
                                    </div>
                                    {result.is_late && (
                                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs">
                                            <IconAlertTriangle className="size-4 flex-shrink-0" />
                                            Terlambat {result.late_days} hari
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3 bg-slate-50/50 dark:bg-slate-800/30">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Kondisi Buku</label>
                                        <select
                                            value={kondisi}
                                            onChange={(e) => {
                                                setKondisi(e.target.value);
                                                setError(null);
                                            }}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        >
                                            <option value="">Pilih kondisi buku...</option>
                                            {kondisiOptions.map((opt) => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Catatan <span className="text-slate-400 dark:text-slate-500 font-normal">(opsional)</span>
                                        </label>
                                        <textarea
                                            value={catatan}
                                            onChange={(e) => setCatatan(e.target.value)}
                                            placeholder="Catatan kondisi buku..."
                                            rows={2}
                                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="px-4 pb-4 pt-3 bg-white dark:bg-slate-900">
                                    <Button
                                        onClick={handleConfirm}
                                        disabled={confirming}
                                        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg"
                                    >
                                        {confirming ? (
                                            <>
                                                <IconLoader2 className="size-4 animate-spin mr-2" />
                                                Mengkonfirmasi...
                                            </>
                                        ) : (
                                            <>
                                                <IconCheck className="size-4 mr-2" />
                                                Konfirmasi Pengembalian
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}