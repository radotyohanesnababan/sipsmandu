<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BookFrontController;
use App\Http\Controllers\CategoryFrontController;
use App\Http\Controllers\BorrowedFrontController;
use App\Http\Controllers\EbookFrontController;
use App\Http\Controllers\ReturnBookFrontController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WelcomeController;
use App\Models\Borrowed;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\BookImportController;
use Illuminate\Support\Facades\Auth;

Route::controller(WelcomeController::class)->group(function () {
    Route::get('/', 'index')->name('welcome');
});

Route::controller(DashboardController::class)->middleware('auth')->group(function () {
    Route::get('dashboard', 'index')->name('dashboard');
});

Route::controller(BookFrontController::class)->middleware(['web','auth'])->group(function () {
    Route::get('books', 'index')->name('front.books.index');
    Route::get('books/{book:slug}', 'show')->name('front.books.show');
});

Route::controller(EbookFrontController::class)->middleware(['web','auth','role:member'])->group(function () {
    Route::get('ebooks', 'index')->name('front.ebooks.index');
    Route::get('ebooks/{ebook:slug}', 'show')->name('front.ebooks.show');
    Route::get('ebooks/download/{ebook:id}', 'download')->name('front.ebooks.download');
});

Route::controller(CategoryFrontController::class)->middleware(['web','auth','role:member'])->group(function () {
    Route::get('categories', 'index')->name('front.categories.index');
    Route::get('categories/{category:slug}', 'show')->name('front.categories.show');
});

Route::controller(BorrowedFrontController::class)->middleware(['web','auth','role:member'])->group(function () {
    Route::get('borroweds', 'index')->name('front.borroweds.index');
    Route::get('borroweds/{borrowed:id}/detail', 'show')->name('front.borroweds.show');
    Route::post('borroweds/{book:slug}/create', 'store')->name('front.borroweds.store');
    
});
Route::controller(ReturnBookFrontController::class)->middleware(['web','auth','role:member'])->group(function () {
    Route::get('return-books', 'index')->name('front.return-books.index');
    Route::get('return-books/{returnBook:id}/detail', 'show')->name('front.return-books.show');
    Route::get('return-books/{returnBook:id}/download-sp', 'download')->name('front.return-books.download');
    Route::post('return-books/{book:slug}/create/{borrowed:id}', 'store')->name('front.return-books.store');
    
});

Route::middleware('auth')->group(function () {
    Route::get('/profile/card', function () {
        return Inertia::render('Profile/LibraryCard', [
            'user' => Auth::user(),
        ]);
    })->name('profile.card');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


});



require __DIR__.'/auth.php';

require __DIR__.'/admin.php';


