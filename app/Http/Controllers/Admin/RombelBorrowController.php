<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\RombelBorrow;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RombelBorrowController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RombelBorrow::with(['user', 'book', 'createdBy'])
            ->when($request->search, function ($q) use ($request) {
                // Ubah kelas_id jadi kelas
                $q->where('kelas', 'like', "%{$request->search}%")
                  ->orWhereHas('user', fn($q) => $q->where('nama', 'like', "%{$request->search}%"))
                  ->orWhereHas('book', fn($q) => $q->where('judul', 'like', "%{$request->search}%"));
            })
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->latest();

        // Sync status terlambat
        $query->clone()->where('status', 'Dipinjam')
            ->where('due_at', '<', Carbon::now())
            ->update(['status' => 'Terlambat']);

        $rombels = $query->paginate($request->load ?? 10)->withQueryString();

        return Inertia::render('Admin/RombelBorrow/Index', [
            'page_settings' => [
                'title'    => 'Peminjaman Rombel',
                'subtitle' => 'Kelola peminjaman buku per rombongan belajar',
            ],
            'rombels' => $rombels,
            'state'   => $request->only('search', 'load', 'status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/RombelBorrow/Create', [
            'page_settings' => [
                'title'    => 'Tambah Peminjaman Rombel',
                'subtitle' => 'Catat peminjaman buku untuk rombongan belajar',
            ],
            'books' => Book::with('stock:book_id,available')
                ->select('id', 'judul', 'isbn')
                ->whereHas('stock', fn($q) => $q->where('available', '>', 0))
                ->get(),
            'users' => User::role('member')
                ->select('nisn', 'nama')
                ->orderBy('nama')
                ->get(),
            'action' => route('admin.rombel-borrows.store'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_nisn' => ['required', 'exists:users,nisn'],
            'book_id'   => ['required', 'exists:books,id'],
            'kelas'     => ['required', 'string', 'max:50'], 
            'qty'       => ['required', 'integer', 'min:1'],
            'catatan'   => ['nullable', 'string'],
        ]);

        $book = Book::with('stock')->findOrFail($validated['book_id']);

        if ($book->stock->available < $validated['qty']) {
            return back()->withErrors(['qty' => "Stok tidak mencukupi."]);
        }

        RombelBorrow::create([
            'user_nisn'   => $validated['user_nisn'],
            'book_id'     => $validated['book_id'],
            'kelas'       => $validated['kelas'], 
            'qty'         => $validated['qty'],
            'catatan'     => $validated['catatan'],
            'borrowed_at' => Carbon::now(),
            'due_at'      => Carbon::now()->addHours(24),
            'status'      => 'Dipinjam',
            'created_by'  => Auth::user()->nisn,
        ]);

        $book->stock_rombel_borrow($validated['qty']);

        return redirect()->route('admin.rombel-borrows.index')
            ->with('flash_message', ['type' => 'success', 'message' => "Berhasil dicatat."]);
    }

    public function show(RombelBorrow $rombelBorrow): Response
    {
        $rombelBorrow->load(['user', 'book', 'createdBy']);

        return Inertia::render('Admin/RombelBorrow/Show', [
            'page_settings' => [
                'title'    => 'Detail Peminjaman Rombel',
                'subtitle' => "Kelas {$rombelBorrow->kelas}",
            ],
            'rombel' => $rombelBorrow,
        ]);
    }

    public function return(RombelBorrow $rombelBorrow)
    {
        if ($rombelBorrow->status === 'Dikembalikan') {
            return back()->withErrors(['message' => 'Buku sudah dikembalikan.']);
        }

        $rombelBorrow->update([
            'status'      => 'Dikembalikan',
            'returned_at' => Carbon::now(),
        ]);

        $rombelBorrow->book->stock_rombel_return($rombelBorrow->qty);

        return back()->with('flash_message', [
            'type'    => 'success',
            'message' => "Buku rombel {$rombelBorrow->kelas} berhasil dikembalikan.",
        ]);
    }

    public function destroy(RombelBorrow $rombelBorrow)
    {
        if ($rombelBorrow->status !== 'Dikembalikan') {
            $rombelBorrow->book->stock_rombel_return($rombelBorrow->qty);
        }

        $rombelBorrow->delete();

        return redirect()->route('admin.rombel-borrows.index')
            ->with('flash_message', [
                'type'    => 'success',
                'message' => 'Data peminjaman rombel berhasil dihapus.',
            ]);
    }
}