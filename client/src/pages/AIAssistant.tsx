
import React, { useState } from 'react';
import { chatWithHoneyAI } from '../services/geminiService';
import { Message } from '../types';

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'ai', 
      text: "Salom! Men sizning shaxsiy AI mentoriman. Qanday savolingiz bor? Xohlasangiz ingliz tilini o'rganamiz yoki yangi ko'nikmalarni o'zlashtiramiz.", 
      timestamp: new Date() 
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const aiResponse = await chatWithHoneyAI(input, "Siz Honey platformasida AI Mentorsiz. Foydalanuvchiga bilim olishda, til o'rganishda va shaxsiy rivojlanishda yordam berasiz.");
    
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiResponse,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 h-[calc(100vh-200px)] md:h-[calc(100vh-260px)] flex flex-col animate-fadeIn">
      <div className="flex items-center space-x-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-honey to-amber-600 flex items-center justify-center text-3xl shadow-lg border border-white/10">
          <i className="fas fa-robot text-white"></i>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Aqlli AI Mentor</h1>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Shaxsiy rivojlanish yo'ldoshingiz</p>
        </div>
      </div>

      <div className="flex-1 glass-premium rounded-[2rem] overflow-hidden flex flex-col border border-white/10">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slideInUp`}>
              <div className={`p-4 md:p-5 rounded-2xl max-w-[85%] shadow-xl ${
                m.sender === 'user'
                  ? 'bg-honey/20 border border-honey/30 text-white rounded-tr-sm'
                  : 'bg-white/5 border border-white/10 text-gray-100 rounded-tl-sm'
              }`}>
                <p className="leading-relaxed font-medium text-sm md:text-base">{m.text}</p>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40 mt-3 block">
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex space-x-2">
                <div className="w-2 h-2 bg-honey rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-honey rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-honey rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="flex items-center space-x-3">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mentorga savol bering..."
              className="flex-1 bg-white/5 rounded-2xl px-6 py-4 border border-white/10 outline-none focus:border-honey/50 transition-all text-white font-medium"
            />
            <button 
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-14 h-14 bg-honey text-black rounded-2xl flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-honey/20 disabled:opacity-50 disabled:grayscale"
            >
              <i className="fas fa-paper-plane text-xl"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 overflow-x-auto no-scrollbar">
            {["Ingliz tilini o'rganamiz", "IT sohasi haqida", "Kitob tavsiya et", "Motivatsiya ber"].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(tag)}
                className="text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-honey/10 border border-white/10 hover:border-honey/30 px-4 py-2 rounded-full text-gray-400 hover:text-honey transition-all whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
