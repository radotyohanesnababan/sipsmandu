<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\AssignPermissionController;
use App\Http\Controllers\Admin\AssignUserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PublisherController;
use App\Http\Controllers\Admin\BookController;
use App\Http\Controllers\Admin\BookStockReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\BorrowedController;
use App\Http\Controllers\Admin\EbookController;
use App\Http\Controllers\Admin\KelasUpgradeController;
use App\Http\Controllers\Admin\LoanStatisticController;
use App\Http\Controllers\Admin\ReturnBookController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\ReturnBookRecordController;
use App\Http\Controllers\Admin\BookImportController;
use App\Http\Controllers\Admin\BorrowedScanController;
use App\Http\Controllers\Admin\MemberImportController;
use App\Http\Controllers\Admin\RombelBorrowController;
use App\Http\Controllers\Admin\ScanReturnController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth','role:admin')->prefix('admin')->group(function (){
        Route::controller(LoanStatisticController::class)->group(function (){
        Route::get('loan-statistics', 'index')->name('admin.loan-statistics.index');
         });
    Route::controller(ReportController::class)->group(function (){
       Route::get('reports', 'index')->name('admin.reports.index');
       Route::get('reports/generate', 'generate')->name('admin.reports.generate'); 
    });

    Route::get('scan-return/find', [ScanReturnController::class, 'findByIsbn'])->name('admin.scan-return.find');
    Route::post('scan-return/confirm', [ScanReturnController::class, 'confirmReturn'])->name('admin.scan-return.confirm');

    Route::controller(BookStockReportController::class)->group(function (){
        Route::get('book-stock-reports', 'index')->name('admin.book-stock-reports.index');
        Route::get('book-stock-reports/edit/{stock}', 'edit')->name('admin.book-stock-reports.edit');
        Route::put('book-stock-reports/edit/{stock}', 'update')->name('admin.book-stock-reports.update');
    });


    Route::controller(CategoryController::class)->group(function (){
        Route::get('categories', 'index')->name('admin.categories.index');
        Route::get('categories/create', 'create')->name('admin.categories.create');
        Route::post('categories/create', 'store')->name('admin.categories.store');
        Route::get('categories/edit/{category}', 'edit')->name('admin.categories.edit');
        Route::put('categories/edit/{category}', 'update')->name('admin.categories.update');
        Route::delete('categories/destroy/{category}','destroy')->name('admin.categories.destroy');


        
    });

    Route::controller(BorrowedScanController::class)->group(function () {
       Route::post('borrowed-scans', 'scan')->name('admin.borrowed-scans.scan'); 
    });

    Route::controller(RombelBorrowController::class)->group(function () {
    Route::get('rombel-borrows', 'index')->name('admin.rombel-borrows.index');
    Route::get('rombel-borrows/create', 'create')->name('admin.rombel-borrows.create');
    Route::post('rombel-borrows', 'store')->name('admin.rombel-borrows.store');
    Route::get('rombel-borrows/{rombelBorrow}', 'show')->name('admin.rombel-borrows.show');
    Route::post('rombel-borrows/{rombelBorrow}/return', 'return')->name('admin.rombel-borrows.return');
    Route::delete('rombel-borrows/{rombelBorrow}', 'destroy')->name('admin.rombel-borrows.destroy');
});

    Route::controller(PublisherController::class)->group(function (){
        Route::get('publishers', 'index')->name('admin.publishers.index');
        Route::get('publishers/create', 'create')->name('admin.publishers.create');
        Route::post('publishers/create', 'store')->name('admin.publishers.store');
        Route::get('publishers/edit/{publisher}', 'edit')->name('admin.publishers.edit');
        Route::put('publishers/edit/{publisher}', 'update')->name('admin.publishers.update');
        Route::delete('publishers/destroy/{publisher}','destroy')->name('admin.publishers.destroy');


    });

     Route::controller(BookController::class)->group(function (){
        Route::get('books', 'index')->name('admin.books.index');
        Route::get('books/create', 'create')->name('admin.books.create');
        Route::post('books/create', 'store')->name('admin.books.store');
        Route::get('books/edit/{book}', 'edit')->name('admin.books.edit');
        Route::put('books/edit/{book}', 'update')->name('admin.books.update');
        Route::delete('books/destroy/{book}','destroy')->name('admin.books.destroy');


    });

    Route::controller(EbookController::class)->group(function (){
        
        Route::get('ebooks', 'index')->name('admin.ebooks.index');
        Route::get('ebooks/create', 'create')->name('admin.ebooks.create');
        Route::post('ebooks/create', 'store')->name('admin.ebooks.store');
        Route::get('ebooks/edit/{ebook}', 'edit')->name('admin.ebooks.edit');
        Route::put('ebooks/edit/{ebook}', 'update')->name('admin.ebooks.update');
        Route::delete('ebooks/destroy/{ebook}','destroy')->name('admin.ebooks.destroy');


    });

    Route::controller(UserController::class)->group(function (){
        Route::get('users', 'index')->name('admin.users.index');
        Route::get('users/create', 'create')->name('admin.users.create');
        Route::post('users/create', 'store')->name('admin.users.store');
        Route::get('users/edit/{user}', 'edit')->name('admin.users.edit');
        Route::put('users/edit/{user}', 'update')->name('admin.users.update');
        Route::delete('users/destroy/{user}','destroy')->name('admin.users.destroy');


    });

    Route::controller(BorrowedController::class)->group(function (){
        Route::get('borroweds', 'index')->name('admin.borroweds.index');
        Route::get('borroweds/create', 'create')->name('admin.borroweds.create');
        Route::post('borroweds/create', 'store')->name('admin.borroweds.store');
        Route::get('borroweds/edit/{borrowed}', 'edit')->name('admin.borroweds.edit');
        Route::put('borroweds/edit/{borrowed}', 'update')->name('admin.borroweds.update');
        Route::delete('borroweds/destroy/{borrowed}','destroy')->name('admin.borroweds.destroy');

});

    Route::controller(ReturnBookController::class)->group(function (){
        Route::get('return-books', 'index')->name('admin.return-books.index');
        Route::get('return-books/{borrowed}/create', 'create')->name('admin.return-books.create');
        Route::put('return-books/{borrowed}/store', 'store')->name('admin.return-books.store');
        Route::delete('return-books/{returnBook}', 'destroy')->name('admin.return-books.destroy');
        Route::put('return-books/{returnBook}/approve', 'approve')->name('admin.return-books.approve');
        

});
 Route::controller(ReturnBookRecordController::class)->group(function (){
        Route::get('return-books-records', 'index')->name('admin.return-books-records.index');
        

});
Route::controller(AnnouncementController::class)->group(function (){
        Route::get('announcements', 'index')->name('admin.announcements.index');
        Route::get('announcements/create', 'create')->name('admin.announcements.create');
        Route::post('announcements/create', 'store')->name('admin.announcements.store');
        Route::get('announcements/edit/{announcement}', 'edit')->name('admin.announcements.edit');
        Route::put('announcements/edit/{announcement}', 'update')->name('admin.announcements.update');
        Route::delete('announcements/destroy/{announcement}','destroy')->name('admin.announcements.destroy');

});

