<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\TransactionBorrowedResource;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Models\Book;
use App\Models\Borrowed;
use App\Models\Category;
use App\Models\ReturnBook;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;


class WelcomeController extends Controller
{
    public function index(){

        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'created_at'])
            ->latest('created_at')
            ->limit(10)
            ->withCount('books')
            ->get();

        $borroweds = Borrowed::query()
            ->select(['id', 'user_nisn', 'book_id', 'created_at'])
            
            ->latest('created_at')
            ->limit(5)
            ->with(['user', 'book'])
            ->get();
            
        $return_books = ReturnBook::query()
            ->select(['id', 'user_nisn', 'book_id', 'created_at'])
            ->latest('created_at')
            ->limit(5)
            ->with(['user', 'book'])
            ->get();          
        return inertia('Welcome',[
             'auth' => [
            'user' => Auth::user(),
            ],
            
            'page_settings'=>[
                'title'=>'Sistem Perpustakaan SMA N 2 Siborongborong',
                'subtitle'=>'Selamat Datang di Perpustakaan SMA N 2 Siborongborong',
                'method'=>'GET',
                
            ],
            'page_data'=>[
                'borroweds'=>TransactionBorrowedResource::collection($borroweds),
                'return_books'=>TransactionReturnBookResource::collection($return_books),
                'categories'=>$categories,
               
                

            ]   
        ]);
    }
}