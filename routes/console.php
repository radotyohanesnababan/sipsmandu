<?php


use Illuminate\Support\Facades\Schedule;

Schedule::command('reminder:jatuh-tempo-peminjaman')->dailyAt('07:00');
Schedule::command('borrowed:expire')->hourly();
