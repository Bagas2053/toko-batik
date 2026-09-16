-- Jalankan di database toko_batik (phpMyAdmin / MySQL)
-- Mengosongkan pembeli & semua pesanan agar dashboard jadi 0

SET FOREIGN_KEY_CHECKS = 0;

-- Hapus semua pesanan
DELETE FROM pembelian;
ALTER TABLE pembelian AUTO_INCREMENT = 1;

-- Hapus semua akun pembeli (admin tetap)
DELETE FROM users WHERE role = 'pembeli';
-- Biarkan admin id 10; reset auto increment
ALTER TABLE users AUTO_INCREMENT = 11;

SET FOREIGN_KEY_CHECKS = 1;

-- Cek hasil (opsional)
SELECT
  (SELECT COUNT(*) FROM users WHERE role = 'pembeli') AS jumlah_pembeli,
  (SELECT COUNT(*) FROM pembelian) AS jumlah_pesanan,
  (SELECT COUNT(*) FROM users WHERE role = 'admin') AS jumlah_admin;
