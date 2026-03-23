<?php

namespace App\Console\Commands;

use App\Models\Borrowed;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpiredBorrowedCommand extends Command
{
    protected $signature = 'borrowed:expire';
    protected $description = 'Batalkan booking yang sudah expired';

    public function handle()
    {
        $expiredCount = Borrowed::where('status', 'pending')
            ->where('expired_at', '<', Carbon::now())
            ->get()
            ->each(function ($borrowed) {
                $borrowed->update(['status' => 'expired']);
                $borrowed->book->stock_available(); 
            })
            ->count();

        $this->info("$expiredCount booking expired diproses.");
    }
}