Route::controller(RoleController::class)->group(function (){
        Route::get('roles', 'index')->name('admin.roles.index');
        Route::get('roles/create', 'create')->name('admin.roles.create');
        Route::post('roles/create', 'store')->name('admin.roles.store');
        Route::get('roles/edit/{role}', 'edit')->name('admin.roles.edit');
        Route::put('roles/edit/{role}', 'update')->name('admin.roles.update');
        Route::delete('roles/destroy/{role}','destroy')->name('admin.roles.destroy');

});
Route::controller(PermissionController::class)->group(function (){
        Route::get('permissions', 'index')->name('admin.permissions.index');
        Route::get('permissions/create', 'create')->name('admin.permissions.create');
        Route::post('permissions/create', 'store')->name('admin.permissions.store');
        Route::get('permissions/edit/{permission}', 'edit')->name('admin.permissions.edit');
        Route::put('permissions/edit/{permission}', 'update')->name('admin.permissions.update');
        Route::delete('permissions/destroy/{permission}','destroy')->name('admin.permissions.destroy');

});
Route::controller(AssignPermissionController::class)->group(function (){
        Route::get('assign-permissions', 'index')->name('admin.assign-permissions.index');
        Route::get('assign-permissions/edit/{role}', 'edit')->name('admin.assign-permissions.edit');
        Route::put('assign-permissions/edit/{role}', 'update')->name('admin.assign-permissions.update');


});
Route::controller(AssignUserController::class)->group(function (){
        Route::get('assign-users', 'index')->name('admin.assign-users.index');
        Route::get('assign-users/edit/{user}', 'edit')->name('admin.assign-users.edit');
        Route::put('assign-users/edit/{user}', 'update')->name('admin.assign-users.update');


});

Route::controller(BookImportController::class)->group(function (){
Route::get('/import-books', 'index')->name('admin.import-books.index');
Route::post('/import-books', 'import')->name('admin.import-books');
});

Route::controller(MemberImportController::class)->group(function (){
Route::get('/import-members', 'index')->name('admin.import-members.index');
Route::post('/import-members', 'import')->name('admin.import-members');
});



Route::controller(KelasUpgradeController::class)->group(function (){
       Route::get('kelas', 'index')
        ->name('admin.kelas.index');
    Route::post('kelas/upgrade', 'upgrade')
        ->name('admin.kelas.upgrade.post');

});

});
