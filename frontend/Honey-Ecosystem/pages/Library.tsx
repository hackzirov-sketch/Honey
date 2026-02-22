
import React, { useState, useEffect } from 'react';
import { searchEducationalContent } from '../services/geminiService';

const Library: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'katalog' | 'mening-kitoblarim'>('katalog');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      const profile = JSON.parse(localStorage.getItem('honey_profile') || '{}');
      const interest = profile.interest || "Philosophy and Tech";
      const results = await searchEducationalContent(`Professional books for ${interest}`);
      
      const curated = (results.sources || []).map((src: any, i: number) => ({
        id: i,
        title: src.web?.title || `Elite Mastery Vol ${i+1}`,
        author: "Premium Muallif",
        type: i % 2 === 0 ? 'PDF' : 'AUDIO',
        img: `https://picsum.photos/600/800?random=${i + 100}`,
        description: "Ushbu premium nashr sizning dunyoqarashingizni kengaytirish uchun professional mentorlar tomonidan saralangan.",
        url: src.web?.uri || "#",
        rating: (4 + Math.random()).toFixed(1)
      }));

      setBooks(curated);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);

  const categories = ["Hammasi", "Badiiy", "Ilmiy", "Biznes", "Diniy", "Bolalar"];

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-10 pb-64 animate-fadeIn">
      {/* Search and Header Section */}
      <header className="mb-12 flex flex-col items-center">
         <div className="w-full flex flex-col md:flex-row items-center gap-4 mb-12">
            <div className="flex-1 relative w-full">
               <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"></i>
               <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="10 000+ o'zbek, rus, ingliz kitoblarni qidiring..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-honey/50 transition-all"
               />
            </div>
            <div className="flex gap-2">
               <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all">Qidirish</button>
               <button className="bg-honey text-black px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition-all">So'rash</button>
            </div>
         </div>

         <div className="flex bg-white/10 p-1.5 rounded-2xl border border-white/20 mb-12 w-full max-w-md shadow-2xl">
            <button 
               onClick={() => setActiveTab('katalog')}
               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === 'katalog' ? 'bg-honey text-black shadow-lg shadow-honey/30' : 'text-honey hover:text-white hover:bg-white/5'}`}
            >
               Katalog
            </button>
            <button 
               onClick={() => setActiveTab('mening-kitoblarim')}
               className={`flex-1 py-3 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all ${activeTab === 'mening-kitoblarim' ? 'bg-honey text-black shadow-lg shadow-honey/30' : 'text-honey hover:text-white hover:bg-white/5'}`}
            >
               Mening kitoblarim
            </button>
         </div>
      </header>

      {activeTab === 'katalog' ? (
        <>
          {/* Stories/Circles */}
          <div className="flex gap-6 overflow-x-auto pb-8 mb-12 no-scrollbar">
             {[
               { label: 'Yangi darslar', icon: 'fa-bolt', img: 'https://picsum.photos/100/100?random=1' },
               { label: 'Audio Kitoblar', icon: 'fa-headphones', img: 'https://picsum.photos/100/100?random=2' },
               { label: 'Video Kurslar', icon: 'fa-play', img: 'https://picsum.photos/100/100?random=3' },
               { label: 'Tavsiyalar', icon: 'fa-star', img: 'https://picsum.photos/100/100?random=4' },
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center gap-3 shrink-0 cursor-pointer group">
                  <div className="w-20 h-20 rounded-full p-1 border-2 border-honey shadow-[0_0_15px_rgba(255,184,0,0.3)] group-hover:scale-110 transition-all">
                     <div className="w-full h-full rounded-full overflow-hidden relative bg-black">
                        <img src={item.img} className="w-full h-full object-cover opacity-60" alt="" />
                        <i className={`fas ${item.icon} absolute inset-0 flex items-center justify-center text-honey text-xl`}></i>
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{item.label}</span>
               </div>
             ))}
          </div>

          {/* Banner */}
          <div className="w-full aspect-[21/9] md:aspect-[3/1] rounded-[3rem] bg-gradient-to-r from-orange-500 to-red-500 mb-12 p-10 flex items-center justify-between relative overflow-hidden group cursor-pointer shadow-2xl">
             <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Audio Kitoblar</h2>
                <p className="text-white/80 font-bold text-lg md:text-xl">Minglab asarlarni istalgan joyda tinglang</p>
             </div>
             <div className="w-32 h-32 md:w-48 md:h-48 bg-white/20 rounded-3xl rotate-12 flex items-center justify-center text-6xl text-white shadow-2xl animate-float-soft">
                <i className="fas fa-headphones"></i>
             </div>
             <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 blur-[100px] rounded-full"></div>
          </div>

          {/* Categories */}
          <div className="mb-12 overflow-x-auto no-scrollbar">
             <div className="flex gap-4">
                {categories.map((cat, i) => (
                  <button key={i} className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all shrink-0 ${i === 0 ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}>
                    {cat}
                  </button>
                ))}
             </div>
          </div>

          {/* Featured Book */}
          <div className="glass-premium p-10 rounded-[4rem] mb-16 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden group cursor-pointer border-white/5">
             <div className="w-48 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl rotate-[-5deg] group-hover:rotate-0 transition-all duration-700 z-10">
                <img src="https://picsum.photos/600/800?random=99" className="w-full h-full object-cover" alt="" />
             </div>
             <div className="flex-1 text-center md:text-left z-10">
                <span className="bg-honey/10 text-honey px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 inline-block">MASHHUR</span>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Atom Odatlar</h3>
                <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed mb-8 opacity-70">Kichik o'zgarishlar, g'ayrioddiy natijalar. Odatlarni shakllantirish bo'yicha dunyo bestselleri.</p>
                <button className="bg-cyan-500 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all">Batafsil o'qish</button>
             </div>
             <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-transparent"></div>
             <div className="absolute -right-20 -top-20 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full"></div>
          </div>

          {/* New Arrivals Section */}
          <div className="flex items-center justify-between mb-12 px-2">
             <div className="flex items-center gap-4 text-honey">
                <i className="fas fa-bolt text-2xl animate-pulse"></i>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Yangi kelganlar</h2>
             </div>
             <button className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:underline">Barchasini ko'rish</button>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
               <div className="w-16 h-16 border-4 border-honey border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {books.map((book) => (
                <div key={book.id} onClick={() => setSelectedBook(book)} className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 glass-premium relative group-hover:scale-[1.03] transition-all duration-700 shadow-2xl bg-white/5">
                     <img src={book.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={book.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                     <div className="absolute top-4 right-4 bg-honey text-black px-3 py-1 rounded-lg text-[8px] font-black uppercase">YANGI</div>
                     <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <i className="fas fa-star text-honey text-[10px]"></i>
                        <span className="text-[10px] font-black text-white">{book.rating}</span>
                     </div>
                  </div>
                  <h4 className="font-black text-lg text-white group-hover:text-honey transition-colors uppercase tracking-tight truncate px-1 leading-tight">{book.title}</h4>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2 px-1 opacity-60">{book.author}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="py-32 text-center glass-premium rounded-[4rem] border-white/5">
           <i className="fas fa-book-open text-6xl text-honey/20 mb-10"></i>
           <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Sizning kutubxonangiz bo'sh</h2>
           <p className="text-gray-500 font-bold text-lg mb-10">Katalogdan o'zingizga yoqqan kitoblarni qo'shing va o'qishni boshlang.</p>
           <button onClick={() => setActiveTab('katalog')} className="btn-premium px-12 py-5 uppercase tracking-widest text-xs">Katalogni ko'rish</button>
        </div>
      )}

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-fadeIn">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedBook(null)}></div>
           <div className="max-w-5xl w-full glass-premium p-10 lg:p-16 rounded-[4rem] relative z-10 flex flex-col lg:flex-row gap-16 overflow-hidden border-white/10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-honey to-transparent"></div>
              <div className="w-full lg:w-96 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                 <img src={selectedBook.img} className="w-full h-full object-cover" alt={selectedBook.title} />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                 <span className="text-honey font-black text-[10px] tracking-[0.5em] uppercase mb-6 block">{selectedBook.type} NASHR</span>
                 <h2 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">{selectedBook.title}</h2>
                 <p className="text-gray-400 text-xl leading-relaxed font-bold opacity-70 mb-12">{selectedBook.description}</p>
                 <div className="flex flex-wrap gap-6">
                    <a href={selectedBook.url} target="_blank" rel="noreferrer" className="bg-honey text-black font-black px-12 py-6 rounded-2xl flex items-center gap-6 shadow-xl hover:scale-105 transition-all">
                       <i className={`fas ${selectedBook.type === 'AUDIO' ? 'fa-play' : 'fa-book-open'}`}></i>
                       HOZIROQ O'QISH
                    </a>
                    <button onClick={() => setSelectedBook(null)} className="glass-premium px-12 py-6 rounded-2xl text-white font-bold hover:bg-white/5">YOPISH</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Library;
