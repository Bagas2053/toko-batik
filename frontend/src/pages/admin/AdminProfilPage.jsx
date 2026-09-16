/**
 * Profil admin — data pribadi + foto + ganti kata sandi.
 */
import { useEffect, useState } from 'react';
import { adminApi } from '../../api';
import { useAdminGuard } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/admin/PageHeader';
import LoadingBlock from '../../components/admin/LoadingBlock';
import ImageUploadField from '../../components/admin/ImageUploadField';
import { KELAMIN } from '../../constants';
import { normalizeKelamin, toDateInputValue, mediaUrl } from '../../utils';

export default function AdminProfilPage() {
  const { handleError } = useAdminGuard();
  const { updateUser } = useAuth();
  const [form, setForm] = useState(null);
  const [passwd, setPasswd] = useState({
    passwd_lama: '',
    passwd_baru: '',
    passwd_baru_konfirmasi: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    adminApi
      .getMe()
      .then((r) => {
        if (!alive) return;
        const raw = r.data || {};
        const p = raw.nama_d ? raw : (raw.user || raw.admin || {});
        setForm({
          nama_d: p.nama_d || '',
          nama_b: p.nama_b || '',
          kelamin: normalizeKelamin(p.kelamin),
          lahir: toDateInputValue(p.lahir),
          alamat: p.alamat || '',
          phone: String(p.phone ?? ''),
          email: p.email || '',
          uname: p.uname || '',
          foto: p.foto || p.gambar || '',
        });
      })
      .catch((err) => {
        if (!alive) return;
        handleError(err);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [handleError]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  function handlePasswdChange(key) {
    return (e) => setPasswd((p) => ({ ...p, [key]: e.target.value }));
  }

  function applyFoto(path) {
    setForm((f) => ({ ...f, foto: path || '' }));
    setSuccess('');
    setError('');
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwd.passwd_baru || passwd.passwd_lama || passwd.passwd_baru_konfirmasi) {
      if (!passwd.passwd_lama) {
        setError('Kata sandi lama wajib diisi untuk ganti password.');
        return;
      }
      if (!passwd.passwd_baru || passwd.passwd_baru.length < 6) {
        setError('Kata sandi baru minimal 6 karakter.');
        return;
      }
      if (passwd.passwd_baru !== passwd.passwd_baru_konfirmasi) {
        setError('Konfirmasi kata sandi baru tidak cocok.');
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        nama_d: form.nama_d,
        nama_b: form.nama_b,
        kelamin: form.kelamin,
        lahir: form.lahir,
        alamat: form.alamat,
        phone: parseInt(String(form.phone).replace(/\D/g, ''), 10) || form.phone,
        email: form.email || undefined,
        uname: form.uname || undefined,
        foto: form.foto || null,
      };
      if (passwd.passwd_baru) {
        payload.passwd_lama = passwd.passwd_lama;
        payload.passwd_baru = passwd.passwd_baru;
      }
      await adminApi.putMe(payload);
      updateUser({
        nama_d: form.nama_d,
        nama_b: form.nama_b,
        foto: form.foto,
      });
      setSuccess(
        passwd.passwd_baru
          ? 'Profil dan kata sandi berhasil diperbarui.'
          : 'Profil berhasil diperbarui.'
      );
      setPasswd({ passwd_lama: '', passwd_baru: '', passwd_baru_konfirmasi: '' });
    } catch (err) {
      if (!handleError(err)) setError(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingBlock />;
  if (!form) return null;

  const fullName = [form.nama_d, form.nama_b].filter(Boolean).join(' ') || 'Admin';

  return (
    <div>
      <PageHeader title="Profil Saya" subtitle="Kelola data akun admin & kata sandi" />
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="row g-4">
        {/* Kartu foto */}
        <div className="col-lg-4">
          <div className="admin-panel p-4 text-center h-100">
            <div className="mb-3 d-inline-block position-relative">
              <img
                src={mediaUrl(form.foto)}
                alt="Foto profil"
                width={120}
                height={120}
                className="rounded-circle border"
                style={{ objectFit: 'cover', background: '#eee' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/placeholder.png';
                }}
              />
            </div>
            <h2 className="h5 fw-bold mb-1">{fullName}</h2>
            <p className="text-secondary small mb-3">Admin · {form.uname || '—'}</p>
            <ImageUploadField
              label="Ganti foto profil"
              value={form.foto}
              onChange={applyFoto}
              clearable
            />
            <p className="form-text small mt-2 mb-0">
              Klik Simpan di form kanan untuk menyimpan foto.
            </p>
          </div>
        </div>

        {/* Form data + sandi */}
        <div className="col-lg-8">
          <form onSubmit={onSubmit}>
            <div className="admin-panel p-4 mb-4">
              <h3 className="h6 fw-semibold text-uppercase text-secondary mb-3" style={{ letterSpacing: '0.04em' }}>
                Data pribadi
              </h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Nama depan</label>
                  <input className="form-control" value={form.nama_d} onChange={set('nama_d')} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nama belakang</label>
                  <input className="form-control" value={form.nama_b} onChange={set('nama_b')} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Jenis kelamin</label>
                  <select className="form-select" value={form.kelamin} onChange={set('kelamin')}>
                    {KELAMIN.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tanggal lahir</label>
                  <input type="date" className="form-control" value={form.lahir} onChange={set('lahir')} required />
                </div>
                <div className="col-12">
                  <label className="form-label">Alamat</label>
                  <textarea className="form-control" rows={2} value={form.alamat} onChange={set('alamat')} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Telepon</label>
                  <input className="form-control" value={form.phone} onChange={set('phone')} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={form.email} onChange={set('email')} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Username</label>
                  <input className="form-control" value={form.uname} onChange={set('uname')} />
                </div>
              </div>
            </div>

            {/* Kartu ganti kata sandi — menonjol */}
            <div className="admin-panel p-4 mb-4 border border-warning-subtle" style={{ background: '#fffbf0' }}>
              <h3 className="h6 fw-bold mb-1">
                <i className="bi bi-shield-lock me-2" />
                Ganti kata sandi admin
              </h3>
              <p className="text-secondary small mb-3">
                Isi ketiga kolom di bawah jika ingin mengganti sandi. Kosongkan semua jika tidak ingin mengubah.
              </p>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Kata sandi lama</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwd.passwd_lama}
                    onChange={handlePasswdChange('passwd_lama')}
                    autoComplete="current-password"
                    placeholder="Sandi saat ini"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Kata sandi baru</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwd.passwd_baru}
                    onChange={handlePasswdChange('passwd_baru')}
                    autoComplete="new-password"
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Konfirmasi sandi baru</label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwd.passwd_baru_konfirmasi}
                    onChange={handlePasswdChange('passwd_baru_konfirmasi')}
                    autoComplete="new-password"
                    minLength={6}
                    placeholder="Ulangi sandi baru"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-brand px-4" disabled={saving}>
                {saving ? 'Menyimpan…' : 'Simpan profil & sandi'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
