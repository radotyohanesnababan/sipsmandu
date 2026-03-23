<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowed;
use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BorrowedScanController extends Controller
{
    public function scan(Request $request)
    {
        $request->validate([
            'nisn' => 'required|exists:users,nisn',
            'isbn' => 'required|exists:books,isbn',
        ]);

        $book = Book::where('isbn', $request->isbn)->firstOrFail();

        $borrowed = Borrowed::where('user_nisn', $request->nisn)
            ->where('book_id', $book->id)
            ->where('status', 'pending')
            ->first();

        if (!$borrowed) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak ada booking aktif untuk siswa dan buku ini.',
            ], 404);
        }

        if ($borrowed->expired_at < Carbon::now()) {
            $borrowed->update(['status' => 'expired']);
            $borrowed->book->stock_available();  // kembalikan stok
            return response()->json([
                'success' => false,
                'message' => 'Booking sudah expired.',
            ], 422);
        }

        $borrowed->update([
            'status'      => 'active',
            'borrowed_at' => Carbon::now()->toDateString(),
            'returned_at' => Carbon::now()->addDays(7)->toDateString(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Peminjaman berhasil dicatat.',
            'data'    => $borrowed->load(['user', 'book']),
        ]);
    }
}