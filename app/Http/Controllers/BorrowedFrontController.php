<?php

namespace App\Http\Controllers;

use App\Models\Borrowed;
use Auth;
use App\Http\Resources\BorrowedFrontResource;
use App\Http\Resources\BorrowedFrontSingleResource;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use App\Models\Book;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BorrowedFrontController extends Controller
{
    public function index(): Response {
        $borroweds = Borrowed::query()
            ->select(['id', 'user_nisn', 'book_id', 'created_at', 'borrowed_at', 'returned_at', 'status'])
            ->where('user_nisn', Auth::user()->nisn)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['user', 'book'])
            ->latest('created_at')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return inertia('Front/Borroweds/Index', [
            'page_settings' => [
                'title' => 'Peminjaman',
                'subtitle' => 'Kelola peminjaman buku di sini.',
            ],
            'borroweds'=> BorrowedFrontResource::collection($borroweds)->additional([
                'meta' => [
                    'has_pages' => $borroweds->hasPages(),
                ]
                ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],

        ]);
    }

    public function show(Borrowed $borrowed): Response {
        return inertia('Front/Borroweds/Show', [
            'page_settings' => [
                'title' => 'Detail Peminjaman',
                'subtitle' => 'Detail peminjaman buku di sini.',
            ],
            'borrowed' =>  new BorrowedFrontSingleResource($borrowed ->load(['user', 'book', 'returnBook']))
        ]);
    }

   public function store(Book $book): RedirectResponse {
    if (Borrowed::activeBorrowedBook(Auth::user()->nisn) >= 2) {
        flashMessage('Anda sudah meminjam 2 buku. Kembalikan salah satu dulu sebelum meminjam lagi.', 'error');
        return to_route('front.books.show', $book->slug);
    }

    if (Borrowed::checkBorrowedBook(Auth::user()->nisn, $book->id)) {
        flashMessage('Anda sudah meminjam buku ini, harap kembalikan buku terlebih dahulu', 'error');
        return to_route('front.books.show', $book->slug);
    }

    if ($book->stock->available <= 0) {
        flashMessage('Stock tidak tersedia', 'error');
        return to_route('front.books.show', $book->slug);
    }

    tap(Borrowed::create([
        'user_nisn'  => Auth::user()->nisn,
        'book_id'    => $book->id,
        'status'     => 'pending',
        'expired_at' => Carbon::now()->addDays(2),
    ]), function ($borrowed) {
        $borrowed->book->stock_borrowed();
        flashMessage('Berhasil booking buku, segera ambil dalam 2 hari', 'success');
    });

    return to_route('front.borroweds.index');
}
}
