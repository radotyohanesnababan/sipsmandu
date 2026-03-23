<?php

namespace App\Http\Controllers\Admin;

use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\Models\Kelas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KelasUpgradeController extends Controller
{
    public function index(Request $request): Response
    {
        $kelas = Kelas::where('id', '!=', 3)
        ->orderBy('id')
        ->get(['id', 'tingkat']);
        
        $users = collect();
        if ($request->filled('kelas_asal')) {
        $users = User::query()
            ->where('kelas_id', $request->kelas_asal)
            ->orderBy('nama')
            ->paginate($request->load ?? 10)
            ->withQueryString();
        }
        return Inertia::render('Admin/Kelas/Upgrade', [

            'page_settings' => [
                'title' => 'Kenaikan Kelas',
                'subtitle' => 'Kelola kenaikan kelas siswa di sini.',
            ],
            'users' => $users->isNotEmpty()
            ? UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
                ],
            ])
            : [],
            'state' => [
                'page' => request()->page ?? 1,
                'load' => 10,
                'kelas_asal' => $request->kelas_asal ?? '',
            ],
            'kelas' => $kelas,
            'status' => session('status'),
        ]);
    }

    public function upgrade(Request $request)
    {
        $request->validate([
            'kelas_asal' => 'required|exists:kelas,id',
        ]);

        $kelasAsal = Kelas::find($request->kelas_asal);

        $kelasTujuan = match ($kelasAsal->tingkat) {
            'X' => Kelas::where('tingkat', 'XI')->first(),
            'XI' => Kelas::where('tingkat', 'XII')->first(),
            'XII' => null,
        };

        if (!$kelasTujuan) {
            $jumlah = User::where('kelas_id', $kelasAsal->id)
                ->update(['kelas_id' => null, 'is_active' => false]);
            flashMessage(MessageType::UPDATED->message('Pengguna lulus dan keluar dari sistem.'),
                'success'
            );
           return to_route('admin.kelas.index');
        }

        $jumlah = User::where('kelas_id', $kelasAsal->id)
            ->update(['kelas_id' => $kelasTujuan->id]);

            flashMessage(MessageType::UPDATED->message('Sebanyak ' . $jumlah . ' pengguna telah dipindahkan ke kelas ' . $kelasTujuan->tingkat . '.'),
                'success'
            );
        return to_route('admin.kelas.index');
    }
}