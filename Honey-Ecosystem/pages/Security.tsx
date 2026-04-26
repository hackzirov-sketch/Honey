
import React from 'react';

const Security: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="text-center mb-20">
        <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center text-4xl text-blue-500 mx-auto mb-8 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.3)]">
          <i className="fas fa-shield-halved"></i>
        </div>
        <h1 className="text-5xl font-bold mb-6">Xavfsizlik va ishonch: Sizning ma'lumotlaringiz himoyalangan</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Zamonaviy raqamli dunyoda xavfsizlik — bu birinchi o'rinda turishi kerak bo'lgan narsa. Honey foydalanuvchilarning shaxsiy ma'lumotlari va suhbatlarini eng yuqori darajada himoya qiladi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/50 transition-all">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-3xl text-blue-500"><i className="fas fa-lock"></i></div>
            <h3 className="text-2xl font-bold">2 bosqichli himoya</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            Ikki faktorli autentifikatsiya orqali hisobingiz maksimal darajada himoyalangan. Parol va telefon orqali tasdiqlash — ikki qavatli xavfsizlik.
          </p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/50 transition-all">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-3xl text-blue-500"><i className="fas fa-shield-virus"></i></div>
            <h3 className="text-2xl font-bold">End-to-end shifrlash</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            Barcha shaxsiy suhbatlar to'liq shifrlangan — faqat siz va suhbatdoshingiz o'qiy oladi. Hatto Honey ham sizning xabarlaringizni ko'ra olmaydi.
          </p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/50 transition-all">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-3xl text-green-500"><i className="fas fa-user-check"></i></div>
            <h3 className="text-2xl font-bold">Profil verifikatsiyasi</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            Haqiqiy foydalanuvchilarni soxta profillardan ajratish uchun verifikatsiya tizimi. Ishonchli muloqot muhitini yaratamiz.
          </p>
        </div>

        <div className="glass p-10 rounded-[2.5rem] border border-white/10 hover:border-blue-500/50 transition-all">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-3xl text-red-500"><i className="fas fa-robot"></i></div>
            <h3 className="text-2xl font-bold">AI spam filtri</h3>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg">
            Sun'iy intellekt spam, firibgarlik va keraksiz xabarlarni avtomatik aniqlaydi va bloklaydi. Toza va xavfsiz muhit.
          </p>
        </div>
      </div>

      <div className="glass p-12 rounded-[3rem] border border-white/10 bg-gradient-to-br from-blue-600/5 to-transparent relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4">Telegram'dan asosiy farq:</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Telegram'da spam botlar va scam ko'p uchraydi. Honey'da AI doimiy nazorat qiladi — kam spam, kam bot, kam firibgarlik, ko'proq ishonch va xotirjamlik.
            </p>
          </div>
          <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10">
            <p className="italic text-gray-300">
              "Sizning shaxsiy ma'lumotlaringiz, suhbatlaringiz va kontentingiz Honey'da xavfsiz. Biz xavfsizlikni jiddiy qabul qilamiz, chunki ishonch — bu har qanday munosabatning asosi."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
