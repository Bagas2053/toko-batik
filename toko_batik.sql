-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Sep 2026 pada 05.39
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toko_batik`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(225) NOT NULL,
  `ringkasan` text NOT NULL,
  `isi` text NOT NULL,
  `gambar` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `ringkasan`, `isi`, `gambar`, `created_at`, `updated_at`) VALUES
(3, 'Mengenal Motif Parang: Simbol Semangat Pantang Menyerah', 'Motif Parang adalah salah satu motif batik klasik Jawa yang penuh makna filosofis. Bentuknya menyerupai ombak atau bilah pedang yang saling terkait.', 'Motif Parang berasal dari kata "pereng" yang berarti lereng atau tebing. Dalam budaya Jawa, motif ini melambangkan semangat yang terus mengalir seperti ombak, pantang menyerah, dan kekuatan batin.

Dulu, motif Parang hanya boleh dikenakan oleh keluarga kerajaan. Kini, kemeja dan kain batik motif Parang menjadi pilihan populer untuk acara formal karena kesan elegan dan berwibawa.

Di Batik Nusantara, kami menyediakan kemeja batik Parang klasik maupun modern dengan kualitas tulis dan cap yang terjamin.', '', '2026-08-27 23:56:49', '2026-08-27 23:57:17'),
(4, 'Batik Mega Mendung: Warisan Cirebon yang Ikonik', 'Mega Mendung adalah motif batik khas Cirebon yang terinspirasi dari bentuk awan. Motif ini menjadi ikon batik pesisir yang kaya warna.', 'Mega Mendung menggambarkan awan mendung yang membawa hujan dan kesuburan. Motif ini dipengaruhi budaya Cina dan Islam di pesisir utara Jawa.

Warna khasnya biru indigo, merah, dan hijau. Kemeja batik Mega Mendung cocok untuk gaya kasual yang tetap menonjolkan identitas budaya Indonesia.

Batik Nusantara menghadirkan koleksi Mega Mendung dari pengrajin Cirebon terpercaya.', '', '2026-08-28 13:17:37', '2026-08-28 13:17:37'),
(5, 'Perbedaan Batik Tulis, Cap, dan Printing', 'Memahami perbedaan teknik pembuatan batik membantu Anda memilih produk yang sesuai kebutuhan dan budget.', 'Batik tulis dibuat dengan canting secara manual, sehingga setiap helai unik dan bernilai seni tinggi. Batik cap menggunakan cap tembaga untuk motif berulang, lebih cepat dan lebih terjangkau. Batik printing adalah kain bermotif batik yang dicetak mesin.

Di Batik Nusantara kami fokus pada batik tulis dan batik cap berkualitas dari pengrajin lokal Solo, Yogyakarta, Cirebon, Lasem, dan Madura.', '', '2026-08-31 11:31:02', '2026-08-31 13:10:40'),
(6, 'Cara Merawat Kain dan Pakaian Batik', 'Merawat batik dengan benar membuat warna dan motif tetap awet bertahun-tahun.', 'Cuci batik dengan tangan menggunakan sabun lembut, hindari pemutih. Jemur di tempat teduh, jangan langsung di bawah matahari terik. Setrika dengan suhu sedang dari sisi dalam.

Simpan di tempat kering dan hindari lipatan yang sama terus-menerus agar motif tidak rusak. Dengan perawatan tepat, batik Anda bisa diwariskan ke generasi berikutnya.', '', '2026-08-31 11:32:27', '2026-08-31 11:32:27'),
(7, 'Filosofi Motif Kawung dan Sidomukti', 'Setiap motif batik klasik membawa pesan moral dan harapan baik bagi pemakainya.', 'Kawung melambangkan kesempurnaan, kebijaksanaan, dan pengendalian diri. Bentuknya seperti buah aren yang dipotong melintang.

Sidomukti berarti menuju kesejahteraan dan kebahagiaan. Motif ini sering dikenakan pada upacara pernikahan dan acara penting.

Memakai batik dengan memahami maknanya membuat penampilan Anda lebih bermakna.', '', '2026-09-03 07:47:46', '2026-09-03 07:47:46'),
(8, 'Batik untuk Gaya Kerja Modern', 'Batik tidak hanya untuk acara adat. Kemeja dan dress batik bisa menjadi pilihan stylish di kantor.', 'Kemeja batik motif sederhana dengan warna netral sangat cocok untuk smart casual di kantor. Padukan dengan celana chino atau rok pensil.

Dress batik potongan modern juga bisa dipakai ke meeting atau acara kantor formal. Pilih motif yang tidak terlalu ramai agar tetap profesional.

Batik Nusantara menyediakan pilihan motif yang relevan untuk gaya kerja kontemporer.', '', '2026-09-03 07:48:44', '2026-09-03 07:48:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `id` int(11) NOT NULL,
  `id_pembeli` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `nama_pembeli` varchar(50) DEFAULT NULL,
  `alamat_pembeli` text DEFAULT NULL,
  `phone_pembeli` bigint(20) DEFAULT NULL,
  `metode_pembayaran` enum('Bank Transfer','COD') NOT NULL DEFAULT 'COD',
  `pembayaran` enum('Belum','Dibayar') NOT NULL DEFAULT 'Belum',
  `pengiriman` enum('JNT Express','JNE') NOT NULL DEFAULT 'JNT Express',
  `status` enum('Tertunda','Dikemas','Dikirim','Diterima','Selesai') NOT NULL DEFAULT 'Tertunda',
  `catatan` text DEFAULT NULL,
  `foto_bukti` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pembelian`
