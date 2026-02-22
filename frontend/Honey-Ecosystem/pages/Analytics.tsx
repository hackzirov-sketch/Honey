
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Du', usage: 40, learning: 24, media: 24 },
  { name: 'Se', usage: 30, learning: 13, media: 22 },
  { name: 'Ch', usage: 60, learning: 98, media: 22 },
  { name: 'Pa', usage: 45, learning: 39, media: 20 },
  { name: 'Ju', usage: 55, learning: 48, media: 21 },
  { name: 'Sh', usage: 80, learning: 38, media: 25 },
  { name: 'Ya', usage: 70, learning: 43, media: 21 },
];

const Analytics: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-16">
        <div className="inline-flex items-center space-x-3 text-honey mb-4">
           <i className="fas fa-chart-line"></i>
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Advanced Data Analytics</span>
        </div>
        <h1 className="text-5xl font-black mb-6 tracking-tighter">Data-Driven Ecosystem</h1>
        <p className="text-gray-400 max-w-2xl text-lg font-bold opacity-80">Honey — bu birinchi raqamli platforma, bu yerda har bir harakatingiz sizni rivojlantirish uchun tahlil qilinadi.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
        {/* User Stats Card */}
        <div className="glass p-12 rounded-[3.5rem] border-honey/10 relative overflow-hidden group">
           <div className="absolute -right-20 -top-20 w-48 h-48 bg-honey/5 blur-[80px] rounded-full group-hover:bg-honey/10 transition-all"></div>
           <h2 className="text-2xl font-black mb-10 text-honey uppercase tracking-widest">Shaxsiy O'sish</h2>
           
           <div className="space-y-8">
             {[
               { val: '78%', label: 'Faol muloqot vaqti', color: 'bg-blue-500' },
               { val: '45%', label: 'Foydali kontent', color: 'bg-honey' },
               { val: '92%', label: 'Rivojlanish dinamikasi', color: 'bg-emerald-500' }
             ].map((item, i) => (
               <div key={i} className="group/stat cursor-default">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{item.label}</span>
                     <span className="text-2xl font-black">{item.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${item.color} rounded-full group-hover/stat:scale-x-105 origin-left transition-transform`} style={{ width: item.val }}></div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Admin/Analytics Chart */}
        <div className="lg:col-span-2 glass p-12 rounded-[3.5rem] border-honey/10 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-xl font-black uppercase tracking-widest">Guruh faolligi</h3>
               <p className="text-[10px] text-honey font-black uppercase tracking-[0.3em] mt-1">Jonli Yangilanish</p>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  <span className="text-[10px] font-black text-gray-500">MULOQOT</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-honey rounded-full"></span>
                  <span className="text-[10px] font-black text-gray-500">TA'LIM</span>
               </div>
            </div>
          </div>
          <div className="flex-1 min-h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLearning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB800" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FFB800" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                <YAxis stroke="#475569" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ background: '#050505', border: '1px solid rgba(255,184,0,0.2)', borderRadius: '16px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={4} />
                <Area type="monotone" dataKey="learning" stroke="#FFB800" fillOpacity={1} fill="url(#colorLearning)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-10 bg-honey/5 p-8 rounded-[2.5rem] border border-honey/10">
            <p className="text-sm font-bold leading-relaxed text-gray-300">
              <i className="fas fa-magic mr-3 text-honey"></i>
              AI Insight: Sizning faolligingiz hafta oxirida yuqori bo'lmoqda. Najot Ta'lim videolari haftalik o'sishga 34% ko'proq ta'sir qildi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
