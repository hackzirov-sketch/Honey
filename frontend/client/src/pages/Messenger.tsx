import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';

interface ChatMessage {
  id: string;
  content: string;
  sender: { id: string; username: string };
  created_at: string;
  message_type: string;
  file?: string | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  other_user?: { id: string; username: string; email: string; avatar?: string }; // Null for groups
  name?: string; // For groups
  description?: string; // For groups
  group_type?: 'group' | 'channel'; // For groups
  avatar?: string;
  last_message?: { content: string; created_at: string };
  updated_at: string;
  is_group?: boolean;
  members?: any[];
  admin?: string;
}

const Messenger: React.FC = () => {
  const user = React.useMemo(() => JSON.parse(localStorage.getItem('honey_user') || 'null'), []);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessagesLoading, setChatMessagesLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ users: any[], groups: any[] }>({ users: [], groups: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'group' | 'channel'>('group');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [forwardMessage, setForwardMessage] = useState<ChatMessage | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  });

  // Chatlar ro'yxatini yukla
  const fetchChats = async (showLoading = true) => {
    if (showLoading) setChatsLoading(true);
    try {
      const [chatsRes, groupsRes] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.LIST}`, { headers: authHeaders() }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GROUPS}`, { headers: authHeaders() })
      ]);

      let combined: Chat[] = [];
      if (chatsRes.ok) {
        const data = await chatsRes.json();
        combined = [...(data.results || data).map((c: any) => ({ ...c, is_group: false }))];
      }
      if (groupsRes.ok) {
        const data = await groupsRes.json();
        combined = [...combined, ...(data.results || data).map((g: any) => ({ ...g, is_group: true }))];
      }
      combined.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      setChats(combined);
    } catch { /* offline */ } finally {
      if (showLoading) setChatsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchChats();
    // Polling har 15 sekundda yangilab turadi
    const interval = setInterval(() => fetchChats(false), 15000);
    return () => clearInterval(interval);
  }, [user]);

  // Chat xabarlarini yukla
  const fetchChatMessages = async (chatId: string) => {
    if (chatId === 'ai' || chatId === 'saved') return;
    setChatMessagesLoading(true);

    // Check if it's a group - first in local chats, then in search results
    let target = chats.find(c => String(c.id) === chatId);
    if (!target) {
      const searchGroup = searchResults.groups.find(g => String(g.id) === chatId);
      if (searchGroup) target = { ...searchGroup, is_group: true };
    }

    const endpoint = target?.is_group
      ? API_ENDPOINTS.CHAT.GROUP_MESSAGES(chatId)
      : API_ENDPOINTS.CHAT.MESSAGES(chatId);

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setChatMessages(data.results || data);
      }
    } catch { /* offline */ } finally {
      setChatMessagesLoading(false);
    }
  };

  // Chat tanlanganda xabarlarni yukla
  useEffect(() => {
    if (activeChat && activeChat !== 'ai') {
      if (activeChat === 'saved') {
        const myChat = chats.find(c => !c.is_group && c.other_user?.id === user?.id);
        if (myChat) {
          setChatMessages([]);
          fetchChatMessages(String(myChat.id));
        } else {
          setChatMessages([]);
        }
      } else {
        setChatMessages([]);
        fetchChatMessages(activeChat);
      }
    }
  }, [activeChat, chats]);

  useEffect(() => {
    const saved = localStorage.getItem('honey_ai_chat_history');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatMessages]);

  // Global qidiruv mantiqi
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const encodedQuery = encodeURIComponent(searchQuery);
          const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GLOBAL_SEARCH}?search=${encodedQuery}`, {
            headers: authHeaders(),
          });
          if (res.ok) {
            const data = await res.json();
            setSearchResults(data);
          }
        } catch (err) {
          console.error("Search error:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults({ users: [], groups: [] });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Yangi chat yaratish yoki mavjudini tanlash
  const handleStartChat = async (targetUserId: number | string) => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.CREATE}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ user_id: targetUserId }),
      });
      if (res.ok) {
        const data = await res.json();
        // Chatlar ro'yxatini darhol yangilash
        await fetchChats(false);
        setActiveChat(String(data.id));
        setSearchQuery('');
      }
    } catch (err) {
      console.error("Start chat error:", err);
    }
  };

  // AI ga xabar yuborish
  const handleSendAI = async () => {
    const textToSend = input.trim();
    if (!textToSend) {
      alert("Iltimos, AI uchun savol yozing.");
      return;
    }
    if (activeChat !== 'ai') return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { role: 'user', content: textToSend, timestamp };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    console.log("Sending AI request:", textToSend);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.AI_CHAT}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          message: textToSend,
          systemInstruction: "Siz Honey platformasining aqlli AI yordamchisisiz. Foydalanuvchilarga o'qishda, bilim olishda yordam bering. Doimo o'zbek tilida javob bering.",
        }),
      });
      console.log("AI Response status:", res.status);
      if (res.status === 401) {
        alert("Sessiya muddati tugadi. Iltimos qaytadan kiring.");
        navigate('/auth');
        return;
      }
      const data = await res.json();
      console.log("AI Response data:", data);

      const aiMsg: Message = {
        role: 'assistant',
        content: data.text || data.reply || data.message || "Xabar bo'sh qaytdi.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updated = [...newHistory, aiMsg];
      setMessages(updated);
      localStorage.setItem('honey_ai_chat_history', JSON.stringify(updated));
    } catch {
      const errMsg: Message = {
        role: 'assistant',
        content: "Server bilan aloqa yo'q. Iltimos internetingizni tekshiring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...newHistory, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAIHistory = () => {
    if (window.confirm("AI bilan suhbat tarixini tozalamoqchimisiz?")) {
      setMessages([]);
      localStorage.removeItem('honey_ai_chat_history');
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm("Ushbu xabarni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.MESSAGE_DELETE(msgId)}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (res.ok) {
        setChatMessages(prev => prev.filter(m => String(m.id) !== msgId));
        setActiveMenu(null);
      }
    } catch { /* err */ }
  };


  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    alert("Nusxa olindi!");
    setActiveMenu(null);
  };

  const startForward = (msg: ChatMessage) => {
    setForwardMessage(msg);
    setShowForwardModal(true);
    setActiveMenu(null);
  };

  const handleForwardMessage = async (targetChatId: string, isGroup: boolean) => {
    if (!forwardMessage) return;

    const endpoint = isGroup
      ? API_ENDPOINTS.CHAT.GROUP_SEND(targetChatId)
      : API_ENDPOINTS.CHAT.SEND(targetChatId);

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          content: `[Forward qilindi]: ${forwardMessage.content}`,
          message_type: 'text'
        }),
      });
      if (res.ok) {
        alert("Xabar yuborildi!");
        setShowForwardModal(false);
        setForwardMessage(null);
      }
    } catch {
      alert("Xatolik!");
    }
  };

  // Oddiy chat yoki guruhga xabar
  const handleSendChat = async (chatId: string) => {
    if (!input.trim() && !selectedFile) return;
    const chat = chats.find(c => String(c.id) === chatId);
    const msgContent = input;
    const fileToSend = selectedFile;
    setInput('');
    setSelectedFile(null);

    const endpoint = chat?.is_group
      ? API_ENDPOINTS.CHAT.GROUP_SEND(chatId)
      : API_ENDPOINTS.CHAT.SEND(chatId);

    try {
      const formData = new FormData();
      formData.append('content', msgContent || (fileToSend?.name ?? ''));
      formData.append('message_type', fileToSend
        ? (fileToSend.type.startsWith('image/') ? 'image' : 'file')
        : 'text'
      );
      if (fileToSend) formData.append('file', fileToSend);

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getAuthToken()}` },
        body: formData,
      });
      if (res.ok) {
        await fetchChatMessages(chatId);
      } else {
        const err = await res.json();
        alert(err.error || "Xabar yuborishda xatolik");
      }
    } catch { /* handle */ }
  };

  const handleSend = () => {
    if (activeChat === 'ai') {
      handleSendAI();
    } else if (activeChat === 'saved') {
      const myChat = chats.find(c => !c.is_group && c.other_user?.id === user?.id);
      if (myChat) {
        handleSendChat(String(myChat.id));
      } else {
        // Create saved messages chat if it doesn't exist
        handleStartChat(user.id);
      }
    } else if (activeChat) {
      handleSendChat(activeChat);
    }
    setActiveMenu(null);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn pb-64">
        <div className="w-32 h-32 bg-honey/10 rounded-[3rem] border border-honey/20 flex items-center justify-center text-5xl text-honey animate-float-soft">
          <i className="fas fa-brain"></i>
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Intelligence Hub</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">
            Sun'iy intellekt tomonidan boshqariladigan premium muloqot muhiti.
          </p>
          <div className="pt-12">
            <button
              onClick={() => navigate('/auth')}
              className="bg-honey text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all"
            >
              HUBGA KIRISH
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderAIMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 animate-pulse">
          <i className="fas fa-robot text-5xl md:text-6xl text-honey"></i>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">AI yordamchisi bilan suhbatni boshlang</p>
        </div>
      );
    }
    return messages.map((msg, i) => (
      <div key={i} className="flex justify-start items-center gap-4 animate-fadeIn relative z-10 group/msg-row mb-4">
        <div className={`max-w-[85%] md:max-w-[65%] p-3 md:p-4 rounded-2xl glass-premium text-white border border-white/10 shadow-2xl relative ${msg.role === 'user' ? 'message-bubble-user rounded-tl-none' : 'message-bubble-other rounded-tl-none'}`}>
          <p className="text-xs md:text-sm font-bold leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          <div className="flex items-center gap-1 mt-1 md:mt-2 opacity-40">
            <span className="text-[7px] md:text-[8px] font-black uppercase text-white">{msg.timestamp}</span>
            {msg.role === 'user' && <i className="fas fa-check-double text-[7px] md:text-[8px] text-blue-400"></i>}
          </div>
        </div>

        <div className="relative shrink-0 opacity-0 group-hover/msg-row:opacity-100 transition-opacity">
          <button
            onClick={() => setActiveMenu(activeMenu === `ai-${i}` ? null : `ai-${i}`)}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
          >
            <i className="fas fa-ellipsis-v text-xs"></i>
          </button>

          {activeMenu === `ai-${i}` && (
            <div className="absolute left-10 top-0 w-40 glass-premium rounded-2xl border border-white/10 shadow-2xl py-2 z-[100] animate-scaleIn backdrop-blur-2xl">
              <button onClick={() => { handleCopyMessage(msg.content); setActiveMenu(null); }} className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3 transition-colors">
                <i className="fas fa-copy text-honey text-sm"></i> Nusxa olish
              </button>
              <button onClick={() => { startForward({ id: `ai-${i}`, content: msg.content, sender: { id: 'ai', username: 'AI' }, created_at: new Date().toISOString(), message_type: 'text' }); setActiveMenu(null); }} className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3 transition-colors">
                <i className="fas fa-paper-plane text-blue-400 text-sm"></i> Ulashish
              </button>
              {msg.role === 'user' && (
                <button
                  onClick={() => {
                    const newMsgs = messages.filter((_, idx) => idx !== i);
                    setMessages(newMsgs);
                    localStorage.setItem('honey_ai_chat_history', JSON.stringify(newMsgs));
                    setActiveMenu(null);
                  }}
                  className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 flex items-center gap-3 transition-colors border-t border-white/5"
                >
                  <i className="fas fa-trash-alt text-sm"></i> O'chirish
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    ))
  };

  const renderSavedMessages = () => {
    const myChat = chats.find(c => !c.is_group && c.other_user?.id === user?.id);
    if (!myChat) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 animate-pulse">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl text-blue-400 border border-blue-400/20">
            <i className="fas fa-bookmark"></i>
          </div>
          <p className="text-xs font-black uppercase tracking-widest">Saved Messages chatini ochish uchun xabar yuboring</p>
        </div>
      );
    }

    if (chatMessagesLoading) {
      return (
        <div className="flex justify-center py-10 opacity-50">
          <div className="w-6 h-6 border-2 border-honey border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (chatMessages.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 animate-pulse">
          <i className="fas fa-bookmark text-5xl md:text-6xl text-honey"></i>
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">Hali saqlangan xabarlar yo'q</p>
        </div>
      );
    }

    return renderChatMessages();
  };

  const renderChatMessages = () => {
    return chatMessages.map((msg, i) => {
      const isMine = msg.sender?.username === user?.name || msg.sender?.id === user?.id;
      return (
        <div key={msg.id || i} className="flex justify-start items-center gap-4 animate-slideInUp group/msg-row mb-4">
          <div className={`max-w-[85%] md:max-w-[65%] p-4 md:p-5 rounded-3xl message-bubble shadow-xl relative ${isMine ? 'message-bubble-user rounded-tl-none' : 'message-bubble-other rounded-tl-none'}`}>
            {!isMine && activeChatItem?.is_group && (
              <p className="text-[10px] font-black uppercase text-honey mb-2 tracking-widest opacity-80">@{msg.sender.username}</p>
            )}
            {msg.file && msg.message_type === 'image' && (
              <img
                src={msg.file.startsWith('http') ? msg.file : `${API_BASE_URL}${msg.file}`}
                alt="rasm"
                className="rounded-xl max-w-full max-h-48 object-cover mb-2 cursor-pointer hover:opacity-90"
                onClick={() => window.open(msg.file!.startsWith('http') ? msg.file! : `${API_BASE_URL}${msg.file}`, '_blank')}
              />
            )}
            {msg.file && msg.message_type === 'file' && (
              <a
                href={msg.file.startsWith('http') ? msg.file : `${API_BASE_URL}${msg.file}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-honey text-xs font-bold underline mb-2"
              >
                <i className="fas fa-file-download"></i>
                {msg.content}
              </a>
            )}
            {(msg.message_type === 'text' || !msg.file) && (
              <p className="text-[13px] md:text-[15px] font-bold leading-relaxed text-white/95 whitespace-pre-wrap">{msg.content}</p>
            )}
            <div className="flex items-center gap-2 mt-3 opacity-40">
              <span className="text-[9px] font-black uppercase text-white tracking-tighter">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {isMine && <i className="fas fa-check-double text-[9px] text-honey glow-honey-soft"></i>}
            </div>
          </div>

          <div className="relative shrink-0 opacity-0 group-hover/msg-row:opacity-100 transition-opacity">
            <button
              onClick={() => setActiveMenu(activeMenu === msg.id ? null : msg.id)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
            >
              <i className="fas fa-ellipsis-v text-xs"></i>
            </button>

            {activeMenu === msg.id && (
              <div className="absolute left-10 top-0 w-40 glass-premium rounded-2xl border border-white/10 shadow-2xl py-2 z-[100] animate-scaleIn backdrop-blur-2xl">
                <button onClick={() => handleCopyMessage(msg.content)} className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3 transition-colors">
                  <i className="fas fa-copy text-honey text-sm"></i> Nusxa olish
                </button>
                <button onClick={() => startForward(msg)} className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3 transition-colors">
                  <i className="fas fa-paper-plane text-blue-400 text-sm"></i> Ulashish
                </button>
                {(isMine || (activeChatItem?.is_group && activeChatItem?.admin === user?.id)) && (
                  <button onClick={() => handleDeleteMessage(msg.id)} className="w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 flex items-center gap-3 transition-colors border-t border-white/5">
                    <i className="fas fa-trash-alt text-sm"></i> O'chirish
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  const activeChatItem = chats.find(c => String(c.id) === activeChat);
  const activeChatName = activeChat === 'ai'
    ? 'Honey AI Assistant'
    : activeChat === 'saved'
      ? 'Saqlangan xabarlar'
      : activeChatItem?.is_group ? activeChatItem.name : activeChatItem?.other_user?.username || 'Chat';

  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    setIsCreatingGroup(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GROUPS}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          name: newGroupName,
          description: newGroupDesc,
          group_type: createType,
          is_public: true
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setShowCreateModal(false);
        setNewGroupName('');
        setNewGroupDesc('');
        // Refresh chats and select the new one
        await fetchChats(false);
        setActiveChat(String(data.id));
        alert("Guruh muvaffaqiyatli yaratildi!");
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("Group create error:", err);
        const detail = err.detail || err.message || (err.name ? "Bu nomli guruh mavjud" : JSON.stringify(err));
        alert(`Xatolik: ${detail}`);
      }
    } catch (err) {
      alert("Tarmoq xatosi. Iltimos qayta urinib ko'ring.");
    } finally {
      setIsCreatingGroup(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chat/groups/${groupId}/join/`, {
        method: 'POST',
        headers: authHeaders(),
      });
      if (res.ok) {
        alert("Guruhga muvaffaqiyatli qo'shildingiz!");
        await fetchChats(false);
        await fetchChatMessages(groupId);
      } else {
        const err = await res.json();
        alert(err.error || "Guruhga qo'shilishda xatolik");
      }
    } catch {
      alert("Tarmoq xatosi");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative bg-[#0F172A]">
      {/* Sidebar */}
      <div className={`w-full md:w-1/3 lg:w-1/4 flex flex-col chat-sidebar-glass shrink-0 transition-transform duration-300 ${activeChat ? 'max-md:-translate-x-full absolute md:static inset-0' : 'relative'} md:translate-x-0 z-20 h-screen shadow-2xl`}>
        <div className="p-4 md:p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02] shrink-0">
          <button onClick={() => navigate('/')} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-all border border-white/10 active:scale-95">
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">Chatlar</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-auto w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-400/20 hover:bg-blue-500/20 transition-all active:scale-95"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div className="p-4 md:p-6 shrink-0">
          <div className="relative">
            <input
              placeholder="Username yoki guruh qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-4 text-sm outline-none focus:border-honey/50 transition-all font-bold text-white search-input-glass shadow-inner"
            />
            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            {isSearching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-3 h-3 border-2 border-honey border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Qidiruv natijalari */}
          {searchQuery.length > 0 && (
            <div className="pb-4">
              <div className="px-6 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-honey/60">Global qidiruv</span>
              </div>

              {searchResults.users.length === 0 && searchResults.groups.length === 0 && !isSearching && (
                <div className="px-6 py-4 text-center">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Hech narsa topilmadi</p>
                </div>
              )}

              {searchResults.users.map((u) => (
                <button
                  key={`user-${u.id}`}
                  onClick={() => handleStartChat(u.id)}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-white/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20 text-xs font-black">
                    {u.username.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-xs truncate">@{u.username}</h4>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Foydalanuvchi</p>
                  </div>
                </button>
              ))}

              {searchResults.groups.map((g) => (
                <button
                  key={`group-${g.id}`}
                  onClick={() => setActiveChat(String(g.id))} // Guruhga kirish mantiqi keyinroq boyitiladi
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-white/5 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-honey/20 flex items-center justify-center text-honey border border-honey/20 text-xs font-black">
                    <i className="fas fa-hashtag"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-xs truncate">{g.name}</h4>
                    <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Kanal/Guruh</p>
                  </div>
                </button>
              ))}

              <div className="border-b border-white/5 my-4 mx-6"></div>
            </div>
          )}

          {/* AI Assistant */}
          <button
            onClick={() => setActiveChat('ai')}
            className={`w-full flex items-center gap-4 px-6 py-5 transition-all chat-list-item ${activeChat === 'ai' ? 'chat-list-item-active' : ''}`}
          >
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white border border-white/10 shadow-lg transition-transform duration-500 group-hover:scale-110">
                <i className="fas fa-robot text-xl"></i>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0F172A] shadow-glow"></div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-black text-white text-sm md:text-[15px] uppercase tracking-tight truncate group-hover:text-honey transition-colors">Honey AI</h4>
                <span className="text-[10px] text-honey font-bold">Online</span>
              </div>
              <p className="text-[12px] text-gray-500 font-bold truncate opacity-80 leading-snug">
                {messages.length > 0 ? messages[messages.length - 1].content.slice(0, 30) + '...' : 'Sizga qanday yordam bera olaman?'}
              </p>
            </div>
          </button>

          {/* Saqlangan xabarlar */}
          <button
            onClick={() => setActiveChat('saved')}
            className={`w-full flex items-center gap-4 px-6 py-5 transition-all chat-list-item ${activeChat === 'saved' ? 'chat-list-item-active' : ''}`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white border border-white/10 shadow-lg transition-transform duration-500 group-hover:scale-110 shrink-0 ${activeChat === 'saved' ? 'scale-110' : ''}`}>
              <i className="fas fa-bookmark text-xl"></i>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-black text-white text-sm md:text-[15px] uppercase tracking-tight truncate group-hover:text-honey transition-colors">Saqlangan xabarlar</h4>
                {chats.find(c => !c.is_group && c.other_user?.id === user?.id) && <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>}
              </div>
              <p className="text-[12px] text-gray-500 font-bold opacity-80 leading-snug">Muhim xabarlaringiz</p>
            </div>
          </button>

          {/* Real chatlar */}
          {chatsLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-honey border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(String(chat.id))}
                className={`w-full flex items-center gap-4 px-6 py-5 transition-all chat-list-item ${activeChat === String(chat.id) ? 'chat-list-item-active' : ''}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-14 h-14 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center text-white font-black text-xl border border-white/10 transition-transform duration-500 group-hover:scale-110 ${chat.is_group ? (chat.group_type === 'channel' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gradient-to-br from-honey to-amber-600') : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                    {chat.is_group ? <i className={chat.group_type === 'channel' ? 'fas fa-bullhorn' : 'fas fa-users'}></i> : (chat.other_user?.username?.substring(0, 2).toUpperCase() || 'U')}
                  </div>
                  {!chat.is_group && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0F172A] shadow-glow"></div>}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-black text-white text-sm md:text-[15px] uppercase tracking-tight truncate group-hover:text-honey transition-colors">{chat.is_group ? chat.name : chat.other_user?.username}</h4>
                    <span className="text-[10px] text-gray-400 font-bold opacity-60">12:45</span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-bold truncate opacity-80 leading-snug">{chat.last_message?.content || 'Hali xabar yo\'q...'}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col relative transition-all duration-500 ${!activeChat ? 'max-md:hidden' : 'max-md:block scale-100 opacity-100'}`}>
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0F172A] relative overflow-hidden">
            {/* Animated Hexagon Background */}
            <div className="absolute inset-0 opacity-10 hexagon-bg"></div>
            <div className="relative z-10 animate-float-soft">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white shadow-3xl mb-8 mx-auto rotate-12 hover:rotate-0 transition-transform duration-700">
                <i className="fas fa-comment-dots text-3xl md:text-5xl"></i>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4 honey-text-gradient">Honey Messenger</h3>
              <p className="text-gray-400 max-w-sm text-sm md:text-base font-bold leading-relaxed opacity-60">
                Xavfsiz, tezkor va zamonaviy muloqot platformasi. <br /> Suhbatni boshlash uchun chatni tanlang.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 md:px-8 md:py-5 flex items-center justify-between chat-header-glass z-30 shadow-2xl">
              <div className="flex items-center gap-4 md:gap-6 min-w-0">
                <button
                  onClick={() => setActiveChat(null)}
                  className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-95"
                >
                  <i className="fas fa-arrow-left"></i>
                </button>
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-2xl ${activeChatItem?.is_group ? (activeChatItem.group_type === 'channel' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gradient-to-br from-honey to-amber-600') : 'bg-gradient-to-br from-emerald-500 to-teal-600'} flex items-center justify-center text-white font-black text-xl border border-white/10 shrink-0 glow-honey-soft`}>
                  {activeChat === 'ai' ? <i className="fas fa-robot"></i> : activeChat === 'saved' ? <i className="fas fa-bookmark"></i> : activeChatItem?.is_group ? <i className={activeChatItem.group_type === 'channel' ? 'fas fa-bullhorn' : 'fas fa-users'}></i> : (activeChatName || 'Chat').substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-white text-base md:text-xl uppercase tracking-tighter truncate mb-0.5">
                    {activeChatName || 'Chat'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[10px] md:text-[11px] text-blue-400 font-black uppercase tracking-[0.2em] opacity-80">
                      {activeChat === 'ai'
                        ? 'Gemini 2.0 Flash · Online'
                        : activeChat === 'saved'
                          ? 'Sizning xabarlaringiz'
                          : activeChatItem?.is_group
                            ? `${activeChatItem.group_type === 'channel' ? 'Kanal' : 'Guruh'} · ${activeChatItem.members?.length || 1} a'zo`
                            : 'Online'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                {activeChat && !activeChatItem && activeChat !== 'ai' && activeChat !== 'saved' && (
                  <button
                    onClick={() => handleJoinGroup(activeChat)}
                    className="bg-honey text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-honey/20"
                  >
                    Guruhga qo'shilish
                  </button>
                )}
                <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-premium text-gray-400 hover:text-white transition-all border border-white/5 flex items-center justify-center hover:bg-white/10">
                  <i className="fas fa-search text-xs md:text-sm"></i>
                </button>
                <button
                  onClick={activeChat === 'ai' ? clearAIHistory : undefined}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-xl glass-premium text-gray-400 hover:text-red-400 transition-all border border-white/5 flex items-center justify-center hover:bg-white/10"
                  title={activeChat === 'ai' ? "AI tarixini tozalash" : "Sozlamalar"}
                >
                  <i className={`fas ${activeChat === 'ai' ? 'fa-broom' : 'fa-ellipsis-v'} text-xs md:text-sm`}></i>
                </button>
              </div>
            </div>

            {/* Xabarlar */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8 custom-scrollbar relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none hexagon-bg"></div>
              {activeChat === 'ai' ? renderAIMessages() : activeChat === 'saved' ? renderSavedMessages() : (
                chatMessagesLoading ? (
                  <div className="flex justify-center py-10 opacity-50">
                    <div className="w-6 h-6 border-2 border-honey border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : chatMessages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 animate-pulse">
                    <i className={`fas ${activeChatItem?.is_group ? 'fa-comments' : 'fa-comment-alt'} text-5xl md:text-6xl text-honey`}></i>
                    <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">Hali xabarlar mavjud emas</p>
                  </div>
                ) : (
                  renderChatMessages()
                )
              )}
              {isLoading && (
                <div className="flex justify-start animate-pulse relative z-10">
                  <div className="p-4 rounded-2xl glass-premium text-honey/60 border border-white/10 rounded-tl-none">
                    <i className="fas fa-ellipsis-h animate-bounce"></i>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:px-8 md:py-6 chat-header-glass">
              <div className="flex items-end gap-3 md:gap-4 max-w-5xl mx-auto">
                <div className="flex gap-2 pb-1.5 shrink-0">
                  <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-honey transition-all border border-white/10 flex items-center justify-center active:scale-95 shadow-lg">
                    <i className="fas fa-paperclip text-sm md:text-base"></i>
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                </div>

                <div className="flex-1 relative group">
                  {selectedFile && (
                    <div className="absolute bottom-full left-0 mb-3 p-3 bg-honey/10 border border-honey/30 rounded-2xl flex items-center gap-3 animate-slideInUp shadow-2xl backdrop-blur-xl">
                      <div className="w-8 h-8 rounded-lg bg-honey flex items-center justify-center text-white text-xs">
                        <i className="fas fa-file"></i>
                      </div>
                      <span className="text-[10px] font-black text-white/80 uppercase truncate max-w-[150px]">{selectedFile.name}</span>
                      <button onClick={() => setSelectedFile(null)} className="text-honey hover:text-white transition-colors">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  )}
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Xabar yozing..."
                    rows={1}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] px-5 py-4 text-sm md:text-base outline-none focus:border-honey/50 transition-all font-bold text-white resize-none max-h-48 search-input-glass shadow-inner"
                  />
                  <div className="absolute right-4 bottom-3 flex items-center gap-2">
                    <button className="text-gray-500 hover:text-honey transition-colors">
                      <i className="far fa-smile text-lg"></i>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSend}
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 shrink-0 z-[60] border-2 ${activeChat === 'ai' || input.trim() || selectedFile
                    ? 'bg-[#FFB800] border-[#FFB800] text-[#1A1100] scale-110 shadow-[0_0_20px_rgba(255,184,0,0.3)] opacity-100 hover:brightness-110'
                    : 'bg-white/20 border-white/30 text-white/40 scale-100 cursor-not-allowed opacity-40'
                    }`}
                  disabled={activeChat !== 'ai' && !input.trim() && !selectedFile}
                  title={activeChat === 'ai' ? "AI ga yuborish" : "Xabarni yuborish"}
                >
                  <i className={`fas ${activeChat === 'ai' ? 'fa-sparkles' : 'fa-paper-plane'} ${input.trim() || selectedFile ? 'animate-pulse' : ''} text-lg md:text-xl`}></i>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative w-full max-w-md glass-premium p-8 rounded-[2rem] border border-white/10 shadow-2xl animate-scaleIn">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Yangi yaratish</h2>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setCreateType('group')}
                className={`flex-1 py-4 rounded-xl border-2 transition-all font-black text-xs uppercase tracking-widest ${createType === 'group' ? 'border-honey bg-honey/10 text-honey' : 'border-white/5 text-gray-500'}`}
              >
                <i className="fas fa-users mb-2 block text-lg"></i>
                Gurux
              </button>
              <button
                onClick={() => setCreateType('channel')}
                className={`flex-1 py-4 rounded-xl border-2 transition-all font-black text-xs uppercase tracking-widest ${createType === 'channel' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-white/5 text-gray-500'}`}
              >
                <i className="fas fa-bullhorn mb-2 block text-lg"></i>
                Kanal
              </button>
            </div>

            <div className="space-y-4">
              <input
                placeholder="Nomi"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-honey transition-all font-bold text-white"
              />
              <textarea
                placeholder="Tavsif (ixtiyoriy)"
                value={newGroupDesc}
                onChange={(e) => setNewGroupDesc(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-honey transition-all font-bold text-white resize-none h-32"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-all"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={isCreatingGroup || !newGroupName.trim()}
                className="flex-1 bg-honey text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-honey/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isCreatingGroup ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Forward Modal */}
      {showForwardModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowForwardModal(false)}></div>
          <div className="relative w-full max-w-md glass-premium p-8 rounded-[2rem] border border-white/10 shadow-2xl animate-scaleIn">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6 flex items-center gap-3">
              <i className="fas fa-share text-honey"></i> Xabarni yuborish
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <button
                onClick={() => handleForwardMessage('ai', false)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-honey/10 border border-white/5 hover:border-honey/30 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white font-black">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-honey transition-colors">Honey AI Assistant</h4>
                </div>
              </button>

              <button
                onClick={() => {
                  const myChat = chats.find(c => !c.is_group && c.other_user?.id === user?.id);
                  if (myChat) handleForwardMessage(String(myChat.id), false);
                  else handleStartChat(user.id).then(() => {
                    // After creation, we might need a better way to forward, but for now just inform
                    alert("Saved messages yaratildi, iltimos qayta urinib ko'ring.");
                  });
                }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-honey/10 border border-white/5 hover:border-honey/30 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black">
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-sm group-hover:text-honey transition-colors">Saqlangan xabarlar</h4>
                </div>
              </button>

              {chats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleForwardMessage(String(chat.id), !!chat.is_group)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-honey/10 border border-white/5 hover:border-honey/30 transition-all text-left group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black ${chat.is_group ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {chat.is_group ? <i className="fas fa-users"></i> : (chat.other_user?.username?.substring(0, 2).toUpperCase())}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm group-hover:text-honey transition-colors">{chat.is_group ? chat.name : chat.other_user?.username}</h4>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForwardModal(false)}
              className="mt-6 w-full py-4 rounded-2xl bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
