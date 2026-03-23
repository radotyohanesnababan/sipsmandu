<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pengingat Tenggat Pengembalian Buku</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06);">

        <tr>
            <td style="text-align:center; padding:25px 20px; background:#ffffff; border-bottom:1px solid #e5e7eb;">
                <img src="{{ asset('storage/logo/logosekolah.webp') }}" alt="Logo Perpustakaan"
                style="width:80px; height:auto; margin-bottom:10px;">

                <h2 style="margin:0; font-size:22px; color:#111827; font-weight:700;">
                    SIMPAS
                </h2>

                <p style="margin:5px 0 0; font-size:14px; color:#6b7280;">
                    Sistem Informasi Perpustakaan SMA N 2 Siborongborong
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding:30px 25px;">

                <h3 style="margin-top:0; font-size:20px; color:#111827; font-weight:700;">
                    Pengingat Pengembalian Buku
                </h3>

                <p style="font-size:15px; color:#374151; line-height:1.7; margin-bottom:25px;">
                    Halo <strong>{{ $user->nama }}</strong>,<br><br>
                    Ini adalah pengingat bahwa buku yang kamu pinjam sudah mendekati tenggat pengembalian.
                </p>

                <!-- BOOK DETAILS -->
                <div style="background:#f9fafb; border:1px solid #e5e7eb; padding:15px 20px; border-radius:8px; margin-bottom:30px;">
                    <p style="margin:0; font-size:15px; color:#111827;">
                        <strong>Judul Buku:</strong> {{ $borrowed->book->judul ?? '-' }}
                    </p>
                    <p style="margin:8px 0 0; font-size:15px; color:#111827;">
                        <strong>Tanggal Pinjam:</strong> 
                        {{ \Carbon\Carbon::parse($borrowed->borrowed_at)->format('d M Y') }}
                    </p>
                    <p style="margin:8px 0 0; font-size:15px; color:#DC2626; font-weight:600;">
                        Tenggat: {{ \Carbon\Carbon::parse($borrowed->returned_at)->format('d M Y') }}
                    </p>
                </div>

                <p style="font-size:15px; color:#374151; line-height:1.7;">
                    Silakan segera mengembalikan buku sebelum tanggal tenggat untuk menghindari keterlambatan.
                </p>


                <p style="font-size:14px; color:#6b7280; line-height:1.6;">
                    Email ini dikirim otomatis oleh sistem. Abaikan bila kamu sudah membuat permintaan pengembalian.
                </p>

                <p style="margin-top:35px; margin-bottom:5px; color:#374151; font-size:15px;">
                    Salam hangat,
                </p>
                <p style="color:#2563eb; font-weight:700; font-size:15px;">
                    Tim Perpustakaan SMA N 2 Siborongborong
                </p>

            </td>
        </tr>
        <tr>
            <td style="text-align:center; padding:15px; background:#f9fafb; font-size:12px; color:#9ca3af;">
                © {{ date('Y') }} Perpustakaan SMA N 2 Siborongborong. Semua Hak Dilindungi.
            </td>
        </tr>
</table>

</body>
</html>
