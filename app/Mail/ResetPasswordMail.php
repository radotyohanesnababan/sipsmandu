<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $url;
    public $email;
    public $user;

    /**
     * Create a new message instance.
     *
     * @param string $url  
     * @param string $email
     * @param \App\Models\User|null $user
     */
    public function __construct(string $url, string $email, $user = null)
    {
        $this->url = $url;
        $this->email = $email;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Reset Password — Tim Perpustakaan SMA N 2 Siborongborong')
                    ->from(config('mail.from.address'), config('mail.from.name'))
                    ->view('emails.reset-password')
                    ->with([
                        'url' => $this->url,
                        'email' => $this->email,
                        'user' => $this->user,
                    ]);
    }
}
