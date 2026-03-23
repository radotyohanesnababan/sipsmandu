<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Storage;

class BorrowedFrontSingleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
    'id'          => $this->id,
    'status'      => $this->status,
    'expired_at'  => $this->expired_at?->format('d M Y'),
    'borrowed_at' => $this->borrowed_at ? Carbon::parse($this->borrowed_at)->format('d M Y') : null,
    'returned_at' => $this->returned_at ? Carbon::parse($this->returned_at)->format('d M Y') : null,
    'created_at'  => $this->created_at->format('d M Y'),
    'user' => $this->whenLoaded('user', [
        'nisn' => $this->user?->nisn,
        'nama' => $this->user?->nama,
    ]),
    'book' => $this->whenLoaded('book', [
        'id'       => $this->book?->id,
        'judul'    => $this->book?->judul,
        'slug'     => $this->book?->slug,
        'cover'    => $this->book?->cover ? Storage::url($this->book?->cover) : null,
        'deskripsi'=> $this->book?->deskripsi,
    ]),
    'return_book' => $this->whenLoaded('returnBook', [
        'status' => $this->returnBook?->status,
    ]),
];
    }
}
