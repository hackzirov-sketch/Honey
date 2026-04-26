
import React, { useState, useEffect } from 'react';
import { searchEducationalContent } from '../services/geminiService';

interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: Date;
}

interface Video {
  id: string;
  title: string;
  channel: string;
  url: string;
  embedUrl: string;
  img: string;
  duration: string;
  likes: number;
  rating: number;
  description: string;
  source: string;
}

const Media: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userInteractions, setUserInteractions] = useState<Record<string, { liked: boolean, rating: number, comments: Comment[] }>>({});
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const savedVideos = localStorage.getItem('honey_media_cache');
    const savedInteractions = localStorage.getItem('honey_user_interactions');
    
    if (savedInteractions) setUserInteractions(JSON.parse(savedInteractions));
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      fetchVideos();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('honey_user_interactions', JSON.stringify(userInteractions));
  }, [userInteractions]);

  const fetchVideos = async () => {
    setIsLoading(true);
    const profile = JSON.parse(localStorage.getItem('honey_profile') || '{}');
    const interest = profile.interest || "Business and Technology";
    
    const query = `YouTube educational tutorials about ${interest}. High quality lessons only.`;
    const results = await searchEducationalContent(query);
    
    const curated: Video[] = (results.sources || []).map((src: any, i: number) => {
      const originalUrl = src.web?.uri || "https://youtube.com/watch?v=dQw4w9WgXcQ";
      let videoId = "";
      if (originalUrl.includes("v=")) videoId = originalUrl.split("v=")[1].split("&")[0];
      else if (originalUrl.includes("be/")) videoId = originalUrl.split("be/")[1];

      return {
        id: `v-${i}`,
        title: src.web?.title || `${interest} Lesson ${i+1}`,
        channel: "Honey Academy",
        url: originalUrl,
        embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : "",
        img: `https://picsum.photos/1280/720?random=${i + 500}`,
        duration: "14:20",
        likes: Math.floor(Math.random() * 800) + 200,
        rating: 4.9,
        description: (results.text && results.text.split('\n')[0]) || "Ushbu premium darslik sizning bilimingizni yangi bosqichga olib chiqadi.",
        source: src.web?.uri || "YouTube"
      };
    });

    setVideos(curated);
    localStorage.setItem('honey_media_cache', JSON.stringify(curated));
    setIsLoading(false);
  };

  const handleLike = (id: string) => {
    setUserInteractions(prev => {
      const current = prev[id] || { liked: false, rating: 0, comments: [] };
      return {
        ...prev,
        [id]: { ...current, liked: !current.liked }
      };
    });
  };

  const addComment = (id: string) => {
    if (!commentInput.trim()) return;
    const user = JSON.parse(localStorage.getItem('honey_user') || '{"name": "Mehmon"}');
    const newComment: Comment = {
      id: Date.now().toString(),
      userName: user.name,
      text: commentInput,
      timestamp: new Date()
    };
    setUserInteractions(prev => {
      const current = prev[id] || { liked: false, rating: 0, comments: [] };
      return {
        ...prev,
        [id]: { ...current, comments: [newComment, ...(current.comments || [])] }
      };
    });
    setCommentInput('');
  };

  if (selectedVideo) {
    const interaction = userInteractions[selectedVideo.id] || { liked: false, rating: 0, comments: [] };
    return (
      <div className="container mx-auto px-6 py-12 animate-fadeIn pb-64">
        <button onClick={() => setSelectedVideo(null)} className="flex items-center gap-4 text-honey font-black uppercase tracking-widest mb-10 hover:translate-x-2 transition-transform drop-shadow-[0_0_8px_#FFB800]">
          <i className="fas fa-arrow-left"></i> KUTUBXONAGA QAYTISH
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
             <div className="aspect-video w-full rounded-[4rem] border-[10px] border-honey/10 overflow-hidden shadow-[0_0_120px_rgba(255,184,0,0.15)] bg-black relative group">
               <div className="absolute inset-0 border border-honey/40 rounded-[4rem] z-10 pointer-events-none"></div>
               {selectedVideo.embedUrl ? (
                 <iframe title={selectedVideo.title} src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`} className="w-full h-full relative z-0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <i className="fas fa-play-circle text-8xl text-honey/20"></i>
                    <p className="text-gray-500 font-black">Video formatida xatolik</p>
                 </div>
               )}
             </div>

             <div className="glass p-12 rounded-[4rem] border border-honey/20 shadow-[0_0_40px_rgba(255,184,0,0.05)]">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
                   <h1 className="text-4xl font-black text-white leading-tight uppercase tracking-tighter">{selectedVideo.title}</h1>
                   <button 
                      onClick={() => handleLike(selectedVideo.id)}
                      className={`flex items-center gap-4 px-10 py-6 rounded-3xl font-black transition-all border-2 shrink-0 ${interaction.liked ? 'bg-honey text-[#1A1100] border-honey shadow-[0_0_50px_rgba(255,184,0,0.6)]' : 'bg-white/5 text-honey border-honey/30 hover:border-honey/60'}`}
                    >
                      <i className={`fas fa-heart text-2xl ${interaction.liked ? 'scale-125 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]' : ''}`}></i>
                      {selectedVideo.likes + (interaction.liked ? 1 : 0)}
                    </button>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/5">
                   <h3 className="text-honey font-black uppercase tracking-widest text-[10px]">Premium Kurs Tafsifi</h3>
                   <p className="text-gray-300 text-xl leading-relaxed font-bold opacity-80">{selectedVideo.description}</p>
                </div>
             </div>

             {/* Comment Section */}
             <div className="glass p-12 rounded-[4rem] border border-white/10 space-y-12 shadow-inner">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Fikr-mulohazalar ({interaction.comments?.length || 0})</h3>
                <div className="flex gap-6 bg-white/5 p-4 rounded-[2.5rem] border border-white/10 focus-within:border-honey/50 transition-all">
                   <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="O'z fikringizni bildiring..." 
                    className="flex-1 bg-transparent border-none outline-none text-white font-bold px-4" />
                   <button onClick={() => addComment(selectedVideo.id)} className="btn-honey-neon px-12 py-5 rounded-2xl font-black shadow-[0_0_20px_rgba(255,184,0,0.3)]">YUBORISH</button>
                </div>
                <div className="space-y-10 custom-scrollbar max-h-[500px] overflow-y-auto pr-4">
                   {interaction.comments?.length === 0 ? (
                     <p className="text-center text-gray-500 font-bold uppercase tracking-widest text-xs py-10">Hozircha fikrlar mavjud emas. Birinchi bo'lib fikr bildiring!</p>
                   ) : (
                     interaction.comments?.map((c, i) => (
                       <div key={i} className="flex gap-6 animate-fadeIn p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                          <div className="w-14 h-14 rounded-2xl bg-honey/10 flex items-center justify-center text-honey font-black border border-honey/20 shrink-0 shadow-inner">
                             {c.userName[0]}
                          </div>
                          <div>
                             <div className="flex items-center gap-4 mb-2">
                                <h5 className="font-black text-white text-sm uppercase tracking-tight">{c.userName}</h5>
                                <span className="text-[10px] text-gray-600 font-black">{new Date(c.timestamp).toLocaleTimeString()}</span>
                             </div>
                             <p className="text-gray-400 font-medium leading-relaxed">{c.text}</p>
                          </div>
                       </div>
                     ))
                   )}
                </div>
             </div>
          </div>

          <div className="space-y-10">
             <div className="glass p-10 rounded-[3.5rem] border border-honey/20 sticky top-32 shadow-[0_0_40px_rgba(255,184,0,0.05)]">
                <h4 className="text-honey font-black uppercase tracking-widest text-[10px] mb-12 text-center">Tavsiya etiladigan darslar</h4>
                <div className="space-y-10">
                   {videos.filter(v => v.id !== selectedVideo.id).slice(0, 6).map(v => (
                     <div key={v.id} onClick={() => setSelectedVideo(v)} className="flex gap-5 group cursor-pointer hover:scale-105 transition-all">
                        <div className="w-32 aspect-video rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-lg group-hover:border-honey transition-all">
                           <img src={v.img} className="w-full h-full object-cover" alt={v.title} />
                        </div>
                        <div className="text-left py-1">
                           <h5 className="font-black text-[12px] text-white uppercase line-clamp-2 leading-tight group-hover:text-honey transition-colors">{v.title}</h5>
                           <p className="text-[9px] text-gray-600 font-black mt-2 uppercase tracking-widest">HONEY ACADEMY</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 animate-fadeIn pb-32 md:pb-64">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-24 gap-8 md:gap-12 text-center md:text-left relative">
        <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-32 md:w-64 h-32 md:h-64 bg-honey/10 blur-[60px] md:blur-[100px] rounded-full -z-10 animate-pulse"></div>
        <div className="w-full md:w-auto">
           <div className="inline-flex items-center space-x-3 md:space-x-4 text-honey mb-4 md:mb-6 bg-honey/5 px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-honey/20">
              <i className="fas fa-play-circle text-xl md:text-2xl animate-spin-slow drop-shadow-[0_0_15px_#FFB800]"></i>
              <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">Jonli Darslar & Stream</span>
           </div>
           <h1 className="text-4xl md:text-6xl lg:text-9xl font-black honey-glow-text tracking-tighter uppercase leading-none">STREAMING<br/>STUDIO</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-end">
          <button className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest animate-pulse flex items-center gap-2 md:gap-3 justify-center">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></span> JONLI EFIRDA
          </button>
          <button onClick={fetchVideos} className="btn-premium px-8 md:px-12 py-4 md:py-7 text-[10px] md:text-[12px] tracking-widest font-black uppercase shadow-[0_0_40px_rgba(255,184,0,0.3)] hover-elevate">
             YANGILASH <i className="fas fa-sync-alt ml-3 md:ml-4 group-hover:rotate-180 transition-transform duration-700"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Featured Live Stream */}
        <div className="lg:col-span-3 space-y-6 md:space-y-8">
          <div className="aspect-video bg-black rounded-2xl md:rounded-[4rem] border border-white/10 overflow-hidden relative shadow-2xl group">
             <img src="https://images.unsplash.com/photo-1587620498328-539580442651?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" alt="Main Stream" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             <div className="absolute top-4 md:top-10 left-4 md:left-10 flex gap-2 md:gap-4">
                <span className="bg-red-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest">Live</span>
                <span className="bg-black/60 backdrop-blur-md text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest flex items-center gap-1 md:gap-2">
                   <i className="fas fa-eye text-honey"></i> 4.2K
                </span>
             </div>
             <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12">
                <h2 className="text-xl md:text-4xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-2 md:mb-4 leading-tight line-clamp-2">Yangi Avlod Dizayn: 3D UI & UX Sirlari</h2>
                <div className="flex items-center gap-4 md:gap-6">
                   <div className="flex items-center gap-2 md:gap-3">
                      <img src="https://i.pravatar.cc/150?u=mentor" className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-honey" alt="Mentor" />
                      <span className="text-honey font-black text-[8px] md:text-[10px] uppercase tracking-widest truncate max-w-[100px] md:max-w-none">Ulug'bek Mentor</span>
                   </div>
                   <div className="h-3 md:h-4 w-px bg-white/20"></div>
                   <span className="text-gray-400 font-black text-[8px] md:text-[10px] uppercase tracking-widest truncate max-w-[100px] md:max-w-none">Dizayn Akademiyasi</span>
                </div>
             </div>
          </div>
        </div>

        {/* Stream Queue */}
        <div className="space-y-6 md:space-y-8 h-full">
           <h3 className="text-[9px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 md:mb-4">Navbatdagi Darslar</h3>
           <div className="space-y-4 md:space-y-6 overflow-y-auto max-h-[400px] lg:max-h-[600px] pr-2 md:pr-4 custom-scrollbar">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex flex-row lg:flex-col gap-4 group cursor-pointer">
                   <div className="w-1/3 lg:w-full aspect-video rounded-xl md:rounded-3xl overflow-hidden border border-white/10 relative shrink-0">
                      <img src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&u=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="Queue" />
                      <div className="absolute bottom-1 md:bottom-2 right-1 md:right-2 bg-black/80 px-1.5 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg text-[6px] md:text-[8px] font-black text-white uppercase">45:00</div>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-[10px] md:text-sm font-black text-white uppercase tracking-tight group-hover:text-honey transition-colors truncate lg:whitespace-normal">Dars {i}: Kelajak Texnologiyalari</h4>
                      <p className="text-[7px] md:text-[9px] text-gray-600 font-bold uppercase mt-0.5 md:mt-1">Soat 18:00 da boshlanadi</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
