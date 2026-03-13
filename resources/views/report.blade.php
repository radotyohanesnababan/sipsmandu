<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Laporan Perpustakaan</title>
  <style>
    body{font-family: Arial, Helvetica, sans-serif; color:#111}
    .container{max-width:900px;margin:24px auto;padding:18px;border:0px; solid #ddd}
    .header{text-align:center;margin-bottom:18px}
    .header h1{margin:6px 0;font-size:18px}
    .header p{margin:2px 0;font-size:13px}
    .period{margin-bottom:18px;text-align:center}
    table{width:100%;border-collapse:collapse;margin-bottom:18px}
    table th, table td{border:1px solid #1a0101;padding:8px;text-align:left;font-size:13px}
    table th{background:#f3f3f3}
    .two-col{display:flex;gap:16px}
    .card{flex:1;padding:12px;border:1px solid #eee;background:#fafafa}
    .chart-wrap{text-align:center;margin:12px 0}
    .footer{font-size:12px;color:#666;margin-top:8px}
    .small{font-size:13px;color:#333}
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
          <div style="font-size:17px; border: none; font-weight:700; margin-bottom:2px;">PEMERINTAH KABUPATEN TAPANULI UTARA</div>
          <div style="font-size:17px; border: none; font-weight:700; margin-bottom:2px;">DINAS PENDIDIKAN DAN KEBUDAYAAN</div>
          <div style="font-size:17px; border: none; font-weight:700; margin-bottom:4px;">SMA N 2 Siborongborong</div>
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


    <div class="period">
      <h2 style="font-size:17px">LAPORAN PERPUSTAKAAN</h2>
      <p>{{ $start ?? 'DD/MM/YYYY' }} &ndash; {{ $end ?? 'DD/MM/YYYY' }}</p>
    </div>

    <!-- 1. Laporan Stok Buku -->
    <h4>1. Laporan Stok Buku</h4>

    <div  style="margin-bottom:12px">
      <strong>a. Total Buku</strong>
    <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Jenis</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>Buku</td>
              <td>{{ $totalBuku ?? 'xxx' }}</td>
            </tr>
             <tr>
              <td>2</td>
              <td>Judul</td>
              <td>{{ $totalJudul ?? 'xxx' }}</td>
            </tr>
             </tr>
             <tr>
              <td>3</td>
              <td>E-Book</td>
              <td>{{ $ebook_total ?? 'xxx' }}</td>
            </tr>
        </tbody>
      </table>

    </div>

    <div style="margin-top:12px">
      <strong>b. Daftar Buku Per Penerbit</strong>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Penerbit</th>
            <th>Jumlah Judul</th>
            <th>Jumlah Satuan</th>
          </tr>
        </thead>
        <tbody>
          @forelse(($publishers ?? []) as $i => $publisher)
            <tr>
              <td>{{ $i + 1 }}</td>
              <td>{{ $publisher['name'] }}</td>
              <td>{{ $publisher['titles'] }}</td>
              <td>{{ $publisher['copies'] }}</td>
            </tr>
          @empty
            <tr>
              <td colspan="4" style="text-align:center;color:#999">Tidak ada data penerbit</td>
            </tr>
          @endforelse
        </tbody>
      </table>
    </div>

    <div style="margin-top:12px">
      <strong>c. Buku baru selama periode ini</strong>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Buku</th>
            <th>Penerbit</th>
            <th>Jumlah Satuan</th>
          </tr>
        </thead>
        <tbody>
          @forelse(($new_books ?? []) as $i => $book)
            <tr>
              <td>{{ $i + 1 }}</td>
              <td>{{ $book['judul'] }}</td>
              <td>{{ $book['publisher'] }}</td>
              <td>{{ $book['copies'] }}</td>

            </tr>
          @empty
            <tr><td colspan="4" style="text-align:center;color:#999">Tidak ada buku baru</td></tr>
          @endforelse
        </tbody>
      </table>
    </div>

    <div style="margin-top:12px">
      <strong>d. Buku Hilang</strong>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Buku</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          @forelse(($lost_books ?? []) as $i => $book)
            <tr>
              <td>{{ $i + 1 }}</td>
              <td>{{ $book['title'] }}</td>
              <td>{{ $book['count'] }}</td>
            </tr>
          @empty
            <tr><td colspan="3" style="text-align:center;color:#999">Tidak ada laporan buku hilang</td></tr>
          @endforelse
        </tbody>
      </table>
    </div>

    <!-- 2. Laporan Peminjaman Buku -->
    <h4>2. Laporan Peminjaman Buku</h4>
    <div class="two-col" style="margin-bottom:12px">
      <div class="card">
        <p><strong>Total Buku yang dipinjam :</strong> {{ $borrowed_total ?? '-' }}</p>
        <p><strong>Rata-rata durasi peminjaman :</strong> {{ $avg_duration ?? '-' }} hari</p>
      </div>
      <div class="card">
        <p><strong>Buku Paling Sering Dipinjam :</strong></p>
        <ol>
          @forelse(($top_borrowed ?? []) as $book)
            <li>{{ $book }}</li>
          @empty
            <li>-</li>
          @endforelse
        </ol>
      </div>
    </div>

    <!-- 3. Laporan Pengembalian Buku -->
    <h4>3. Laporan Pengembalian Buku</h4>
    <div>
      <table>
      <tbody>
        <tr>
          <th>Jumlah buku yang dikembalikan tepat waktu</th>
          <td>{{ $returned_on_time }}</td>

        </tr>
        <tr>
          <th>Jumlah buku yang terlambat dikembalikan</th>
          <td>{{ $returned_late }}</td>

        </tr>
         <tr>
          <th>Rata rata durasi keterlambatan</th>
          <td>{{ $avg_late_duration }}</td>

        </tr>
      </tbody>
      </table>
    </div>

    <!-- 4. Laporan Aktifitas Ebook -->
    <h4>4. Laporan Aktifitas Ebook</h4>
    <div>
      <table>
      <tbody>
        <tr>
          <th>Total Ebook Tersedia</th>
          <td>{{ $ebook_total ?? '-' }}</td>

        </tr>
      </tbody>
      </table>
      <div class="card">
        <p><strong>Ebook Paling Sering Didownload :</strong></p>
        <ol>
          @forelse(($ebook_top ?? []) as $book)
            <li>{{ $book }}</li>
          @empty
            <li>-</li>
          @endforelse
        </ol>
      </div>
    </div>
    

    <!-- 5. Aktivitas Anggota Perpustakaan -->
    <h4>5. Aktivitas Anggota Perpustakaan</h4>
    <p><strong>Total Peminjaman Berdasarkan Kelas</strong></p>
    <table>
      <thead>
        <tr>
          <th>Kelas</th>
          <th>Total Peminjaman</th>
        </tr>
      </thead>
      <tbody>
        @foreach(($class_totals ?? ['VII'=>0,'VIII'=>0,'IX'=>0]) as $kelas => $total)
          <tr>
            <td>{{ $kelas }}</td>
            <td>{{ $total }}</td>
          </tr>
        @endforeach
      </tbody>
    </table>

    <div class="chart-wrap" style="position: relative; width: 100%; max-width: 600px; height: 300px; margin: auto;">
    <p>Distribusi Peminjaman Berdasarkan Kelas</p>
    <img src="{{ $chart_base64 }}" style="width:100%; max-width:600px; height:auto;">

  </div>

</body>
</html>
