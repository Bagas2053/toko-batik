export const SITE = {
  nama_toko: 'Toko Batik Ananda',
  tagline: 'Batik Modern Berjiwa Tradisional',
  tentang:
    'Toko Batik Ananda menghadirkan koleksi batik pilihan dari pengrajin lokal. Kami fokus pada kain batik, kemeja, dress, dan aksesoris yang nyaman dipakai sehari-hari maupun acara khusus. Setiap potongan dipilih dengan teliti agar kualitas dan makna motif tetap terjaga.',
  alamat_toko: 'Jl. Merdeka Raya No. 88, Kecamatan Wates, Yogyakarta',
  email_toko: 'tokobatik.ananda@gmail.com',
  tlp_toko: '+6281234567890',
  jam_buka: '08.30',
  jam_tutup: '20.00',
  hari_buka: 'Senin – Sabtu',
  link_wa: 'https://wa.me/6281234567890',
  link_ig: 'https://instagram.com/tokobatik.ananda',
  link_fb: 'https://facebook.com/tokobatik.ananda',
  logo: '/logo-batik-icon.svg',
  logo_auth: '/logo-batik.svg',
  logo_auth_white: '/logo-batik-white.svg',
};

/** Konten hero beranda */
export const HERO = {
  badge: 'BATIK TULIS · BATIK CAP · KOLEKSI TERBARU',
  title: 'Toko Batik Ananda',
  deskripsi:
    'Temukan batik berkualitas untuk gaya modern Anda. Dari motif klasik hingga desain kontemporer — siap pakai untuk kerja, formal, atau santai. Pengiriman ke seluruh Indonesia.',
  cta_koleksi: 'Jelajahi Koleksi',
  cta_wa: 'Chat WhatsApp',
  gambar: '',
  gambar_alt: 'Koleksi Toko Batik Ananda',
};

/** Fitur / keunggulan di beranda */
export const KEUNGGULAN = [
  { icon: 'bi-award', judul: 'Pilihan Terseleksi', deskripsi: 'Setiap produk dipilih dari pengrajin terpercaya.' },
  { icon: 'bi-box-seam', judul: 'Packing Aman', deskripsi: 'Dikemas rapi, siap dikirim ke alamat Anda.' },
  { icon: 'bi-wallet2', judul: 'Pembayaran Mudah', deskripsi: 'Transfer bank atau COD sesuai preferensi.' },
  { icon: 'bi-heart', judul: 'Nyaman & Stylish', deskripsi: 'Motif indah dengan bahan yang nyaman dipakai.' },
];

export const PUBLIC_NAV = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/toko', label: 'Koleksi', end: false },
  { to: '/artikel', label: 'Artikel', end: false },
];

export const KELAMIN = ['Laki-laki', 'Perempuan'];
export const KATEGORI_PRODUK = ['Kemeja Batik', 'Dress Batik', 'Kain Batik'];
export const METODE_BAYAR = ['Bank Transfer', 'COD'];
/** Rekening tujuan saat bayar Bank Transfer */
export const BANK_OPTIONS = [
  { id: 'BCA', label: 'BCA', norek: '7788990011', atas_nama: 'Toko Batik Ananda' },
  { id: 'BRI', label: 'BRI', norek: '4455667788', atas_nama: 'Toko Batik Ananda' },
  { id: 'Mandiri', label: 'Mandiri', norek: '9900112233', atas_nama: 'Toko Batik Ananda' },
  { id: 'BNI', label: 'BNI', norek: '3344556677', atas_nama: 'Toko Batik Ananda' },
];
export const SHIPPING = ['JNT Express', 'JNE'];
export const STATUS_PROSES = ['Tertunda', 'Dikemas', 'Dikirim', 'Diterima', 'Selesai', 'Dibatalkan'];
export const STATUS_BAYAR = ['Belum', 'Dibayar'];
