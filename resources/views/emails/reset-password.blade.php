<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reset Password | Sistem Informasi Perpustakaan</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <table align="center" width="100%" style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.05);">
        <tr>
            <td style="background-color:#ffffff; padding:20px; text-align:center;">
                <img src="{{ asset('storage/logo/logosekolah.png') }}" alt="Logo Perpustakaan"
                style="width:80px; height:auto; margin-bottom:10px;">
                <h2 style="color:#111827; margin:0;">SIMPAS </h2>
                <h2 style="color:#111827; margin:0;">Tim Perpustakaan SMA N 2 Siborongborong</h2>
            </td>
        </tr>

        <tr>
            <td style="padding:30px;">
                <h3 style="color:#111827;">Halo,</h3>
                <p style="color:#374151; line-height:1.6;">
                    Kami menerima permintaan untuk mengatur ulang password akun Anda (<strong>{{ $email }}</strong>).
                    Jika benar, silakan tekan tombol di bawah ini untuk membuat password baru.
                </p>

                <div style="text-align:center; margin:40px 0;">
                    <a href="{{ $url }}" 
                       style="background-color:#2563eb; color:#ffffff; padding:14px 28px; border-radius:6px; text-decoration:none; font-weight:600; display:inline-block;">
                       Reset Password
                    </a>
                </div>

                <p style="color:#6b7280; line-height:1.6;">
                    Jika Anda tidak pernah meminta reset password, abaikan email ini. 
                    Link ini hanya berlaku selama <strong>60 menit</strong>.
                </p>

                <p style="color:#374151; margin-top:30px;">Salam hangat,</p>
                <p style="color:#81a0e3; font-weight:bold;">Tim Perpustakaan SMA N 2 Siborongborong</p>
            </td>
        </tr>

        <tr>
            <td style="background-color:#f3f4f6; text-align:center; padding:15px; font-size:12px; color:#9ca3af;">
                © {{ date('Y') }} Sistem Informasi Perpustakaan. Semua Hak Dilindungi.
            </td>
        </tr>
    </table>

</body>
</html>
