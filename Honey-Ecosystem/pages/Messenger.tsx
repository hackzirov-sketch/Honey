import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const chats = [
    { id: 'ai', name: 'Honey AI Assistant', lastMsg: 'Sizga qanday yordam bera olaman?', time: '12:45', online: true, unread: 0, avatar: 'https://i.pravatar.cc/150?u=ai' },
    { id: 'team', name: 'Premium Community', lastMsg: 'Ertangi dars soat nechada?', time: '11:20', online: true, unread: 12, avatar: 'https://i.pravatar.cc/150?u=team' },
    { id: 'mentor', name: 'Ulug\'bek Mentor', lastMsg: 'Vazifani tekshirdim, juda yaxshi!', time: 'Kecha', online: false, unread: 1, avatar: 'https://i.pravatar.cc/150?u=mentor' },
    { id: 'announcements', name: "E'lonlar & Yangiliklar", lastMsg: 'Yangi dars yuklandi!', time: 'Dush', online: true, unread: 0, avatar: 'https://i.pravatar.cc/150?u=ann' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('honey_chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || activeChat !== 'ai') return;
    
    const userMsg = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });
      const data = await response.json();
      const aiMsg = { role: 'assistant', content: data.reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      const updatedHistory = [...newHistory, aiMsg];
      setMessages(updatedHistory);
      localStorage.setItem('honey_chat_history', JSON.stringify(updatedHistory));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] overflow-hidden relative">
      {/* Telegram Style Sidebar */}
      <div className={`w-full md:w-1/3 border-r border-white/5 flex flex-col glass-premium shrink-0 transition-transform duration-300 ${activeChat && 'max-md:-translate-x-full'} md:translate-x-0 relative z-20`}>
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Chatlar</h2>
           <button className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-400/20 hover:bg-blue-500/20 transition-all"><i className="fas fa-edit"></i></button>
        </div>
        <div className="p-4 md:p-6">
          <div className="relative group">
             <input 
               placeholder="Qidirish..." 
               className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-12 py-3 text-sm outline-none focus:border-blue-500/40 focus:bg-white/[0.05] transition-all font-bold text-white shadow-inner"
             />
             <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 text-xs"></i>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {/* Saqlangan xabarlar as a regular item */}
           <button 
             onClick={() => setActiveChat('saved')}
             className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-white/[0.02] ${activeChat === 'saved' ? 'glass-premium border-blue-500/40 mx-4 w-[calc(100%-32px)] rounded-2xl' : 'border-transparent'}`}
           >
              <div className="relative shrink-0">
                 <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white border border-white/10">
                    <i className="fas fa-bookmark text-lg"></i>
                 </div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                 <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-black text-white text-[13px] uppercase tracking-tight truncate">Saqlangan xabarlar</h4>
                    <span className="text-[10px] text-gray-500 font-bold">10:05</span>
                 </div>
                 <p className="text-[11px] text-gray-500 font-bold truncate pr-4 opacity-70">Xabarlaringizni saqlang</p>
              </div>
           </button>

           {chats.map((chat) => (
             <button 
               key={chat.id}
               onClick={() => setActiveChat(chat.id)}
               className={`w-full flex items-center gap-4 p-4 transition-all hover:bg-white/[0.02] ${activeChat === chat.id ? 'glass-premium border-blue-500/40 mx-4 w-[calc(100%-32px)] rounded-2xl' : 'border-transparent'}`}
             >
                <div className="relative shrink-0">
                   <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-500 flex items-center justify-center text-white font-black text-lg border border-white/10">
                      {chat.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                   </div>
                   {chat.online && (
                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0F172A] shadow-lg"></div>
                   )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                   <div className="flex justify-between items-center mb-0.5">
                      <h4 className="font-black text-white text-[13px] uppercase tracking-tight truncate">{chat.name}</h4>
                      <span className="text-[10px] text-gray-500 font-bold">{chat.time}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <p className="text-[11px] text-gray-500 font-bold truncate pr-4 opacity-70">{chat.lastMsg}</p>
                   </div>
                </div>
             </button>
           ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`absolute inset-0 md:static flex-1 flex flex-col bg-transparent transition-transform duration-300 ${!activeChat && 'max-md:translate-x-full'} md:translate-x-0`}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 md:p-6 border-b border-white/5 bg-white/[0.02] glass-premium flex items-center justify-between z-20">
              <div className="flex items-center gap-3 md:gap-5 min-w-0">
                <button onClick={() => setActiveChat(null)} className="md:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                   <i className="fas fa-arrow-left"></i>
                </button>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-black border border-white/10 shrink-0">
                  {activeChat === 'saved' ? <i className="fas fa-bookmark"></i> : chats.find(c => c.id === activeChat)?.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                   <h3 className="font-black text-white text-sm md:text-base uppercase tracking-widest truncate">{activeChat === 'saved' ? 'Saqlangan xabarlar' : chats.find(c => c.id === activeChat)?.name}</h3>
                   <span className="text-[9px] md:text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">{activeChat === 'saved' ? 'Sizning xabarlaringiz' : 'Online'}</span>
                </div>
              </div>
              <div className="flex gap-4 md:gap-6 shrink-0 ml-2">
                 <button className="text-gray-400 hover:text-blue-400 transition-colors"><i className="fas fa-phone-alt text-lg"></i></button>
                 <button className="text-gray-400 hover:text-blue-400 transition-colors"><i className="fas fa-video text-lg"></i></button>
                 <button className="text-gray-400 hover:text-blue-400 transition-colors"><i className="fas fa-ellipsis-v text-lg"></i></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 md:space-y-8 custom-scrollbar relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>
               
               {activeChat === 'ai' || activeChat === 'team' || activeChat === 'mentor' || activeChat === 'saved' ? (
                 <>
                   {activeChat === 'saved' ? (
                     <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                        <i className="fas fa-bookmark text-4xl"></i>
                        <p className="text-xs font-black uppercase tracking-widest">Hozircha saqlangan xabarlar yo'q</p>
                     </div>
                   ) : (
                     <>
                        <div className="flex justify-end animate-fadeIn relative z-10">
                           <div className="max-w-[90%] md:max-w-[60%] p-4 rounded-2xl glass-premium text-white border border-white/10 rounded-tr-none shadow-2xl">
                              <p className="text-sm font-bold leading-relaxed">Assalomu alaykum</p>
                              <div className="flex items-center justify-end gap-1 mt-2">
                                 <span className="text-[8px] font-black uppercase text-white/40">10:00</span>
                                 <i className="fas fa-check-double text-[8px] text-blue-400"></i>
                              </div>
                           </div>
                        </div>
                        <div className="flex justify-start animate-fadeIn relative z-10">
                           <div className="max-w-[90%] md:max-w-[60%] p-4 rounded-2xl glass-premium text-white border border-white/10 rounded-tl-none shadow-2xl">
                              <p className="text-sm font-bold leading-relaxed">Va alaykum assalom. Xush kelibsiz! Savollaringiz bormi?</p>
                              <span className="text-[8px] font-black uppercase text-white/40 mt-2 block text-right">10:05</span>
                           </div>
                        </div>
                     </>
                   )}
                 </>
               ) : (
                 <div className="h-full flex items-center justify-center p-4 text-center relative z-10">
                    <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[10px]">Xabarlar yo'q</p>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <div className="p-4 md:p-8 glass-premium border-t border-white/20 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
               <div className="max-w-5xl mx-auto flex items-center gap-4 relative">
                  <button className="text-gray-400 hover:text-white transition-colors shrink-0">
                     <i className="fas fa-paperclip text-xl"></i>
                  </button>
                  <div className="flex-1 relative">
                     <input 
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                       placeholder="Xabar yozing..." 
                       className="w-full glass-premium border-2 border-white/20 rounded-xl px-6 py-4 text-sm outline-none focus:border-honey transition-all font-bold text-white shadow-2xl placeholder:text-white/20"
                     />
                     <button className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all"><i className="fas fa-smile text-xl"></i></button>
                     <button 
                       onClick={handleSend}
                       className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFB800] text-black w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,184,0,0.8)] z-50 border-2 border-white/40"
                       style={{ backgroundColor: '#FFB800', opacity: 1 }}
                     >
                        <i className="fas fa-paper-plane text-xl"></i>
                     </button>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors shrink-0">
                     <i className="fas fa-microphone text-xl"></i>
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex flex-1 flex flex-col items-center justify-center p-12 text-center space-y-10">
             <div className="w-32 h-32 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center text-5xl text-gray-700 animate-float-soft">
                <i className="fas fa-comments"></i>
             </div>
             <div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Suhbatni boshlang</h3>
                <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px] max-w-sm">Chap tarafdan kerakli chatni tanlang va muloqotni davom ettiring.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messenger;
