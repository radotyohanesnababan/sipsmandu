<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DueReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $borrowed;
    public $user;
    /**
     * Create a new message instance.
     */
    public function __construct($borrowed)
    {
        $this->borrowed = $borrowed;
        $this->user = $borrowed->user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pengingat Pengembalian Buku',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.due-reminder',

        );
    }
     public function build()
    {
        return $this->subject('Pengingat Pengembalian Buku — SIMPAS ')
            ->from(config('mail.from.address'), config('mail.from.name'))
            ->view('emails.due-reminder')
            ->with([
                'borrowed' => $this->borrowed,
                'user' => $this->user,
            ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
