<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Pernyataan Pengembalian Buku</title>
    <style>
        @page { margin: 2cm; }
        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 12pt;
            line-height: 1.5;
        }
        .judul {
            text-align: center;
            font-weight: bold;
            text-decoration: underline;
            margin-top: 15px;
            margin-bottom: 5px;
        }
        .nomor { text-align: center; margin-bottom: 25px; }
        table { border-collapse: collapse; }
        td { padding: 3px 5px; vertical-align: top; }
        .section { margin-left: 30px; }
        .ttd { width: 100%; margin-top: 40px; }
        .ttd td { text-align: center; vertical-align: top; padding-top: 30px; }
    </style>
</head>
<body>
    @php
    
    $logoSekolahPath = public_path('storage/logo/logosekolah.png');
    $logoPemkabPath  = public_path('storage/logo/logopemkab.png');

    $logoSekolahBase64 = file_exists($logoSekolahPath) ? 'data:image/'.pathinfo($logoSekolahPath, PATHINFO_EXTENSION).';base64,'.base64_encode(file_get_contents($logoSekolahPath)) : null;
    $logoPemkabBase64  = file_exists($logoPemkabPath)  ? 'data:image/'.pathinfo($logoPemkabPath, PATHINFO_EXTENSION).';base64,'.base64_encode(file_get_contents($logoPemkabPath)) : null;
@endphp
<div class="container" style="max-width:900px;margin:0 auto;padding:0 18px;">
  <table width="100%" style="margin-bottom: 6px; border: none; outline: none; box-shadow: none;">
    <tr>
      <td style="width: 18%; text-align: left; border: none; vertical-align: middle;">
        @if($logoSekolahBase64)
          <img src="{{ $logoSekolahBase64 }}" alt="Logo Sekolah" style="height: 120px; width: auto; display: block;">
        @endif
      </td>
      <td style="width: 64%; text-align: center; vertical-align: middle; border: none;">
        <div style="line-height:1.1;">
          <div style="font-size:15px; border: none; font-weight:700; margin-bottom:2px;">PEMERINTAH KABUPATEN TAPANULI UTARA</div>
          <div style="font-size:15px; border: none; font-weight:700; margin-bottom:2px;">DINAS PENDIDIKAN DAN KEBUDAYAAN</div>
          <div style="font-size:15px; border: none; font-weight:700; margin-bottom:4px;">SMA N 2 Siborongborong</div>
          <div style="font-size:11px; border: none; margin-bottom:2px;">
            Jalan Nahum Situmorang Tarutung 22413 &nbsp; Provinsi Sumatera Utara
          </div>
          <div style="font-size:11px;">
            Email: <span style="text-decoration: none; color: #000;">smpn1tarutung.taput@gmail.com</span>
          </div>
        </div>
      </td>
      <td style="width: 18%; text-align: right; border: none; vertical-align: middle;">
        @if($logoPemkabBase64)
          <img src="{{ $logoPemkabBase64 }}" alt="Logo Pemkab" style="height: 90px; width: auto; display: block;">
        @endif
      </td>
    </tr>
  </table>
  <div style="width:100%; margin-top:4px; border: none;">
    <div style="border-bottom:3px solid #000; margin-bottom:2px;"></div>
    <div style="border-bottom:1px solid #000; margin-bottom:8px;"></div>
  </div>
</div>

    <div class="judul">SURAT PERNYATAAN KEHILANGAN BUKU</div>
    <div class="nomor">Nomor: ........................................</div>

    <p>Yang bertanda tangan di bawah ini:</p>

    <table class="section">
        <tr><td width="150">Nama Siswa</td><td width="10">:</td><td>{{ $returnBook->user->nama ?? '-' }}</td></tr>
        <tr><td>NISN</td><td>:</td><td>{{ $returnBook->user->nisn ?? '-' }}</td></tr>
    </table>

    <p>Dengan ini menyatakan bahwa saya telah meminjam buku perpustakaan dengan rincian sebagai berikut:</p>

    <table class="section">
        <tr><td width="150">Judul Buku</td><td width="10">:</td><td>{{ $returnBook->book->judul ?? '-' }}</td></tr>
        <tr><td>Kode Buku</td><td>:</td><td>{{ $returnBook->book->id ?? '-' }}</td></tr>
        <tr><td>Tanggal Pinjam</td><td>:</td>
            <td>{{ \Carbon\Carbon::parse($returnBook->borrowed->borrowed_at ?? '')->translatedFormat('d F Y') }}</td></tr>
    </table>

    <p>Namun, dengan ini saya menyatakan bahwa buku tersebut telah hilang dan tidak dapat dikembalikan dalam keadaan semula.</p>

    <p>Demikian surat pernyataan ini saya buat dengan sebenarnya tanpa paksaan dari pihak mana pun.
    Apabila di kemudian hari terdapat hal-hal yang tidak benar, saya bersedia menerima sanksi sesuai peraturan sekolah.</p>

    <table width="100%" style="margin-top:30px;">
        <tr>
            <td></td>
            <td style="text-align:center;">
                Tarutung, {{ \Carbon\Carbon::parse($returnBook->created_at)->translatedFormat('d F Y') }}<br>
                Yang membuat pernyataan,<br><br><br><br>
                ({{ $returnBook->user->name ?? '..........................................' }})
            </td>
        </tr>
    </table>

    <table class="ttd">
        <tr>
            <td>
                Mengetahui,<br>
                Orang Tua/Wali Siswa<br><br><br><br>
                (..........................................)
            </td>
            <td>
                Petugas Perpustakaan<br><br><br><br>
                (..........................................)
            </td>
        </tr>
    </table>

    <div style="text-align:center; margin-top:60px;">
        Menyetujui,<br>
        Kepala SMA N 2 Siborongborong<br><br><br><br>
        (..........................................)<br>
        NIP. ....................................
    </div>
</body>
</html>
