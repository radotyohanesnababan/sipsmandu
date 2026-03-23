<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class BorrowedResource extends JsonResource
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
            'borrowed_at' => $this->borrowed_at->format('d M Y'),
            'returned_at' => $this->returned_at ? $this->returned_at->format('d M Y') : null,
            'created_at' => $this->created_at->format('d M Y'),
            'has_returned_book' => $this->returnBook()->exists(),
            'status' => $this->status,
            'user'=> $this->whenLoaded('user', [
                'nisn' => $this->user?->nisn,
                'nama' => $this->user?->nama,
            ]),
            'book' => $this->whenLoaded('book', [
                'id' => $this->book?->id,
                'judul' => $this->book?->judul,
                'slug' => $this->book?->slug,
                
            ]),
        ];
    }
}
