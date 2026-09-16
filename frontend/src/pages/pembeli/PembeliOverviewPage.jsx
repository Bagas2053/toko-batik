import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pembeliApi } from '../../api';
import { usePembeliGuard } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/admin/StatCard';
import LoadingBlock from '../../components/admin/LoadingBlock';

export default function PembeliOverviewPage() {
  const { user } = useAuth();
  const { handleError } = usePembeliGuard();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    pembeliApi
      .getDashboard()
      .then((res) => {
        if (alive) setStats(res.data);
      })
      .catch((err) => {
        if (!alive) return;
        if (!handleError(err)) setError(err.message || 'Gagal memuat data');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [handleError]);

  if (loading) return <LoadingBlock />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const cards = [
    {
      label: 'Total Pesanan',
      value: stats?.total_pembelian ?? 0,
      tone: 'brand',
      icon: 'bi-bag',
      hint: 'Semua transaksi kamu',
    },
    {
      label: 'Tertunda',
      value: stats?.total_menunggu ?? 0,
      tone: 'warn',
      icon: 'bi-hourglass-split',
      hint: 'Menunggu diproses',
    },
    {
      label: 'Diproses',
      value: stats?.total_proses ?? 0,
      tone: 'info',
      icon: 'bi-box-seam',
      hint: 'Dikemas / dikirim',
    },
    {
      label: 'Selesai',
      value: stats?.total_selesai ?? 0,
      tone: 'success',
      icon: 'bi-check2-circle',
      hint: 'Pesanan selesai',
    },
  ];

  return (
    <div>
      <div className="dash-welcome mb-4">
        <h2 className="page-title mb-1">Halo, {user?.nama_d || 'Pembeli'} 👋</h2>
        <p className="text-secondary mb-0">Ringkasan pesanan & status belanja kamu di Toko Batik Ananda.</p>
      </div>

      <div className="stat-grid-v2">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      <div className="panel mt-4">
        <h3 className="h6 fw-bold mb-2">Aksi cepat</h3>
        <p className="text-secondary small mb-3">Pesan produk favorit atau cek status pesanan terakhir.</p>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/toko" className="btn btn-brand btn-sm">
            + Belanja sekarang
          </Link>
          <Link to="/akun/keranjang" className="btn btn-outline-brand btn-sm">
            Keranjang
          </Link>
          <Link to="/akun/transaksi" className="btn btn-outline-brand btn-sm">
            Lihat transaksi
          </Link>
          <Link to="/akun/profil" className="btn btn-outline-secondary btn-sm rounded-pill">
            Ubah profil
          </Link>
        </div>
      </div>
    </div>
  );
}