--

-- (tidak ada data pesanan)


-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `harga` int(11) NOT NULL,
  `gambar` varchar(500) DEFAULT NULL,
  `kategori` enum('Kemeja Batik','Dress Batik','Kain Batik') NOT NULL DEFAULT 'Kemeja Batik',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id_produk`, `nama_produk`, `deskripsi`, `harga`, `gambar`, `kategori`, `created_at`, `updated_at`) VALUES
(1, 'Kemeja Batik Parang Klasik', 'Kemeja batik tulis motif Parang yang melambangkan semangat pantang menyerah. Dibuat dari katun premium dengan pewarna alami, nyaman dipakai untuk acara formal maupun semi formal.', 450000, NULL, 'Kemeja Batik', '2026-08-27 22:49:28', '2026-08-31 10:16:10'),
(2, 'Kemeja Batik Kawung Modern', 'Kemeja batik motif Kawung dengan sentuhan modern. Motif kawung melambangkan kesempurnaan dan kebijaksanaan. Bahan katun lembut, potongan regular fit.', 380000, NULL, 'Kemeja Batik', '2026-08-27 23:44:59', '2026-08-31 10:16:05'),
(3, 'Dress Batik Sidomukti', 'Dress batik motif Sidomukti yang melambangkan kesejahteraan. Desain modern dengan potongan A-line, nyaman untuk acara resmi maupun kondangan.', 550000, NULL, 'Dress Batik', '2026-08-27 23:47:17', '2026-08-31 10:15:37'),
(4, 'Dress Batik Truntum', 'Dress batik motif Truntum — simbol cinta yang tumbuh kembali. Desain simple chic dengan lengan 3/4, nyaman dipakai sepanjang hari.', 520000, NULL, 'Dress Batik', '2026-08-27 23:48:47', '2026-08-31 10:15:06'),
(5, 'Kain Batik Tulis Solo 2,25m', 'Kain batik tulis asli Solo panjang 2,25 meter. Motif klasik dengan canting halus, cocok untuk dijahit menjadi kemeja, blouse, atau jarik.', 750000, NULL, 'Kain Batik', '2026-08-27 23:49:29', '2026-08-31 10:14:51'),
(6, 'Kain Batik Cap Yogyakarta', 'Kain batik cap motif kombinasi dari Yogyakarta. Lebar standar, cocok untuk bahan baju, rok, atau decor. Harga terjangkau dengan kualitas bagus.', 280000, NULL, 'Kain Batik', '2026-08-27 23:50:21', '2026-08-31 10:14:36');

-- --------------------------------------------------------

--
-- Indexes
-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama_d` varchar(50) NOT NULL,
  `nama_b` varchar(50) NOT NULL,
  `kelamin` text NOT NULL,
  `lahir` text NOT NULL,
  `alamat` text NOT NULL,
  `phone` bigint(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `role` enum('admin','pembeli') NOT NULL DEFAULT 'pembeli',
  `uname` varchar(30) NOT NULL,
  `passwd` varchar(256) NOT NULL,
  `foto` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama_d`, `nama_b`, `kelamin`, `lahir`, `alamat`, `phone`, `email`, `role`, `uname`, `passwd`, `foto`, `created_at`, `updated_at`) VALUES
(10, 'Admin', 'Toko', 'Laki-laki', '2009-03-09', 'Alamat Admin', 81234567890, 'admin@gmail.com', 'admin', 'admin', '$2b$10$/dQCjcRXk0zYLg6weaFNQe4uN/f1huSOvNSfaPHpJS.oxQcBqganm', '', '2026-08-27 22:46:53', '2026-09-03 08:48:04');


--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pembelian_user` (`id_pembeli`),
  ADD KEY `fk_pembelian_produk` (`id_produk`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_email` (`email`),
  ADD UNIQUE KEY `uq_users_uname` (`uname`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `fk_pembelian_produk` FOREIGN KEY (`id_produk`) REFERENCES `produk` (`id_produk`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pembelian_user` FOREIGN KEY (`id_pembeli`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
