import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken, clearAuthTokens } from '@/config/api.config';

// ─── Parol kuchi hisoblash ───────────────────────────────────────────────────
const getPasswordStrength = (pw: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Juda zaif', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Zaif', color: 'bg-orange-500' };
  if (score === 3) return { score, label: "O'rtacha", color: 'bg-yellow-500' };
  if (score === 4) return { score, label: 'Kuchli', color: 'bg-emerald-500' };
  return { score, label: 'Juda kuchli', color: 'bg-cyan-400' };
};

// ─── Komponent ───────────────────────────────────────────────────────────────
const Security: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('honey_user') || 'null');

  // ── Parol o'zgartirish state ──
  const [pwForm, setPwForm] = useState({ old_password: '', new_password: '', confirm: '' });
  const [showPw, setShowPw] = useState({ old: false, new: false, confirm: false });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  // ── Hisob o'chirish state ──
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // ── Parol kuchi ──
  const strength = getPasswordStrength(pwForm.new_password);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
  });

  // ── Parol o'zgartirish ──────────────────────────────────────────────────────
  const handleChangePassword = async () => {
    setPwError('');
    setPwSuccess('');

    if (!pwForm.old_password || !pwForm.new_password || !pwForm.confirm) {
      setPwError("Barcha maydonlarni to'ldiring.");
      return;
    }
    if (pwForm.new_password !== pwForm.confirm) {
      setPwError('Yangi parollar mos kelmaydi.');
      return;
    }
    if (pwForm.new_password.length < 8) {
      setPwError("Parol kamida 8 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.CHANGE_PASSWORD}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          old_password: pwForm.old_password,
          new_password: pwForm.new_password,
          confirm_password: pwForm.confirm,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwSuccess('Parol muvaffaqiyatli yangilandi!');
        setPwForm({ old_password: '', new_password: '', confirm: '' });
      } else {
        setPwError(
          data?.old_password?.[0] ||
          data?.new_password?.[0] ||
          data?.confirm_password?.[0] ||
          data?.detail ||
          data?.non_field_errors?.[0] ||
          "Parolni o'zgartirishda xatolik yuz berdi."
        );
      }
    } catch {
      setPwError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setPwLoading(false);
    }
  };

  // ── Hisobni o'chirish ──────────────────────────────────────────────────────
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'O\'CHIRISH') {
      setDeleteError("Tasdiqlash uchun 'O'CHIRISH' deb yozing.");
      return;
    }
    setDeleteLoading(true);
    setDeleteError('');
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.PROFILE.DELETE}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok || res.status === 204) {
        clearAuthTokens();
        localStorage.removeItem('honey_user');
        window.location.hash = '/';
      } else {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data?.detail || "Hisobni o'chirishda xatolik yuz berdi.");
      }
    } catch {
      setDeleteError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ← Ro'yxatga kirmagan foydalanuvchi uchun
  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-10 pb-40">
        <div className="w-28 h-28 bg-blue-500/10 rounded-[2.5rem] border border-blue-500/20 flex items-center justify-center text-5xl text-blue-400">
          <i className="fas fa-shield-halved"></i>
        </div>
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Xavfsizlik Markazi</h1>
          <p className="text-gray-400 text-lg font-bold">Xavfsizlik sozlamalarini ko'rish uchun tizimga kiring.</p>
          <a href="#/auth" className="inline-block mt-6 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
            KIRISH
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white animate-fadeIn pb-40">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

        {/* ── Sarlavha ── */}
        <div className="flex items-center gap-5 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Xavfsizlik</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Hisob himoyasi va sozlamalari</p>
          </div>
        </div>

        {/* ── Xavfsizlik holati kartalar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'fa-envelope-circle-check', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Email', value: 'Tasdiqlangan' },
            { icon: 'fa-key', color: 'text-honey', bg: 'bg-honey/10 border-honey/20', label: 'Parol', value: "O'rnatilgan" },
            { icon: 'fa-lock', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'JWT', value: 'Faol' },
            { icon: 'fa-shield-virus', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', label: 'Blacklist', value: "Yoqilgan" },
          ].map((card, i) => (
            <div key={i} className={`glass-premium rounded-3xl p-5 border ${card.bg} flex flex-col items-center text-center gap-2`}>
              <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
                <i className={`fas ${card.icon} ${card.color} text-xl`}></i>
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${card.color}`}>{card.value}</span>
              <span className="text-gray-600 text-[10px] font-bold uppercase">{card.label}</span>
            </div>
          ))}
        </div>

        {/* ── Parol o'zgartirish ── */}
        <div className="glass-premium rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <i className="fas fa-key text-blue-400 text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">Parolni o'zgartirish</h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Kamida 8 ta belgi, 1 ta katta harf</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Eski parol */}
            <div>
              <label className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-2 block">JORIY PAROL</label>
              <div className="relative">
                <input
                  type={showPw.old ? 'text' : 'password'}
                  value={pwForm.old_password}
                  onChange={e => setPwForm({ ...pwForm, old_password: e.target.value })}
                  placeholder="Hozirgi parolingiz"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm font-bold outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => ({ ...s, old: !s.old }))}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPw.old ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>
            </div>

            {/* Yangi parol */}
            <div>
              <label className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-2 block">YANGI PAROL</label>
              <div className="relative">
                <input
                  type={showPw.new ? 'text' : 'password'}
                  value={pwForm.new_password}
                  onChange={e => setPwForm({ ...pwForm, new_password: e.target.value })}
                  placeholder="Yangi kuchli parol"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pr-14 text-white text-sm font-bold outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => ({ ...s, new: !s.new }))}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPw.new ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
              </div>

              {/* Parol kuchi indikatori */}
              {pwForm.new_password && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div
                        key={i}
                        className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${i <= strength.score ? strength.color : 'bg-white/10'
                          }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-black uppercase tracking-widest ${strength.score <= 2 ? 'text-red-400' : strength.score === 3 ? 'text-yellow-400' : 'text-emerald-400'
                    }`}>
                    {strength.label}
                    {strength.score >= 4 && <i className="fas fa-check ml-2"></i>}
                  </p>
                  <ul className="text-[10px] text-gray-600 font-bold space-y-1 mt-1">
                    {[
                      [/[A-Z]/.test(pwForm.new_password), 'Katta harf (A-Z)'],
                      [/[0-9]/.test(pwForm.new_password), 'Raqam (0-9)'],
                      [/[^A-Za-z0-9]/.test(pwForm.new_password), 'Maxsus belgi (!@#...)'],
                      [pwForm.new_password.length >= 8, 'Kamida 8 ta belgi'],
                    ].map(([ok, txt], i) => (
                      <li key={i} className={`flex items-center gap-2 ${ok ? 'text-emerald-500' : 'text-gray-600'}`}>
                        <i className={`fas ${ok ? 'fa-circle-check' : 'fa-circle'} text-xs`}></i> {txt as string}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tasdiqlash */}
            <div>
              <label className="text-gray-500 font-black text-[10px] uppercase tracking-widest mb-2 block">YANGI PAROLNI TASDIQLANG</label>
              <div className="relative">
                <input
                  type={showPw.confirm ? 'text' : 'password'}
                  value={pwForm.confirm}
                  onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })}
                  placeholder="Parolni qayta kiriting"
                  className={`w-full bg-white/[0.03] border rounded-2xl px-5 py-4 pr-14 text-white text-sm font-bold outline-none transition-all ${pwForm.confirm && pwForm.new_password !== pwForm.confirm
                    ? 'border-red-500/40 focus:border-red-500/60'
                    : pwForm.confirm && pwForm.new_password === pwForm.confirm
                      ? 'border-emerald-500/40 focus:border-emerald-500/60'
                      : 'border-white/10 focus:border-blue-500/40 focus:bg-white/[0.05]'
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <i className={`fas ${showPw.confirm ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                </button>
                {pwForm.confirm && (
                  <i className={`fas absolute right-12 top-1/2 -translate-y-1/2 text-sm ${pwForm.new_password === pwForm.confirm ? 'fa-check text-emerald-400' : 'fa-times text-red-400'
                    }`}></i>
                )}
              </div>
            </div>

            {/* Xato / Muvaffaqiyat */}
            {pwError && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                <i className="fas fa-triangle-exclamation text-red-400"></i>
                <p className="text-red-400 text-sm font-bold">{pwError}</p>
              </div>
            )}
            {pwSuccess && (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <i className="fas fa-circle-check text-emerald-400"></i>
                <p className="text-emerald-400 text-sm font-bold">{pwSuccess}</p>
              </div>
            )}

            <button
              onClick={handleChangePassword}
              disabled={pwLoading || !pwForm.old_password || !pwForm.new_password || !pwForm.confirm}
              className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
            >
              {pwLoading ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saqlanmoqda...</>
              ) : (
                <><i className="fas fa-key"></i> PAROLNI YANGILASH</>
              )}
            </button>
          </div>
        </div>

        {/* ── Xavfsizlik maʼlumoti ── */}
        <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10 divide-y divide-white/5">
          <h2 className="text-lg font-black text-white uppercase tracking-tight mb-6">Xavfsizlik tafsilotlari</h2>

          {[
            {
              icon: 'fa-fingerprint',
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10 border-cyan-500/20',
              label: 'Ikki faktorli autentifikatsiya',
              value: 'Email OTP orqali tasdiqlagan',
              badge: 'Faol',
              badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            },
            {
              icon: 'fa-clock-rotate-left',
              color: 'text-purple-400',
              bg: 'bg-purple-500/10 border-purple-500/20',
              label: 'Sessiya muddati',
              value: 'Access: 60 daqiqa · Refresh: 1 kun',
              badge: 'JWT',
              badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            },
            {
              icon: 'fa-ban',
              color: 'text-orange-400',
              bg: 'bg-orange-500/10 border-orange-500/20',
              label: 'Token qoralisti',
              value: "Chiqishda tokenlar avtomatik o'chiriladi",
              badge: 'Himoyalangan',
              badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            },
            {
              icon: 'fa-shield-virus',
              color: 'text-honey',
              bg: 'bg-honey/10 border-honey/20',
              label: 'Spam filteri',
              value: 'Gemini AI asosida avtomatik nazorat',
              badge: 'AI Kuzatuv',
              badgeColor: 'bg-honey/20 text-honey border-honey/30',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl border ${item.bg} flex items-center justify-center shrink-0`}>
                  <i className={`fas ${item.icon} ${item.color}`}></i>
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight">{item.label}</p>
                  <p className="text-gray-500 text-xs font-bold mt-0.5">{item.value}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${item.badgeColor} whitespace-nowrap ml-4`}>
                {item.badge}
              </span>
            </div>
          ))}
        </div>

        {/* ── Google OAuth holati ── */}
        <div className="glass-premium rounded-[2.5rem] p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <i className="fab fa-google text-2xl text-white/60"></i>
              </div>
              <div>
                <h3 className="text-white font-black uppercase tracking-tight">Google OAuth</h3>
                <p className="text-gray-500 text-xs font-bold">Google hisobi orqali kirish imkoniyati</p>
              </div>
            </div>
            <a
              href={`${API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE}`}
              className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Ulash
            </a>
          </div>
        </div>

        {/* ── Xavfli zona: Hisobni o'chirish ── */}
        <div className="glass-premium rounded-[2.5rem] p-8 border border-red-500/20 bg-red-500/3 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/5 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <i className="fas fa-triangle-exclamation text-red-400 text-xl"></i>
            </div>
            <div>
              <h2 className="text-lg font-black text-red-400 uppercase tracking-tight">Xavfli Zona</h2>
              <p className="text-gray-500 text-sm font-bold mt-1">
                Bu amallar qaytarib bo'lmaydi. Juda ehtiyotkorlik bilan foydalaning.
              </p>
            </div>
          </div>

          <div className="space-y-4 pl-2">
            <div className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div>
                <p className="text-white font-black text-sm uppercase">Hisobni o'chirish</p>
                <p className="text-gray-500 text-xs font-bold mt-0.5">
                  Barcha ma'lumotlar, kitoblar va chatlar o'chib ketadi
                </p>
              </div>
              <button
                onClick={() => setDeleteModal(true)}
                className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all active:scale-95 shrink-0 ml-4"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Hisob o'chirish modali ─────────────────────────────────────────── */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0f0f0f] border border-red-500/30 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl shadow-red-500/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <i className="fas fa-trash text-3xl text-red-400"></i>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Hisobni o'chirish</h3>
              <p className="text-gray-400 text-sm font-bold leading-relaxed">
                Bu amal <span className="text-red-400">qaytarib bo'lmaydi</span>. Barcha ma'lumotlaringiz, kitoblaringiz va chatlaringiz butunlay o'chib ketadi.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-red-400 font-black text-[10px] uppercase tracking-widest mb-2 block">
                  Tasdiqlash uchun <span className="text-white">O'CHIRISH</span> deb yozing
                </label>
                <input
                  value={deleteConfirmText}
                  onChange={e => setDeleteConfirmText(e.target.value.toUpperCase())}
                  placeholder="O'CHIRISH"
                  className="w-full bg-white/5 border border-red-500/30 rounded-2xl px-5 py-4 text-white font-black text-center text-lg outline-none focus:border-red-500/60 tracking-widest transition-all"
                />
              </div>

              {deleteError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-xs font-bold text-center">{deleteError}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setDeleteModal(false); setDeleteConfirmText(''); setDeleteError(''); }}
                  className="flex-1 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteLoading || deleteConfirmText !== "O'CHIRISH"}
                  className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Yuklanmoqda</>
                  ) : (
                    <><i className="fas fa-trash text-xs"></i> O'chirish</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
