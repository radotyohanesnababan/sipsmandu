<?php

namespace App\Http\Resources\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnBookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'return_date' => $this->return_date ? Carbon::parse($this->return_date)->format('d M Y') : null,
            'status' => $this->status,
            'created_at' => $this->created_at->format('d M Y'),
            'updated_at' => $this->updated_at,
            'book' => $this->whenLoaded('book',[
                'id' => $this->book?->id,
                'judul' => $this->book->judul,
                
            ]),
            'borrowed' => $this->whenLoaded('borrowed', [
                'id' => $this->borrowed?->id,
                'user_id' => $this->borrowed?->user_id,
                'book_id' => $this->borrowed?->book_id,
                'borrowed_at' => Carbon::parse($this->borrowed?->borrowed_at)->format('d M Y'),
                'returned_at' => Carbon::parse($this->borrowed?->returned_at)->format('d M Y'),

            ]),
            'user' => $this->whenLoaded('user', [
                'nama' => $this->user?->nama,
                'nisn' => $this->user?->nisn,
            ]),

            
            

            // 'fine' => $this->whenLoaded('fine', [
            //     'amount' => $this->fine?->amount,
            //     'status' => $this->fine?->status,
            // ])
            'return_book_check' => $this->whenLoaded('returnBookCheck', $this->returnBookCheck ?->condition)
        ];
    }
}
