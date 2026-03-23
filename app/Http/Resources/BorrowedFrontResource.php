<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowedFrontResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'borrowed_at' => Carbon::parse($this->borrowed_at)->format('d M Y'),
            'returned_at' => Carbon::parse($this->returned_at)->format('d M Y'),
            'created_at' => $this->created_at->format('d M Y'),
            'user' => $this->whenLoaded('user',[
                'nisn' => $this->user?->nisn,
                'nama' => $this->user?->nama,
            ]),
            'status' => $this->status,
            'book' => $this->whenLoaded('book',[
                'id' => $this->book?->id,
                'judul' => $this->book?->judul,
                'slug' => $this->book?->slug,
            ]),
        ];
    }
}
