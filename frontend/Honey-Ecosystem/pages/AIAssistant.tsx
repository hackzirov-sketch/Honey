
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
    <div className="container mx-auto px-6 py-12 max-w-4xl h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Aqlli AI Mentor</h1>
          <p className="text-gray-400">Shaxsiy rivojlanish yo'ldoshingiz</p>
        </div>
      </div>

      <div className="flex-1 glass border border-white/10 rounded-3xl overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] ${
                m.sender === 'user' ? 'bg-blue-600' : 'bg-white/5 border border-white/10'
              }`}>
                <p className="leading-relaxed">{m.text}</p>
                <span className="text-[10px] opacity-40 mt-2 block">
                  {m.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-2xl flex space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-black/40 border-t border-white/5">
          <div className="flex items-center space-x-4">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mentorga savol bering..."
              className="flex-1 bg-white/5 rounded-2xl px-6 py-4 border border-white/10 outline-none focus:border-blue-500 transition-all"
            />
            <button 
              onClick={sendMessage}
              disabled={loading}
              className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all"
            >
              <i className="fas fa-arrow-up"></i>
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Ingliz tilini o'rganamiz", "IT sohasi haqida", "Kitob tavsiya et", "Motivatsiya ber"].map(tag => (
              <button 
                key={tag}
                onClick={() => setInput(tag)}
                className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full text-gray-400 hover:text-white transition-all"
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
