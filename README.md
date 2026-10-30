# 📚 SIMPAS - Sistem Informasi Perpustakaan SMA N 2 Siborongborong

SIMPAS adalah aplikasi berbasis web untuk mengelola perpustakaan sekolah.  
Dibangun menggunakan **Laravel + React + MySQL**, aplikasi ini membantu admin dan anggota dalam proses pengelolaan buku, peminjaman, dan pengembalian.

---

## ✨ Fitur Utama

- 👨‍💼 **Admin (CMS)**

    - Manajemen data buku (tambah, edit, hapus)
    - Manajemen anggota/member
    - Peminjaman & pengembalian buku
    - Laporan buku & transaksi

- 👤 **Member**
    - Registrasi & login
    - Peminjaman buku
    - Pengembalian buku
    - EBOOK Feature
    - Melihat daftar buku
    - Melihat status peminjaman
    - Profil anggota

---

## 🛠️ Teknologi

- [Laravel](https://laravel.com/) 10.x
- [React](https://reactjs.org/) 3.x
- [Shadcn UI](https://ui.shadcn.com/)
- Database: MySQL

---

## 🛠️ Akun Log-in

- Admin
    - Username: `admin@example.com`
    - Password: `password`
- Member
    - Username: `member@example.com`
    - Password: `password`

---
## Docker
docker run --rm -u $(id -u):$(id -g) -e HOME=/tmp -v "$PWD":/app -w /app node:22 sh -c "npm ci && npm run build"

