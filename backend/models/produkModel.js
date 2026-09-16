// backend/models/produkModel.js
// Model tabel produk — tanpa stok / no_barang

const db = require("../config/db");

const findAllProduk = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM produk ORDER BY created_at DESC", (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

const findProdukById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM produk WHERE id_produk = ?", [id], (err, rows) => {
      if (err) return reject(err);
      resolve(rows[0]);
    });
  });
};

const insertProduk = (produk) => {
  const { nama_produk, deskripsi, harga, gambar, kategori } = produk;
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO produk (nama_produk, deskripsi, harga, gambar, kategori)
       VALUES (?, ?, ?, ?, ?)`,
      [nama_produk, deskripsi, harga, gambar || null, kategori],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

const updateProduk = (id, produk) => {
  const { nama_produk, deskripsi, harga, gambar, kategori } = produk;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE produk SET
         nama_produk = ?, deskripsi = ?, harga = ?, gambar = ?, kategori = ?
       WHERE id_produk = ?`,
      [nama_produk, deskripsi, harga, gambar || null, kategori, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows);
      }
    );
  });
};

const deleteProduk = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM produk WHERE id_produk = ?", [id], (err, result) => {
      if (err) return reject(err);
      resolve(result.affectedRows);
    });
  });
};

module.exports = {
  findAllProduk,
  findProdukById,
  insertProduk,
  updateProduk,
  deleteProduk,
};
