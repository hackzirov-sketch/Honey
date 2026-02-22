import React, { useState, useEffect } from "react";
import { API_BASE_URL, API_ENDPOINTS, setAuthToken } from "@/config/api.config";

type Step = "form" | "verify";
type Mode = "register" | "login";

const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [mode, setMode] = useState<Mode>("register");
  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    password_confirm: "",
  });
  const [verifyCode, setVerifyCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // ── Google OAuth callback dan kelgan tokenlarni qabul qilish ──
  useEffect(() => {
    // HashRouter ishlatilayotganida window.location.hash dan o'qish
    const fullHash = window.location.hash; // masalan: #/auth?access=xxx&refresh=yyy&user=zzz
    const queryStart = fullHash.indexOf("?");
    if (queryStart === -1) return;

    const queryStr = fullHash.slice(queryStart + 1);
    const params = new URLSearchParams(queryStr);

    const access = params.get("access");
    const refresh = params.get("refresh");
    const userJson = params.get("user");
    const oauthError = params.get("error");

    if (oauthError) {
      setError(`Google kirish xatoligi: ${decodeURIComponent(oauthError)}`);
      // URL ni tozalash
      window.location.hash = "/auth";
      return;
    }

    if (access && refresh) {
      setAuthToken(access, refresh);
      if (userJson) {
        try {
          const userData = JSON.parse(decodeURIComponent(userJson));
          localStorage.setItem("honey_user", JSON.stringify(userData));
        } catch { /* ignore */ }
      }
      // URL parametrlarini tozalash va asosiy sahifaga o'tish
      window.location.hash = "/";
      onAuth();
    }
  }, []);


  // --- REGISTER ---
  const handleRegister = async () => {
    setLoading(true);
    setError("");
    setInfo("");

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          password_confirm: formData.password_confirm,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errMsg =
          data?.email?.[0] ||
          data?.username?.[0] ||
          data?.phone?.[0] ||
          data?.password?.[0] ||
          data?.non_field_errors?.[0] ||
          data?.detail ||
          "Xatolik yuz berdi";
        setError(errMsg);
        return;
      }
      // Muvaffaqiyatli ro'yxatdan o'tildi → email tasdiqlash bosqichi
      setInfo("Emailingizga 6 raqamli kod yuborildi. Iltimos tekshiring.");
      setStep("verify");
    } catch {
      setError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  // --- VERIFY EMAIL ---
  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.VERIFY_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: parseInt(verifyCode) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || data?.detail || "Kod noto'g'ri");
        return;
      }
      // Token saqlash
      setAuthToken(data.access, data.refresh);
      localStorage.setItem(
        "honey_user",
        JSON.stringify({
          name: formData.username,
          email: formData.email,
          picture: "",
        })
      );
      onAuth();
    } catch {
      setError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIN ---
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email || formData.username, // email yoki username ham qabul qiladi
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.detail || data?.non_field_errors?.[0] || "Login yoki parol xato");
        return;
      }
      setAuthToken(data.access, data.refresh);
      const userData = {
        name: data.user?.username || formData.username,
        username: data.user?.username || formData.username,
        email: formData.email,
        picture: data.user?.avatar || "",
        is_verified: data.user?.is_verified,
        is_superuser: data.user?.is_superuser,
        is_staff: data.user?.is_staff,
      };
      localStorage.setItem("honey_user", JSON.stringify(userData));
      onAuth();
    } catch {
      setError("Server bilan aloqa o'rnatib bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  // ──── VERIFY EMAIL BOSQICHI ────
  if (step === "verify") {
    return (
      <div className="min-h-screen bg-[#030614] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden my-8">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full"></div>

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <i className="fas fa-envelope text-3xl text-emerald-400"></i>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Email Tasdiqlash
            </h2>
            <p className="text-gray-400 text-sm font-bold">
              <span className="text-emerald-400">{formData.email}</span> ga kod yuborildi
            </p>
          </div>

          {info && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <p className="text-emerald-400 text-sm font-bold text-center">{info}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-3 block">
                TASDIQLASH KODI
              </label>
              <input
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-2xl font-black text-white text-center outline-none focus:border-emerald-400/40 focus:bg-white/[0.05] transition-all tracking-[0.5em]"
                maxLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-xs font-bold text-center">{error}</p>
              </div>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || verifyCode.length < 6}
              className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[#1A1100] bg-[#FFB800]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#1A1100] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Tasdiqlash <i className="fas fa-check text-xs"></i></>
              )}
            </button>

            <button
              onClick={() => { setStep("form"); setError(""); }}
              className="w-full text-gray-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              ← Orqaga
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ──── ASOSIY FORMA ────
  return (
    <div className="min-h-screen bg-[#030614] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden my-8">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>

        {/* Sarlavha */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter mb-2">
            {mode === "register" ? "Ro'yxatdan O'tish" : "Kirish"}
          </h2>
          <p className="text-gray-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em]">
            {mode === "register"
              ? "Honey ekotizimiga qo'shiling"
              : "Hisobingizga kiring"}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 mb-8">
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === "register" ? "bg-[#FFB800] text-[#1A1100] shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Ro'yxat
          </button>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === "login" ? "bg-[#FFB800] text-[#1A1100] shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Kirish
          </button>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Register uchun username */}
          {mode === "register" && (
            <div>
              <label className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 block">
                FOYDALANUVCHI NOMI
              </label>
              <div className="relative">
                <input
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username123"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.05] transition-all"
                />
                <i className="fas fa-at absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-pink-500 font-black text-[10px] uppercase tracking-widest mb-2 block">
              EMAIL
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-pink-500/40 focus:bg-white/[0.05] transition-all"
              />
              <i className="fas fa-envelope absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
            </div>
          </div>

          {/* Register uchun telefon */}
          {mode === "register" && (
            <div>
              <label className="text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-2 block">
                TELEFON RAQAM
              </label>
              <div className="relative">
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+998901234567"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-emerald-400/40 focus:bg-white/[0.05] transition-all"
                />
                <i className="fas fa-phone absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
              </div>
            </div>
          )}

          {/* Parol */}
          <div>
            <label className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 block">
              PAROL
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Kamida 8 ta, 1 ta katta harf"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.05] transition-all"
              />
              <i className="fas fa-lock absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
            </div>
          </div>

          {/* Register uchun parol tasdiqlash */}
          {mode === "register" && (
            <div>
              <label className="text-orange-400 font-black text-[10px] uppercase tracking-widest mb-2 block">
                PAROLNI TASDIQLANG
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password_confirm}
                  onChange={(e) => setFormData({ ...formData, password_confirm: e.target.value })}
                  placeholder="Parolni qayta kiriting"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl sm:rounded-2xl px-10 sm:px-12 py-3 sm:py-4 text-sm font-bold text-white outline-none focus:border-orange-400/40 focus:bg-white/[0.05] transition-all"
                />
                <i className="fas fa-lock absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
              </div>
            </div>
          )}

          {/* Xato xabari */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400 text-xs font-bold text-center">{error}</p>
            </div>
          )}

          {/* Tugma */}
          <button
            onClick={mode === "register" ? handleRegister : handleLogin}
            disabled={loading}
            className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-honey/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-2 disabled:opacity-50 text-[#1A1100] bg-[#FFB800]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#1A1100] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {mode === "register" ? "RO'YXATDAN O'TISH" : "KIRISH"}
                <i className="fas fa-chevron-right text-xs"></i>
              </>
            )}
          </button>

          {/* Google bilan kirish */}
          <a
            href={`${API_BASE_URL || 'http://localhost:8000'}${API_ENDPOINTS.AUTH.GOOGLE}`}
            className="w-full py-4 rounded-xl border border-white/10 bg-white/[0.03] text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/[0.07] transition-all"
          >
            <i className="fab fa-google text-sm"></i>
            Google bilan kirish
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
