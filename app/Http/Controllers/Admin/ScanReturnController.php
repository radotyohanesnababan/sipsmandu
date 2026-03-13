<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowed;
use App\Models\ReturnBook;
use App\Models\ReturnBookCheck;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ScanReturnController extends Controller
{
    public function findByIsbn(Request $request): JsonResponse
    {
        $request->validate([
            'isbn' => ['required', 'string'],
        ]);

        $book = Book::where('isbn', $request->isbn)->first();

        if (!$book) {
            return response()->json([
                'found' => false,
                'message' => 'Buku dengan ISBN tersebut tidak ditemukan.',
            ], 404);
        }

        // Ambil semua peminjaman yang ada pengajuan pengembalian pending
        $borroweds = Borrowed::where('book_id', $book->id)
            ->whereHas('returnBook', function ($query) {
                $query->where('status', 'Pengecekan');
            })
            ->with(['user', 'book.stock'])
            ->latest('borrowed_at')
            ->get();

        if ($borroweds->isEmpty()) {
            return response()->json([
                'found' => false,
                'message' => 'Tidak ada pengajuan pengembalian aktif untuk buku ini.',
            ], 404);
        }

        $data = $borroweds->map(function ($borrowed) use ($book) {
            $borrowedAt = Carbon::parse($borrowed->borrowed_at);
            $dueDate    = $borrowedAt->copy()->addDays(14);
            $today      = Carbon::now();
            $isLate     = $today->gt($dueDate);

            return [
                'borrowed_id' => $borrowed->id,
                'buku' => [
                    'id'    => $book->id,
                    'judul' => $book->judul,
                    'isbn'  => $book->isbn,
                    'cover' => $book->cover_url,
                ],
                'peminjam' => [
                    'nisn' => $borrowed->user->nisn,
                    'nama' => $borrowed->user->nama,
                ],
                'borrowed_at' => $borrowedAt->format('d M Y'),
                'due_date'    => $dueDate->format('d M Y'),
                'is_late'     => $isLate,
                'late_days'   => $isLate ? $today->diffInDays($dueDate) : 0,
            ];
        });

        return response()->json([
            'found' => true,
            'data'  => $data,
        ]);
    }

    public function confirmReturn(Request $request): JsonResponse
    {
        $request->validate([
            'borrowed_id' => ['required', 'integer', 'exists:borroweds,id'],
            'kondisi'     => ['required', 'string', 'in:Baik,Rusak,Hilang'],
            'catatan'     => ['nullable', 'string'],
        ]);

        $borrowed = Borrowed::with('book')->findOrFail($request->borrowed_id);

        // Cari ReturnBook yang statusnya Pengecekan
        $returnBook = $borrowed->returnBook()
            ->where('status', 'Pengecekan')
            ->first();

        if (!$returnBook) {
            return response()->json([
                'success' => false,
                'message' => 'Pengajuan pengembalian tidak ditemukan.',
            ], 422);
        }

        // Update, jangan insert baru
            $returnBook->update([
                'status'      => $request->kondisi === 'Hilang' ? 'Ditolak' : 'Dikembalikan',
                'return_date' => Carbon::now(),
            ]);
                    // Buat ReturnBookCheck
            ReturnBookCheck::create([
                'return_book_id' => $returnBook->id,
                'book_id'        => $borrowed->book_id,
                'condition'      => $request->kondisi,
                'notes'          => $request->catatan,
            ]);

        // Update stok sesuai kondisi
        match ($request->kondisi) {
    'Rusak'  => $borrowed->book->stock_damaged(),
    'Hilang' => $borrowed->book->stock_lost(),
    default  => $borrowed->book->stock_returned(),
};

        return response()->json([
            'success' => true,
            'message' => 'Pengembalian buku berhasil dikonfirmasi.',
        ]);
    }
}