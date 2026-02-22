import React, { useState, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';

interface Book {
   id: string;
   title: string;
   author: string;
   description: string;
   genre?: { name: string };
   category?: { name: string };
   image?: string;
   youtube_url?: string;
   library_url?: string;
   file?: string;
   is_premium?: boolean;
   avg_rating?: number;
   year?: number;
   language?: string;
   pages?: number;
}

interface UserBook {
   id: string;
   book: Book;
   downloaded_at: string;
   is_read: boolean;
}

const Library: React.FC = () => {
   const user = JSON.parse(localStorage.getItem('honey_user') || 'null');
   const [books, setBooks] = useState<Book[]>([]);
   const [userBooks, setUserBooks] = useState<UserBook[]>([]);
   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [selectedBook, setSelectedBook] = useState<Book | null>(null);
   const [activeTab, setActiveTab] = useState<'katalog' | 'mening-kitoblarim'>('katalog');
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
   const [actionLoading, setActionLoading] = useState<string | null>(null);

   const authHeaders = () => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
   });

   // Kategoriyalar
   useEffect(() => {
      if (!user) return;
      fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.CATEGORIES}`, { headers: authHeaders() })
         .then(r => r.ok ? r.json() : [])
         .then(data => setCategories(data.results || data))
         .catch(() => { });
   }, []);

   // Kitoblar
   const fetchBooks = async (search = '', catId: number | null = null) => {
      setIsLoading(true);
      try {
         let url = `${API_BASE_URL}${API_ENDPOINTS.LIBRARY.BOOKS}`;
         const params = new URLSearchParams();
         if (search) params.append('search', search);
         if (catId) params.append('category', String(catId));
         if (params.toString()) url += `?${params.toString()}`;

         const res = await fetch(url, { headers: authHeaders() });
         if (res.ok) {
            const data = await res.json();
            setBooks(data.results || data);
         }
      } catch { /* offline */ } finally {
         setIsLoading(false);
      }
   };

   // Mening kitoblarim
   const fetchUserBooks = async () => {
      try {
         const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.USER_BOOKS}`, { headers: authHeaders() });
         if (res.ok) {
            const data = await res.json();
            setUserBooks(data.results || data);
         }
      } catch { /* offline */ }
   };

   useEffect(() => {
      if (!user) return;
      fetchBooks();
      fetchUserBooks();
   }, []);

   const handleSearch = () => fetchBooks(searchTerm, selectedCategory);

   const handleCategoryFilter = (catId: number | null) => {
      setSelectedCategory(catId);
      fetchBooks(searchTerm, catId);
   };

   // Kitob yuklab olish
   const handleDownload = async (bookId: string) => {
      setActionLoading(bookId);
      try {
         const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.DOWNLOAD}`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ book_id: bookId }),
         });
         if (res.ok) {
            await fetchUserBooks();
            alert("Kitob mening kitoblarimga qo'shildi!");
         } else {
            const d = await res.json();
            alert(d.detail || d.message || "Xatolik yuz berdi");
         }
      } catch { alert("Server bilan aloqa yo'q"); } finally {
         setActionLoading(null);
      }
   };

   // Kitob o'chirish
   const handleRemove = async (userBookId: string) => {
      setActionLoading(userBookId);
      try {
         const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.LIBRARY.REMOVE(userBookId)}`, {
            method: 'DELETE',
            headers: authHeaders(),
         });
         if (res.ok || res.status === 204) {
            setUserBooks(prev => prev.filter(ub => ub.id !== userBookId));
         }
      } catch { alert("Server bilan aloqa yo'q"); } finally {
         setActionLoading(null);
      }
   };

   const isInMyBooks = (bookId: string) => userBooks.some(ub => ub.book.id === bookId);

   if (!user) {
      return (
         <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn pb-64">
            <div className="w-32 h-32 bg-honey/10 rounded-[3rem] border border-honey/20 flex items-center justify-center text-5xl text-honey animate-float-soft">
               <i className="fas fa-book-atlas"></i>
            </div>
            <div className="max-w-3xl space-y-6">
               <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Prism Kutubxonasi</h1>
               <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
                  Dunyodagi eng sara bilimlar to'plami bitta ekotizimda.
                  Minglab kitoblar, audio darsliklar va noyob qo'llanmalar sizni kutmoqda.
               </p>
               <div className="pt-12">
                  <a href="#/auth" className="bg-honey text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all inline-block">
                     KUTUBXONANI OCHISH
                  </a>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="max-w-screen-xl mx-auto px-4 lg:px-10 pb-64 animate-fadeIn">
         {/* Header */}
         <header className="mb-12 flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row items-center gap-4 mb-12">
               <div className="flex-1 relative w-full">
                  <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"></i>
                  <input
                     type="text"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                     placeholder="Kitob nomi yoki muallif bo'yicha qidiring..."
                     className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:border-honey/50 transition-all"
                  />
               </div>
               <div className="flex gap-2">
                  {(user?.is_superuser || user?.is_staff || user?.username === 'admin') && (
                     <a
                        href="#/admin"
                        className="glass-btn hover:bg-honey hover:text-black text-white md:text-inherit px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all flex items-center gap-2"
                     >
                        <i className="fas fa-plus"></i> KITOB YUKLASH
                     </a>
                  )}
                  <button
                     onClick={handleSearch}
                     className="glass-btn hover:bg-white/10 text-white md:text-inherit px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all"
                  >
                     Qidirish
                  </button>
               </div>
            </div>

            {/* Tablar */}
            <div className="flex bg-white/10 p-1 rounded-xl sm:rounded-2xl border border-white/20 mb-12 w-full max-w-md shadow-2xl">
               <button
                  onClick={() => setActiveTab('katalog')}
                  className={`flex-1 py-2 sm:py-3 text-[8px] sm:text-[10px] font-black uppercase tracking-wider rounded-lg sm:rounded-xl transition-all ${activeTab === 'katalog' ? 'bg-honey text-white shadow-lg shadow-honey/30' : 'text-honey hover:text-white hover:bg-white/5'}`}
               >
                  Katalog
               </button>
               <button
                  onClick={() => setActiveTab('mening-kitoblarim')}
                  className={`flex-1 py-2 sm:py-3 text-[8px] sm:text-[10px] font-black uppercase tracking-wider rounded-lg sm:rounded-xl transition-all ${activeTab === 'mening-kitoblarim' ? 'bg-honey text-white shadow-lg shadow-honey/30' : 'text-honey hover:text-white hover:bg-white/5'}`}
               >
                  Mening kitoblarim ({userBooks.length})
               </button>
            </div>
         </header>

         {activeTab === 'katalog' ? (
            <>
               {/* Kategoriyalar */}
               <div className="mb-12 overflow-x-auto no-scrollbar">
                  <div className="flex gap-4">
                     <button
                        onClick={() => handleCategoryFilter(null)}
                        className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all shrink-0 ${selectedCategory === null ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                     >
                        Hammasi
                     </button>
                     {categories.map((cat) => (
                        <button
                           key={cat.id}
                           onClick={() => handleCategoryFilter(cat.id)}
                           className={`px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest border transition-all shrink-0 ${selectedCategory === cat.id ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]' : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'}`}
                        >
                           {cat.name}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Kitoblar grid */}
               {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-32">
                     <div className="w-16 h-16 border-4 border-honey border-t-transparent rounded-full animate-spin"></div>
                     <p className="text-gray-400 mt-6 font-bold uppercase tracking-widest text-xs">Kitoblar yuklanmoqda...</p>
                  </div>
               ) : books.length === 0 ? (
                  <div className="py-32 text-center glass-premium rounded-[4rem] border-white/5">
                     <i className="fas fa-book text-6xl text-honey/20 mb-10"></i>
                     <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Kitob topilmadi</h2>
                     <p className="text-gray-500 font-bold mb-10">Boshqa kalit so'z bilan qidiring yoki barcha kitoblarni ko'ring.</p>
                     <button onClick={() => { setSearchTerm(''); fetchBooks(); }} className="bg-honey text-white px-12 py-5 uppercase tracking-widest text-xs rounded-2xl font-black">
                        Barchasini ko'rish
                     </button>
                  </div>
               ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                     {books.map((book) => (
                        <div key={book.id} onClick={() => setSelectedBook(book)} className="group cursor-pointer">
                           <div className="aspect-[3/4] rounded-2xl sm:rounded-[2.5rem] overflow-hidden mb-3 md:mb-6 glass-premium relative group-hover:scale-[1.03] transition-all duration-700 shadow-2xl bg-white/5">
                              {book.image ? (
                                 <img src={book.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={book.title} />
                              ) : (
                                 <div className="w-full h-full flex items-center justify-center">
                                    <i className="fas fa-book text-4xl text-honey/30"></i>
                                 </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                              {isInMyBooks(book.id) && (
                                 <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-emerald-500 text-white px-2 md:px-3 py-0.5 rounded-md text-[6px] md:text-[8px] font-black uppercase">
                                    <i className="fas fa-check mr-1"></i>Saqlangan
                                 </div>
                              )}
                              <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-honey text-white px-2 md:px-3 py-0.5 rounded-md text-[6px] md:text-[8px] font-black uppercase">
                                 {book.genre?.name || 'Kitob'}
                              </div>
                              {book.avg_rating && (
                                 <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex items-center gap-1 md:gap-2">
                                    <i className="fas fa-star text-honey text-[8px] md:text-[10px]"></i>
                                    <span className="text-[8px] md:text-[10px] font-black text-white">{book.avg_rating.toFixed(1)}</span>
                                 </div>
                              )}
                           </div>
                           <h4 className="font-black text-xs md:text-lg text-white group-hover:text-honey transition-colors uppercase tracking-tight truncate px-1 leading-tight">{book.title}</h4>
                           <p className="text-gray-500 text-[7px] md:text-[10px] font-black uppercase tracking-widest mt-1 md:mt-2 px-1 opacity-60">{book.author}</p>
                        </div>
                     ))}
                  </div>
               )}
            </>
         ) : (
            // Mening kitoblarim
            userBooks.length === 0 ? (
               <div className="py-32 text-center glass-premium rounded-[4rem] border-white/5">
                  <i className="fas fa-book-open text-6xl text-honey/20 mb-10"></i>
                  <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Sizning kutubxonangiz bo'sh</h2>
                  <p className="text-gray-500 font-bold text-lg mb-10">Katalogdan o'zingizga yoqqan kitoblarni qo'shing va o'qishni boshlang.</p>
                  <button onClick={() => setActiveTab('katalog')} className="bg-honey text-white px-12 py-5 uppercase tracking-widest text-xs rounded-2xl font-black">
                     Katalogni ko'rish
                  </button>
               </div>
            ) : (
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                  {userBooks.map((ub) => (
                     <div key={ub.id} className="group cursor-pointer">
                        <div className="aspect-[3/4] rounded-2xl sm:rounded-[2.5rem] overflow-hidden mb-3 glass-premium relative shadow-2xl bg-white/5">
                           {ub.book.image ? (
                              <img
                                 src={ub.book.image}
                                 className="w-full h-full object-cover opacity-80 cursor-pointer"
                                 alt={ub.book.title}
                                 onClick={() => setSelectedBook(ub.book)}
                              />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center" onClick={() => setSelectedBook(ub.book)}>
                                 <i className="fas fa-book text-4xl text-honey/30"></i>
                              </div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute bottom-2 left-2 right-2">
                              <button
                                 onClick={() => handleRemove(ub.id)}
                                 disabled={actionLoading === ub.id}
                                 className="w-full py-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest transition-all"
                              >
                                 {actionLoading === ub.id ? (
                                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                 ) : (
                                    <><i className="fas fa-trash mr-1"></i>O'chirish</>
                                 )}
                              </button>
                           </div>
                        </div>
                        <h4 className="font-black text-xs text-white uppercase tracking-tight truncate px-1">{ub.book.title}</h4>
                        <p className="text-gray-500 text-[7px] font-black uppercase mt-1 px-1 opacity-60">{ub.book.author}</p>
                     </div>
                  ))}
               </div>
            )
         )}

         {/* Modal */}
         {selectedBook && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
               <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedBook(null)}></div>
               <div className="max-w-5xl w-full glass-premium p-6 sm:p-10 lg:p-16 rounded-[2rem] sm:rounded-[4rem] relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16 overflow-y-auto max-h-[90vh] border-white/10 no-scrollbar">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-honey to-transparent"></div>

                  <div className="w-full lg:w-96 aspect-[3/4] rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 shrink-0 bg-white/5">
                     {selectedBook.image ? (
                        <img src={selectedBook.image} className="w-full h-full object-cover" alt={selectedBook.title} />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center">
                           <i className="fas fa-book text-6xl text-honey/30"></i>
                        </div>
                     )}
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                     <span className="text-honey font-black text-[8px] sm:text-[10px] tracking-[0.5em] uppercase mb-4 lg:mb-6 block">
                        {selectedBook.genre?.name || selectedBook.category?.name || 'KITOB'}
                     </span>
                     <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 lg:mb-8 leading-tight">
                        {selectedBook.title}
                     </h2>
                     <p className="text-gray-400 text-sm font-bold mb-2">
                        <span className="text-white">Muallif:</span> {selectedBook.author}
                     </p>
                     {selectedBook.year && (
                        <p className="text-gray-400 text-sm font-bold mb-2">
                           <span className="text-white">Yil:</span> {selectedBook.year} · <span className="text-white">Sahifalar:</span> {selectedBook.pages}
                        </p>
                     )}
                     <p className="text-gray-400 text-base leading-relaxed font-bold opacity-70 mb-8 lg:mb-12 mt-4">
                        {selectedBook.description || 'Tavsif mavjud emas.'}
                     </p>

                     <div className="flex flex-wrap gap-4 lg:gap-6 mt-auto">
                        {/* Yuklab olish / O'chirish tugmasi */}
                        {isInMyBooks(selectedBook.id) ? (
                           <button
                              onClick={() => {
                                 const ub = userBooks.find(u => u.book.id === selectedBook.id);
                                 if (ub) handleRemove(ub.id);
                              }}
                              disabled={!!actionLoading}
                              className="flex-1 sm:flex-none bg-red-500 text-white font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all text-[10px] sm:text-xs disabled:opacity-50"
                           >
                              <i className="fas fa-trash"></i>
                              KUTUBXONADAN O'CHIRISH
                           </button>
                        ) : (
                           <button
                              onClick={() => handleDownload(selectedBook.id)}
                              disabled={!!actionLoading}
                              className="flex-1 sm:flex-none bg-honey text-white font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all text-[10px] sm:text-xs disabled:opacity-50"
                           >
                              {actionLoading === selectedBook.id ? (
                                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                 <><i className="fas fa-download"></i> KUTUBXONAGA QO'SHISH</>
                              )}
                           </button>
                        )}

                        {/* O'qish/ko'rish havolasi */}
                        {(selectedBook.library_url || selectedBook.file) && (
                           <a
                              href={selectedBook.file || selectedBook.library_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 sm:flex-none bg-cyan-500 text-black font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all text-[10px] sm:text-xs"
                           >
                              <i className="fas fa-book-open"></i> O'QISH
                           </a>
                        )}

                        {selectedBook.youtube_url && (
                           <a
                              href={selectedBook.youtube_url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 sm:flex-none bg-red-600 text-white font-black px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all text-[10px] sm:text-xs"
                           >
                              <i className="fab fa-youtube"></i> VIDEO
                           </a>
                        )}

                        <button
                           onClick={() => setSelectedBook(null)}
                           className="flex-1 sm:flex-none glass-premium px-6 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-white font-bold hover:bg-white/5 text-[10px] sm:text-xs"
                        >
                           YOPISH
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Library;
