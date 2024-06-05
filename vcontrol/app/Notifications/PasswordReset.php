<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordReset extends Notification
{
    use Queueable;
    public $token;
    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Controle de visitantes')
            ->greeting('Olá!')
            ->salutation('Atencisamente')
            ->line('Você recebeu o email de recuperação de senha.')
            ->action('Recuperar senha', url('password/reset', $this->token));
    }
}
