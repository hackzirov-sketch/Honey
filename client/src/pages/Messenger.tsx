import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS, getAuthToken } from '@/config/api.config';

// ───────────────────────────── TYPES ─────────────────────────────
interface LinkPreview {
  type: 'youtube' | 'instagram' | 'link';
  url: string;
  title: string;
  site_name: string;
  embed_url?: string;
  thumbnail?: string;
}

interface ReplyTo {
  id: string;
  content: string;
  sender: { id: string; username: string };
  message_type: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: { id: string; username: string };
  created_at: string;
  message_type: string;
  file?: string | null;
  reply_to?: ReplyTo | null;
  edited_at?: string | null;
  link_preview?: LinkPreview | null;
  reactions?: { emoji: string; count: number; users: string[] }[];
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  other_user?: { id: string; username: string; email: string; avatar?: string };
  name?: string;
  description?: string;
  group_type?: 'group' | 'channel';
  avatar?: string;
  last_message?: { content: string; created_at: string };
  updated_at: string;
  is_group?: boolean;
  members?: any[];
  admin?: string;
}

type FilterTab = 'all' | 'unread' | 'groups' | 'channels';

interface HubSettings {
  enterToSend: boolean;
  showPreviews: boolean;
  compactMode: boolean;
  soundOn: boolean;
}

const DEFAULT_SETTINGS: HubSettings = {
  enterToSend: true,
  showPreviews: true,
  compactMode: false,
  soundOn: true,
};

const REACTION_SET = ['??','??','??','??','??','??'];

// ───────────────────────────── HELPERS ─────────────────────────────
const lsGet = <T,>(k: string, fallback: T): T => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
};
const lsSet = (k: string, v: any) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* quota */ } };

const formatTime = (iso: string) => {
  try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch { return ''; }
};

const dateLabel = (iso: string) => {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
    if (sameDay) return 'Bugun';
    if (d.toDateString() === yesterday.toDateString()) return 'Kecha';
    return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: now.getFullYear() === d.getFullYear() ? undefined : 'numeric' });
  } catch { return ''; }
};

const dateKey = (iso: string) => { try { return new Date(iso).toDateString(); } catch { return ''; } };

const lastSeenLabel = (iso?: string) => {
  if (!iso) return 'Online';
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'hozir online';
    if (mins < 60) return `${mins} daqiqa avval`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} soat avval`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days} kun avval`;
    return new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
  } catch { return 'Online'; }
};

// ───────────────────────────── COMPONENT ─────────────────────────────
const Messenger: React.FC = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem('honey_user') || 'null'), []);
  const navigate = useNavigate();

  // Core data
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatMessagesLoading, setChatMessagesLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  // Composer
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editingMsg, setEditingMsg] = useState<ChatMessage | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ users: any[]; groups: any[] }>({ users: [], groups: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [inChatSearch, setInChatSearch] = useState('');
  const [showInChatSearch, setShowInChatSearch] = useState(false);

  // UI panels
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'group' | 'channel'>('group');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');
  const [isCreatingGroup, setIsCreatingGroup] = useState(false);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [forwardMessage, setForwardMessage] = useState<ChatMessage | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [infoTab, setInfoTab] = useState<'media' | 'files' | 'links'>('media');

  // Filter tabs and chat-list state from localStorage
  const [filterTab, setFilterTab] = useState<FilterTab>(() => lsGet<FilterTab>('honey:hub:filter', 'all'));
  const [pinnedChats, setPinnedChats] = useState<string[]>(() => lsGet<string[]>('honey:hub:pinned', []));
  const [mutedChats, setMutedChats] = useState<string[]>(() => lsGet<string[]>('honey:hub:muted', []));
  const [readMarkers, setReadMarkers] = useState<Record<string, string>>(() => lsGet<Record<string, string>>('honey:hub:read', {}));
  const [chatCtxMenu, setChatCtxMenu] = useState<{ chatId: string; x: number; y: number } | null>(null);

  // Settings
  const [settings, setSettings] = useState<HubSettings>(() => ({ ...DEFAULT_SETTINGS, ...lsGet<Partial<HubSettings>>('honey:hub:settings', {}) }));

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastMessagesSig = useRef<string>('');
  const lastChatsSig = useRef<string>('');
  const initialScrollDone = useRef<string | null>(null);

  // ── localStorage persistence ──
  useEffect(() => { lsSet('honey:hub:filter', filterTab); }, [filterTab]);
  useEffect(() => { lsSet('honey:hub:pinned', pinnedChats); }, [pinnedChats]);
  useEffect(() => { lsSet('honey:hub:muted', mutedChats); }, [mutedChats]);
  useEffect(() => { lsSet('honey:hub:read', readMarkers); }, [readMarkers]);
  useEffect(() => { lsSet('honey:hub:settings', settings); }, [settings]);

  // ── Auth header ──
  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  }), []);

  // ── Fetch chats (deduplicated) ──
  const fetchChats = useCallback(async (showLoading = true) => {
    if (showLoading) setChatsLoading(true);
    try {
      const [chatsRes, groupsRes] = await Promise.all([
        fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.LIST}`, { headers: authHeaders() }),
        fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GROUPS}`, { headers: authHeaders() }),
      ]);
      if (chatsRes.status === 401) { navigate('/auth'); return; }
      const chatsData = chatsRes.ok ? await chatsRes.json() : [];
      const groupsData = groupsRes.ok ? await groupsRes.json() : [];
      const merged: Chat[] = [
        ...chatsData.map((c: any) => ({ ...c, is_group: false })),
        ...groupsData.map((g: any) => ({ ...g, is_group: true })),
      ];
      const sig = JSON.stringify(merged.map(c => [c.id, c.updated_at, c.last_message?.content]));
      if (sig !== lastChatsSig.current) {
        lastChatsSig.current = sig;
        setChats(merged);
      }
    } catch { /* ignore */ } finally {
      if (showLoading) setChatsLoading(false);
    }
  }, [authHeaders, navigate]);

  // ── Fetch messages (deduplicated) ──
  const fetchChatMessages = useCallback(async (chatId: string, showLoading = false) => {
    if (chatId === 'ai' || chatId === 'saved') return;
    const chat = chats.find(c => String(c.id) === chatId);
    const endpoint = chat?.is_group
      ? API_ENDPOINTS.CHAT.GROUP_MESSAGES(chatId)
      : API_ENDPOINTS.CHAT.MESSAGES(chatId);
    if (showLoading) setChatMessagesLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, { headers: authHeaders() });
      if (res.ok) {
        const data: ChatMessage[] = await res.json();
        const sig = JSON.stringify(data.map(m => [m.id, m.content, m.edited_at]));
        if (sig !== lastMessagesSig.current) {
          lastMessagesSig.current = sig;
          setChatMessages(data);
        }
      }
    } catch { /* ignore */ } finally {
      if (showLoading) setChatMessagesLoading(false);
    }
  }, [authHeaders, chats]);

  // ── Init ──
  useEffect(() => {
    if (!user) return;
    fetchChats(true);
    const cached = localStorage.getItem('honey_ai_chat_history');
    if (cached) { try { setAiMessages(JSON.parse(cached)); } catch { /* */ } }
    const t = setInterval(() => fetchChats(false), 5000);
    return () => clearInterval(t);
  }, [user, fetchChats]);

  // ── Switch chat: reset messages, restore draft ──
  useEffect(() => {
    if (!activeChat || activeChat === 'ai') {
      setChatMessages([]);
      lastMessagesSig.current = '';
      return;
    }
    initialScrollDone.current = null;
    lastMessagesSig.current = '';
    setChatMessages([]);
    setReplyTo(null);
    setEditingMsg(null);
    setShowInChatSearch(false);
    setInChatSearch('');
    setShowInfoPanel(false);

    // Restore draft
    const draft = lsGet<string>(`honey:chat:${activeChat}:draft`, '');
    setInput(draft);

    // Mark as read
    setReadMarkers(prev => ({ ...prev, [activeChat]: new Date().toISOString() }));

    if (activeChat !== 'saved') fetchChatMessages(activeChat, true);
    const t = setInterval(() => fetchChatMessages(activeChat, false), 3000);
    return () => clearInterval(t);
  }, [activeChat, fetchChatMessages]);

  // Saved messages chat
  const savedChat = useMemo(() => chats.find(c => !c.is_group && c.other_user?.id === user?.id), [chats, user?.id]);
  useEffect(() => {
    if (activeChat === 'saved' && savedChat) {
      fetchChatMessages(String(savedChat.id), true);
      const t = setInterval(() => fetchChatMessages(String(savedChat.id), false), 3000);
      return () => clearInterval(t);
    }
  }, [activeChat, savedChat, fetchChatMessages]);

  // ── Save draft on input change (debounced) ──
  useEffect(() => {
    if (!activeChat || activeChat === 'ai' || editingMsg) return;
    const t = setTimeout(() => {
      if (input) lsSet(`honey:chat:${activeChat}:draft`, input);
      else localStorage.removeItem(`honey:chat:${activeChat}:draft`);
    }, 250);
    return () => clearTimeout(t);
  }, [input, activeChat, editingMsg]);

  // ── Auto-scroll on new messages (only if near bottom) ──
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 200;
    const isFirst = initialScrollDone.current !== activeChat;
    if (isFirst || isNearBottom) {
      requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: isFirst ? 'auto' : 'smooth' });
        initialScrollDone.current = activeChat;
      });
    }
  }, [chatMessages.length, activeChat]);

  // ── Global search debounced ──
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults({ users: [], groups: [] }); return; }
    const t = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GLOBAL_SEARCH}?search=${encodeURIComponent(searchQuery)}`, { headers: authHeaders() });
        if (res.ok) setSearchResults(await res.json());
      } catch { /* */ } finally { setIsSearching(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery, authHeaders]);

  // ── Close menu on outside click ──
  useEffect(() => {
    const onClick = () => { setActiveMenu(null); setChatCtxMenu(null); };
    if (activeMenu || chatCtxMenu) {
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    }
  }, [activeMenu, chatCtxMenu]);

  // ── Actions ──
  const handleStartChat = async (targetUserId: number | string) => {
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.CREATE}`, {
        method: 'POST', headers: authHeaders(), body: JSON.stringify({ user_id: targetUserId }),
      });
      if (res.ok) {
        const data = await res.json();
        await fetchChats(false);
        setActiveChat(String(data.id));
        setSearchQuery('');
      }
    } catch { /* */ }
  };

  const handleSendChat = async (chatId: string) => {
    const text = input.trim();
    if (!text && !selectedFile) return;
    const chat = chats.find(c => String(c.id) === chatId);
    const endpoint = chat?.is_group
      ? API_ENDPOINTS.CHAT.GROUP_SEND(chatId)
      : API_ENDPOINTS.CHAT.SEND(chatId);
    const fileToSend = selectedFile;
    const replyId = replyTo?.id || null;

    setInput('');
    setSelectedFile(null);
    setReplyTo(null);
    localStorage.removeItem(`honey:chat:${chatId}:draft`);

    try {
      const formData = new FormData();
      formData.append('content', text || (fileToSend?.name ?? ''));
      formData.append('message_type', fileToSend ? (fileToSend.type.startsWith('image/') ? 'image' : 'file') : 'text');
      if (fileToSend) formData.append('file', fileToSend);
      if (replyId) formData.append('reply_to_id', replyId);
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${getAuthToken()}` }, body: formData,
      });
      if (res.ok) await fetchChatMessages(chatId, false);
      else { const err = await res.json().catch(() => ({})); alert(err.error || err.message || 'Xabar yuborishda xatolik'); }
    } catch { /* */ }
  };

  const handleSendAI = async () => {
    const text = input.trim();
    if (!text) return;
    const ts = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const next = [...aiMessages, { role: 'user' as const, content: text, timestamp: ts }];
    setAiMessages(next); setInput(''); setAiLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.AI_CHAT}`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ message: text, systemInstruction: "Siz Honey platformasining aqlli AI yordamchisisiz. Doimo o'zbek tilida javob bering." }),
      });
      if (res.status === 401) { navigate('/auth'); return; }
      const data = await res.json();
      const final = [...next, { role: 'assistant' as const, content: data.text || data.reply || data.message || "Bo'sh javob qaytdi.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];
      setAiMessages(final);
      localStorage.setItem('honey_ai_chat_history', JSON.stringify(final));
    } catch {
      setAiMessages([...next, { role: 'assistant', content: "Server bilan aloqa yo'q.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    } finally { setAiLoading(false); }
  };

  const handleSend = () => {
    if (editingMsg) { handleEditConfirm(); return; }
    if (activeChat === 'ai') handleSendAI();
    else if (activeChat === 'saved') {
      if (savedChat) handleSendChat(String(savedChat.id));
      else handleStartChat(user.id);
    } else if (activeChat) handleSendChat(activeChat);
  };

  const handleEditConfirm = async () => {
    if (!editingMsg) return;
    const text = input.trim();
    if (!text) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.MESSAGE_EDIT(editingMsg.id)}`, {
        method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ content: text }),
      });
      if (res.ok) {
        const updated = await res.json();
        setChatMessages(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingMsg(null);
        setInput('');
      } else alert("Tahrirlashda xatolik");
    } catch { alert("Tarmoq xatosi"); }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm("Xabarni o'chirmoqchimisiz?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.MESSAGE_DELETE(msgId)}`, { method: 'DELETE', headers: authHeaders() });
      if (res.ok) setChatMessages(prev => prev.filter(m => String(m.id) !== msgId));
    } catch { /* */ }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setActiveMenu(null);
  };

  const handleToggleReaction = async (messageId: string, emoji: string, currentlyReacted: boolean) => {
    try {
      const endpoint = currentlyReacted
        ? API_ENDPOINTS.CHAT.REACTION_REMOVE(messageId, emoji)
        : API_ENDPOINTS.CHAT.REACTION_ADD(messageId);
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: currentlyReacted ? 'DELETE' : 'POST',
        headers: authHeaders(),
        body: currentlyReacted ? undefined : JSON.stringify({ emoji }),
      });
      if (!res.ok) return;
      const updated = await res.json();
      setChatMessages(prev => prev.map(m => String(m.id) === String(updated.id) ? updated : m));
    } catch { /* ignore */ }
  };

  const startReply = (msg: ChatMessage) => { setReplyTo(msg); setEditingMsg(null); composerRef.current?.focus(); setActiveMenu(null); };
  const startEdit = (msg: ChatMessage) => { setEditingMsg(msg); setReplyTo(null); setInput(msg.content); composerRef.current?.focus(); setActiveMenu(null); };
  const startForward = (msg: ChatMessage) => { setForwardMessage(msg); setShowForwardModal(true); setActiveMenu(null); };
  const jumpToMessage = (id?: string | null) => {
    if (!id) return;
    const target = messageRefs.current[id];
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    target.classList.add('ring-2', 'ring-honey');
    window.setTimeout(() => target.classList.remove('ring-2', 'ring-honey'), 1200);
  };

  const handleForwardMessage = async (targetChatId: string, isGroup: boolean) => {
    if (!forwardMessage) return;
    const endpoint = isGroup ? API_ENDPOINTS.CHAT.GROUP_SEND(targetChatId) : API_ENDPOINTS.CHAT.SEND(targetChatId);
    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ content: `↩️ ${forwardMessage.sender?.username || 'kimdir'}: ${forwardMessage.content}`, message_type: 'text' }),
      });
      if (res.ok) { setShowForwardModal(false); setForwardMessage(null); }
    } catch { /* */ }
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    setIsCreatingGroup(true);
    try {
      const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CHAT.GROUPS}`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ name: newGroupName, description: newGroupDesc, group_type: createType }),
      });
      if (res.ok) {
        const data = await res.json();
        setShowCreateModal(false); setNewGroupName(''); setNewGroupDesc('');
        await fetchChats(false);
        setActiveChat(String(data.id));
      } else { const err = await res.json().catch(() => ({})); alert(`Xatolik: ${err.detail || err.message || 'noma\'lum'}`); }
    } catch { alert("Tarmoq xatosi"); } finally { setIsCreatingGroup(false); }
  };

  const handleJoinGroup = async (groupId: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/chat/groups/${groupId}/join/`, { method: 'POST', headers: authHeaders() });
      if (res.ok) { await fetchChats(false); await fetchChatMessages(groupId, false); }
    } catch { /* */ }
  };

  const togglePin = (chatId: string) => {
    setPinnedChats(prev => prev.includes(chatId) ? prev.filter(id => id !== chatId) : [...prev, chatId]);
    setChatCtxMenu(null);
  };
  const toggleMute = (chatId: string) => {
    setMutedChats(prev => prev.includes(chatId) ? prev.filter(id => id !== chatId) : [...prev, chatId]);
    setChatCtxMenu(null);
  };
  const markChatRead = (chatId: string) => {
    setReadMarkers(prev => ({ ...prev, [chatId]: new Date().toISOString() }));
    setChatCtxMenu(null);
  };

  const clearAIHistory = () => {
    if (window.confirm("AI suhbat tarixini tozalashni xohlaysizmi?")) {
      setAiMessages([]); localStorage.removeItem('honey_ai_chat_history');
    }
  };

  const handleLogout = () => {
    if (window.confirm("Hisobdan chiqishni xohlaysizmi?")) {
      ['honey_user', 'honey_token', 'honey_refresh'].forEach(k => localStorage.removeItem(k));
      navigate('/auth');
    }
  };

  // ── Derived: filtered + sorted chat list ──
  const visibleChats = useMemo(() => {
    let list = chats.filter(c => !(c.other_user?.id === user?.id)); // exclude saved-self chat from list (shown separately)
    if (filterTab === 'groups') list = list.filter(c => c.is_group && c.group_type !== 'channel');
    else if (filterTab === 'channels') list = list.filter(c => c.is_group && c.group_type === 'channel');
    else if (filterTab === 'unread') list = list.filter(c => {
      const id = String(c.id);
      const last = c.last_message?.created_at;
      const read = readMarkers[id];
      return last && (!read || new Date(last) > new Date(read));
    });
    // sort: pinned first by updated_at desc, then rest by updated_at desc
    return [...list].sort((a, b) => {
      const ap = pinnedChats.includes(String(a.id)) ? 1 : 0;
      const bp = pinnedChats.includes(String(b.id)) ? 1 : 0;
      if (ap !== bp) return bp - ap;
      return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
    });
  }, [chats, filterTab, pinnedChats, readMarkers, user?.id]);

  const activeChatItem = useMemo(() => chats.find(c => String(c.id) === activeChat), [chats, activeChat]);
  const activeChatName = activeChat === 'ai'
    ? 'Honey AI Assistant'
    : activeChat === 'saved'
      ? 'Saqlangan xabarlar'
      : activeChatItem?.is_group ? activeChatItem.name : activeChatItem?.other_user?.username || 'Chat';

  const isUnread = (c: Chat) => {
    const last = c.last_message?.created_at;
    const read = readMarkers[String(c.id)];
    return last && (!read || new Date(last) > new Date(read));
  };

  // ── Display messages (in-chat search filter) ──
  const displayedMessages = useMemo(() => {
    if (!inChatSearch.trim()) return chatMessages;
    const q = inChatSearch.toLowerCase();
    return chatMessages.filter(m => m.content.toLowerCase().includes(q));
  }, [chatMessages, inChatSearch]);

  // ── Group messages by date for sticky separators ──
  const groupedMessages = useMemo(() => {
    const groups: { dateKey: string; label: string; items: ChatMessage[] }[] = [];
    displayedMessages.forEach(m => {
      const k = dateKey(m.created_at);
      const last = groups[groups.length - 1];
      if (!last || last.dateKey !== k) groups.push({ dateKey: k, label: dateLabel(m.created_at), items: [m] });
      else last.items.push(m);
    });
    return groups;
  }, [displayedMessages]);

  // ── Media/Files lists for info panel ──
  const mediaList = useMemo(() => chatMessages.filter(m => m.message_type === 'image' && m.file), [chatMessages]);
  const filesList = useMemo(() => chatMessages.filter(m => m.message_type === 'file' && m.file), [chatMessages]);
  const linksList = useMemo(() => chatMessages.filter(m => m.link_preview), [chatMessages]);

  // ────────────────── EMPTY-STATE (not logged in) ──────────────────
  if (!user) {
    return (
      <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn pb-64">
        <div className="w-32 h-32 bg-honey/10 rounded-[3rem] border border-honey/20 flex items-center justify-center text-5xl text-honey">
          <i className="fas fa-brain"></i>
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter honey-glow-text">Intelligence Hub</h1>
          <p className="text-xl md:text-2xl text-gray-200 font-bold leading-relaxed">Honey muloqot platformasidan foydalanish uchun tizimga kiring.</p>
          <button onClick={() => navigate('/auth')} className="bg-honey text-white px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-honey/20 hover:scale-105 transition-all">HUBGA KIRISH</button>
        </div>
      </div>
    );
  }

  // ────────────────── RENDERERS ──────────────────
  const renderLinkPreview = (preview?: LinkPreview | null) => {
    if (!preview || !settings.showPreviews) return null;
    if (preview.type === 'youtube' && preview.embed_url) {
      return (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
          <div className="flex items-center justify-between px-3 py-2 bg-red-500/10 border-b border-white/10">
            <div className="flex items-center gap-2 min-w-0"><i className="fab fa-youtube text-red-500"></i><span className="text-[10px] font-black uppercase tracking-widest text-white/80 truncate">{preview.site_name}</span></div>
            <a href={preview.url} target="_blank" rel="noreferrer" className="text-[9px] font-black uppercase tracking-widest text-red-300 hover:text-white">Ochish</a>
          </div>
          <iframe title={preview.title} src={`${preview.embed_url}?rel=0`} className="w-full aspect-video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
        </div>
      );
    }
    if (preview.type === 'instagram') {
      return (
        <a href={preview.url} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-4 rounded-2xl border border-pink-400/20 bg-pink-500/10 p-4 hover:bg-pink-500/20 transition-all">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-amber-400 flex items-center justify-center text-white shrink-0"><i className="fab fa-instagram text-xl"></i></div>
          <div className="min-w-0 flex-1"><p className="text-[10px] font-black uppercase tracking-widest text-pink-200">{preview.site_name}</p><p className="text-sm font-black text-white truncate">{preview.title}</p></div>
        </a>
      );
    }
    return (
      <a href={preview.url} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all">
        <div className="w-10 h-10 rounded-xl bg-honey/10 text-honey flex items-center justify-center shrink-0"><i className="fas fa-link"></i></div>
        <div className="min-w-0 flex-1"><p className="text-[10px] font-black uppercase tracking-widest text-white/50">{preview.site_name}</p><p className="text-sm font-bold text-white truncate">{preview.url}</p></div>
      </a>
    );
  };

  const renderMessageBubble = (msg: ChatMessage, isMine: boolean) => (
    <div className={`max-w-[85%] md:max-w-[65%] ${settings.compactMode ? 'p-2.5 md:p-3' : 'p-3.5 md:p-4'} rounded-2xl shadow-xl relative ${isMine ? 'message-bubble-user rounded-tr-sm' : 'message-bubble-other rounded-tl-sm'}`}>
      {!isMine && activeChatItem?.is_group && (
        <p className="text-[10px] font-black uppercase text-honey mb-1.5 tracking-widest opacity-80">@{msg.sender.username}</p>
      )}
      {msg.reply_to && (
        <button type="button" onClick={() => jumpToMessage(msg.reply_to?.id)} className="mb-2 px-3 py-2 rounded-xl bg-black/20 border-l-2 border-honey text-left w-full hover:bg-black/30 transition-colors">
          <p className="text-[9px] font-black uppercase text-honey tracking-widest mb-0.5">↩ {msg.reply_to.sender?.username || 'kimdir'}</p>
          <p className="text-[11px] text-white/70 truncate font-medium">{msg.reply_to.message_type === 'image' ? '🖼 Rasm' : msg.reply_to.message_type === 'file' ? '📎 Fayl' : msg.reply_to.content}</p>
        </button>
      )}
      {msg.file && msg.message_type === 'image' && (
        <img src={msg.file.startsWith('http') ? msg.file : `${API_BASE_URL}${msg.file}`} alt="rasm" className="rounded-xl max-w-full max-h-64 object-cover mb-2 cursor-pointer hover:opacity-90" onClick={() => window.open(msg.file!.startsWith('http') ? msg.file! : `${API_BASE_URL}${msg.file}`, '_blank')} />
      )}
      {msg.file && msg.message_type === 'file' && (
        <a href={msg.file.startsWith('http') ? msg.file : `${API_BASE_URL}${msg.file}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-honey text-xs font-bold underline mb-2"><i className="fas fa-file-download"></i>{msg.content}</a>
      )}
      {(msg.message_type === 'text' || (!msg.file && msg.message_type !== 'image' && msg.message_type !== 'file')) && (
        <p className={`${settings.compactMode ? 'text-[12px] md:text-[13px]' : 'text-[13px] md:text-[14px]'} font-medium leading-relaxed text-white/95 whitespace-pre-wrap break-words`}>{msg.content}</p>
      )}
      {renderLinkPreview(msg.link_preview)}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(msg.reactions || []).map((r) => {
          const reacted = (r.users || []).includes(String(user?.id));
          return (
            <button
              key={`${msg.id}-${r.emoji}`}
              type="button"
              onClick={() => handleToggleReaction(msg.id, r.emoji, reacted)}
              className={`px-2 py-0.5 rounded-full text-[11px] font-bold border transition-all ${reacted ? 'bg-honey/20 border-honey text-honey' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}`}
            >
              {r.emoji} {r.count}
            </button>
          );
        })}
        <div className="flex items-center gap-1">
          {REACTION_SET.map((emoji) => {
            const current = (msg.reactions || []).find((r) => r.emoji === emoji);
            const reacted = !!current?.users?.includes(String(user?.id));
            return (
              <button
                key={`${msg.id}-pick-${emoji}`}
                type="button"
                onClick={() => handleToggleReaction(msg.id, emoji, reacted)}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-[12px]"
                title={`Reaksiya ${emoji}`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-2 opacity-50">
        <span className="text-[9px] font-black uppercase text-white tracking-tight">{formatTime(msg.created_at)}</span>
        {msg.edited_at && <span className="text-[8px] font-bold uppercase text-white/60 italic">tahrirlangan</span>}
        {isMine && <i className="fas fa-check-double text-[9px] text-honey ml-auto"></i>}
      </div>
    </div>
  );

  const renderChatMessages = () => {
    if (chatMessagesLoading) return (<div className="flex justify-center py-10 opacity-50"><div className="w-6 h-6 border-2 border-honey border-t-transparent rounded-full animate-spin"></div></div>);
    if (groupedMessages.length === 0) return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
        <i className="fas fa-comment-alt text-5xl text-honey"></i>
        <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">{inChatSearch ? "Hech narsa topilmadi" : "Hali xabarlar mavjud emas"}</p>
      </div>
    );
    return groupedMessages.map(group => (
      <div key={group.dateKey}>
        <div className="sticky top-2 z-10 flex justify-center my-3">
          <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 shadow-lg">{group.label}</span>
        </div>
        <div className="space-y-3">
          {group.items.map(msg => {
            const isMine = msg.sender?.id === user?.id || msg.sender?.username === user?.name;
            const canEdit = isMine && msg.message_type === 'text';
            const canDelete = isMine || (activeChatItem?.is_group && activeChatItem?.admin === user?.id);
            return (
              <div key={msg.id} ref={(el) => { messageRefs.current[msg.id] = el; }} className={`flex items-end gap-2 group/msg-row ${isMine ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
                {renderMessageBubble(msg, isMine)}
                <button onClick={() => startReply(msg)} className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all opacity-0 group-hover/msg-row:opacity-100" title="Javob berish" aria-label="Javob berish">
                  <i className="fas fa-reply text-[10px]"></i>
                </button>
                <div className="relative shrink-0 opacity-0 group-hover/msg-row:opacity-100 focus-within:opacity-100 transition-opacity">
                  <button onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === msg.id ? null : msg.id); }} className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all" data-testid={`button-msg-menu-${msg.id}`}>
                    <i className="fas fa-ellipsis-v text-[10px]"></i>
                  </button>
                  {activeMenu === msg.id && (
                    <div className={`absolute ${isMine ? 'right-9' : 'left-9'} top-0 w-44 glass-premium rounded-2xl border border-white/10 shadow-2xl py-2 z-[100] animate-scaleIn backdrop-blur-2xl`} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => startReply(msg)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3"><i className="fas fa-reply text-blue-400 text-sm w-4"></i> Javob berish</button>
                      <button onClick={() => handleCopyMessage(msg.content)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3"><i className="fas fa-copy text-honey text-sm w-4"></i> Nusxa</button>
                      <button onClick={() => startForward(msg)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3"><i className="fas fa-paper-plane text-purple-400 text-sm w-4"></i> Ulashish</button>
                      {canEdit && <button onClick={() => startEdit(msg)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3"><i className="fas fa-pen text-emerald-400 text-sm w-4"></i> Tahrirlash</button>}
                      {canDelete && <button onClick={() => { handleDeleteMessage(msg.id); setActiveMenu(null); }} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-400/10 flex items-center gap-3 border-t border-white/5"><i className="fas fa-trash-alt text-sm w-4"></i> O'chirish</button>}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  const renderAIMessages = () => {
    if (aiMessages.length === 0) return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
        <i className="fas fa-robot text-5xl text-honey"></i>
        <p className="text-xs md:text-sm font-black uppercase tracking-[0.3em]">AI yordamchisi bilan suhbatni boshlang</p>
      </div>
    );
    return aiMessages.map((msg, i) => (
      <div key={i} className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
        <div className={`max-w-[85%] md:max-w-[65%] p-3.5 rounded-2xl glass-premium text-white border border-white/10 shadow-2xl ${msg.role === 'user' ? 'rounded-tr-sm bg-honey/10' : 'rounded-tl-sm'}`}>
          <p className="text-[13px] md:text-[14px] font-medium leading-relaxed whitespace-pre-wrap break-words">{msg.content}</p>
          <span className="text-[9px] font-black uppercase text-white/50 tracking-tight mt-1.5 inline-block">{msg.timestamp}</span>
        </div>
      </div>
    ));
  };

  // ────────────────── MAIN LAYOUT ──────────────────
  return (
    <div className="flex h-screen w-full overflow-hidden relative bg-[#0F172A]" data-testid="page-messenger">

      {/* ============= LEFT SIDEBAR ============= */}
      <aside className={`w-full md:w-1/3 lg:w-[340px] xl:w-[380px] flex flex-col chat-sidebar-glass shrink-0 transition-transform duration-300 ${activeChat ? 'max-md:-translate-x-full absolute md:static inset-0' : 'relative'} md:translate-x-0 z-20 h-screen shadow-2xl`}>

        {/* Top bar */}
        <div className="px-4 md:px-5 py-3.5 border-b border-white/5 flex items-center gap-3 bg-white/[0.02] shrink-0">
          <button onClick={() => setShowHamburger(true)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white border border-white/10 active:scale-95 transition-all" data-testid="button-hamburger">
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter flex-1 truncate">Honey Hub</h2>
          <button onClick={() => setShowCreateModal(true)} className="w-10 h-10 rounded-xl bg-honey/10 text-honey flex items-center justify-center border border-honey/20 hover:bg-honey/20 active:scale-95 transition-all" data-testid="button-new-chat" title="Yangi guruh/kanal">
            <i className="fas fa-pen-to-square"></i>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 md:px-5 pt-3 pb-2 shrink-0">
          <div className="relative">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Qidirish..." className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-11 pr-10 py-3 text-sm outline-none focus:border-honey/50 transition-all font-bold text-white placeholder:text-white/40" data-testid="input-search" />
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-xs"></i>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"><i className="fas fa-times-circle"></i></button>
            )}
            {isSearching && <div className="absolute right-10 top-1/2 -translate-y-1/2"><div className="w-3 h-3 border-2 border-honey border-t-transparent rounded-full animate-spin"></div></div>}
          </div>
        </div>

        {/* Filter tabs */}
        {!searchQuery && (
          <div className="px-4 md:px-5 py-2 shrink-0 flex gap-1.5 overflow-x-auto custom-scrollbar-thin">
            {([
              { k: 'all', label: 'Hammasi', icon: 'fa-comments' },
              { k: 'unread', label: 'O\'qilmagan', icon: 'fa-envelope' },
              { k: 'groups', label: 'Guruhlar', icon: 'fa-users' },
              { k: 'channels', label: 'Kanallar', icon: 'fa-bullhorn' },
            ] as { k: FilterTab; label: string; icon: string }[]).map(t => (
              <button key={t.k} onClick={() => setFilterTab(t.k)} className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${filterTab === t.k ? 'bg-honey text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`} data-testid={`tab-filter-${t.k}`}>
                <i className={`fas ${t.icon}`}></i>{t.label}
              </button>
            ))}
          </div>
        )}

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Search results */}
          {searchQuery.length > 0 && (
            <div className="pb-3">
              <div className="px-5 py-2"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-honey/70">Global qidiruv</span></div>
              {searchResults.users.length === 0 && searchResults.groups.length === 0 && !isSearching && (
                <div className="px-5 py-4 text-center"><p className="text-[10px] text-gray-500 font-bold uppercase">Hech narsa topilmadi</p></div>
              )}
              {searchResults.users.map(u => (
                <button key={`u-${u.id}`} onClick={() => handleStartChat(u.id)} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-all text-left">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20 text-xs font-black">{u.username?.substring(0,2).toUpperCase()}</div>
                  <div className="flex-1 min-w-0"><h4 className="font-bold text-white text-xs truncate">@{u.username}</h4><p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Foydalanuvchi</p></div>
                </button>
              ))}
              {searchResults.groups.map(g => (
                <button key={`g-${g.id}`} onClick={() => setActiveChat(String(g.id))} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-all text-left">
                  <div className="w-10 h-10 rounded-xl bg-honey/20 flex items-center justify-center text-honey border border-honey/20 text-xs font-black"><i className="fas fa-hashtag"></i></div>
                  <div className="flex-1 min-w-0"><h4 className="font-bold text-white text-xs truncate">{g.name}</h4><p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest">Kanal/Guruh</p></div>
                </button>
              ))}
              <div className="border-b border-white/5 my-3 mx-5"></div>
            </div>
          )}

          {/* AI assistant */}
          <button onClick={() => setActiveChat('ai')} className={`w-full flex items-center gap-3 px-4 md:px-5 py-3 transition-all ${activeChat === 'ai' ? 'bg-honey/10 border-l-2 border-honey' : 'hover:bg-white/5 border-l-2 border-transparent'}`} data-testid="chat-item-ai">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white border border-white/10 shadow-lg"><i className="fas fa-robot text-lg"></i></div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline mb-0.5"><h4 className="font-black text-white text-sm uppercase tracking-tight truncate">Honey AI</h4><span className="text-[9px] text-honey/60 font-bold">Online</span></div>
              <p className="text-[11px] text-gray-500 font-bold truncate">{aiMessages.length > 0 ? aiMessages[aiMessages.length - 1].content.slice(0, 40) : 'Sizga qanday yordam bera olaman?'}</p>
            </div>
          </button>

          {/* Saved messages */}
          <button onClick={() => setActiveChat('saved')} className={`w-full flex items-center gap-3 px-4 md:px-5 py-3 transition-all ${activeChat === 'saved' ? 'bg-honey/10 border-l-2 border-honey' : 'hover:bg-white/5 border-l-2 border-transparent'}`} data-testid="chat-item-saved">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white border border-white/10 shadow-lg shrink-0"><i className="fas fa-bookmark text-lg"></i></div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline mb-0.5"><h4 className="font-black text-white text-sm uppercase tracking-tight truncate">Saqlangan</h4></div>
              <p className="text-[11px] text-gray-500 font-bold truncate">Muhim xabarlaringiz</p>
            </div>
          </button>

          <div className="h-px bg-white/5 my-1 mx-4"></div>

          {/* Real chats list */}
          {chatsLoading ? (
            <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-honey border-t-transparent rounded-full animate-spin"></div></div>
          ) : visibleChats.length === 0 ? (
            <div className="text-center py-10 px-6 opacity-40">
              <i className="fas fa-inbox text-3xl text-white/30 mb-2"></i>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Bu yerda chatlar yo'q</p>
            </div>
          ) : visibleChats.map(chat => {
            const id = String(chat.id);
            const pinned = pinnedChats.includes(id);
            const muted = mutedChats.includes(id);
            const unread = isUnread(chat);
            const isActive = activeChat === id;
            return (
              <button key={chat.id}
                onClick={() => setActiveChat(id)}
                onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); setChatCtxMenu({ chatId: id, x: e.clientX, y: e.clientY }); }}
                className={`w-full flex items-center gap-3 px-4 md:px-5 py-3 transition-all ${isActive ? 'bg-honey/10 border-l-2 border-honey' : 'hover:bg-white/5 border-l-2 border-transparent'}`}
                data-testid={`chat-item-${id}`}
              >
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm border border-white/10 shadow-lg ${chat.is_group ? (chat.group_type === 'channel' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gradient-to-br from-honey to-amber-600') : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                    {chat.is_group ? <i className={chat.group_type === 'channel' ? 'fas fa-bullhorn' : 'fas fa-users'}></i> : (chat.other_user?.username?.substring(0, 2).toUpperCase() || 'U')}
                  </div>
                  {!chat.is_group && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></div>}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-baseline gap-2 mb-0.5">
                    <h4 className="font-black text-white text-sm uppercase tracking-tight truncate flex items-center gap-1.5">
                      {chat.is_group ? chat.name : chat.other_user?.username}
                      {muted && <i className="fas fa-bell-slash text-[10px] text-white/40"></i>}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-bold opacity-60 shrink-0">{chat.last_message?.created_at ? formatTime(chat.last_message.created_at) : ''}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-[11px] font-bold truncate ${unread ? 'text-white/90' : 'text-gray-500'}`}>{chat.last_message?.content || 'Hali xabar yo\'q...'}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {pinned && <i className="fas fa-thumbtack text-[10px] text-honey rotate-45"></i>}
                      {unread && !muted && <span className="w-2 h-2 rounded-full bg-honey shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Chat context menu (right click) */}
      {chatCtxMenu && (
        <div className="fixed z-[200] w-48 glass-premium rounded-2xl border border-white/10 shadow-2xl py-2 backdrop-blur-2xl animate-scaleIn"
             style={{ top: chatCtxMenu.y, left: chatCtxMenu.x }}
             onClick={(e) => e.stopPropagation()}>
          <button onClick={() => togglePin(chatCtxMenu.chatId)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3">
            <i className="fas fa-thumbtack text-honey text-sm w-4"></i> {pinnedChats.includes(chatCtxMenu.chatId) ? 'Yechish' : 'Pin qilish'}
          </button>
          <button onClick={() => toggleMute(chatCtxMenu.chatId)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3">
            <i className={`fas ${mutedChats.includes(chatCtxMenu.chatId) ? 'fa-bell' : 'fa-bell-slash'} text-blue-400 text-sm w-4`}></i> {mutedChats.includes(chatCtxMenu.chatId) ? 'Yoqish' : 'Ovozsiz'}
          </button>
          <button onClick={() => markChatRead(chatCtxMenu.chatId)} className="w-full px-4 py-2.5 text-left text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 flex items-center gap-3">
            <i className="fas fa-check-double text-emerald-400 text-sm w-4"></i> O'qilgan deb belgilash
          </button>
        </div>
      )}

      {/* ============= CHAT AREA ============= */}
      <main className={`flex-1 flex flex-col relative transition-all duration-300 ${!activeChat ? 'max-md:hidden' : 'max-md:block'}`}>
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0F172A] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 hexagon-bg"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white shadow-3xl mb-8 mx-auto rotate-12 hover:rotate-0 transition-transform duration-700">
                <i className="fas fa-comment-dots text-3xl md:text-5xl"></i>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">Honey Messenger</h3>
              <p className="text-gray-400 max-w-sm text-sm md:text-base font-bold leading-relaxed opacity-60">Xavfsiz, tezkor va zamonaviy muloqot. Suhbatni boshlash uchun chatni tanlang.</p>
            </div>
          </div>
        ) : (
          <>
            {/* Chat header */}
            <div className="px-4 md:px-6 py-3 md:py-4 flex items-center justify-between chat-header-glass z-30 shadow-xl border-b border-white/5">
              <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1 cursor-pointer" onClick={() => activeChat !== 'ai' && setShowInfoPanel(true)}>
                <button onClick={(e) => { e.stopPropagation(); setActiveChat(null); }} className="md:hidden w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-95"><i className="fas fa-arrow-left"></i></button>
                <div className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl ${activeChatItem?.is_group ? (activeChatItem.group_type === 'channel' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gradient-to-br from-honey to-amber-600') : 'bg-gradient-to-br from-emerald-500 to-teal-600'} flex items-center justify-center text-white font-black border border-white/10 shrink-0 shadow-lg`}>
                  {activeChat === 'ai' ? <i className="fas fa-robot"></i> : activeChat === 'saved' ? <i className="fas fa-bookmark"></i> : activeChatItem?.is_group ? <i className={activeChatItem.group_type === 'channel' ? 'fas fa-bullhorn' : 'fas fa-users'}></i> : (activeChatName || 'C').substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-black text-white text-base md:text-lg uppercase tracking-tight truncate">{activeChatName || 'Chat'}</h3>
                  <div className="flex items-center gap-1.5">
                    {activeChat !== 'ai' && activeChat !== 'saved' && !activeChatItem?.is_group && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                    <span className="text-[10px] md:text-[11px] text-blue-400/80 font-black uppercase tracking-[0.15em] truncate">
                      {activeChat === 'ai' ? 'Gemini · Online'
                        : activeChat === 'saved' ? 'Faqat siz ko\'rasiz'
                        : activeChatItem?.is_group ? `${activeChatItem.group_type === 'channel' ? 'Kanal' : 'Guruh'} · ${activeChatItem.members?.length || 1} a'zo`
                        : lastSeenLabel()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                {activeChat && !activeChatItem && activeChat !== 'ai' && activeChat !== 'saved' && (
                  <button onClick={() => handleJoinGroup(activeChat)} className="bg-honey text-black px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Qo'shilish</button>
                )}
                {activeChat !== 'ai' && (
                  <button onClick={() => { setShowInChatSearch(s => !s); setInChatSearch(''); }} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all border border-white/5" data-testid="button-in-chat-search"><i className="fas fa-search text-xs"></i></button>
                )}
                {activeChat === 'ai' && (
                  <button onClick={clearAIHistory} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-red-400 flex items-center justify-center transition-all border border-white/5" title="Tarixni tozalash"><i className="fas fa-broom text-xs"></i></button>
                )}
                {activeChat !== 'ai' && (
                  <button onClick={() => setShowInfoPanel(true)} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all border border-white/5" data-testid="button-info-panel"><i className="fas fa-info-circle text-xs"></i></button>
                )}
              </div>
            </div>

            {/* In-chat search bar */}
            {showInChatSearch && (
              <div className="px-4 md:px-6 py-2 bg-white/[0.03] border-b border-white/5 flex items-center gap-2">
                <i className="fas fa-search text-white/40 text-xs"></i>
                <input value={inChatSearch} onChange={(e) => setInChatSearch(e.target.value)} placeholder="Suhbatda qidirish..." autoFocus className="flex-1 bg-transparent outline-none text-sm text-white font-bold placeholder:text-white/30" data-testid="input-in-chat-search" />
                <span className="text-[10px] text-white/40 font-bold">{displayedMessages.length} natija</span>
                <button onClick={() => { setShowInChatSearch(false); setInChatSearch(''); }} className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60"><i className="fas fa-times text-xs"></i></button>
              </div>
            )}

            {/* Messages */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-3 md:px-6 py-4 custom-scrollbar relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none hexagon-bg"></div>
              <div className="relative z-[1]">
                {activeChat === 'ai' ? renderAIMessages() : renderChatMessages()}
                {aiLoading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="p-4 rounded-2xl glass-premium text-honey/60 border border-white/10 rounded-tl-sm"><i className="fas fa-ellipsis-h animate-bounce"></i></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Composer */}
            <div className="px-3 md:px-6 py-3 md:py-4 chat-header-glass border-t border-white/5">
              {/* Reply / Edit preview */}
              {(replyTo || editingMsg) && (
                <div className="max-w-5xl mx-auto mb-2 flex items-center gap-3 px-3 py-2 rounded-xl bg-honey/5 border-l-2 border-honey">
                  <i className={`fas ${editingMsg ? 'fa-pen' : 'fa-reply'} text-honey text-sm`}></i>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-widest text-honey">{editingMsg ? 'Tahrirlash' : `Javob: ${replyTo?.sender?.username || 'kimdir'}`}</p>
                    <p className="text-[11px] text-white/70 truncate font-medium">{editingMsg ? editingMsg.content : (replyTo?.message_type === 'image' ? '🖼 Rasm' : replyTo?.message_type === 'file' ? '📎 Fayl' : replyTo?.content)}</p>
                  </div>
                  <button onClick={() => { setReplyTo(null); setEditingMsg(null); if (editingMsg) setInput(''); }} className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white"><i className="fas fa-times text-xs"></i></button>
                </div>
              )}
              <div className="flex items-end gap-2 md:gap-3 max-w-5xl mx-auto">
                {!editingMsg && (
                  <>
                    <button onClick={() => fileInputRef.current?.click()} className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-honey transition-all border border-white/10 flex items-center justify-center active:scale-95 shrink-0" data-testid="button-attach"><i className="fas fa-paperclip"></i></button>
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  </>
                )}
                <div className="flex-1 relative">
                  {selectedFile && (
                    <div className="absolute bottom-full left-0 right-0 mb-2 p-2.5 bg-honey/10 border border-honey/30 rounded-xl flex items-center gap-3 shadow-2xl backdrop-blur-xl">
                      <div className="w-8 h-8 rounded-lg bg-honey flex items-center justify-center text-black"><i className={`fas ${selectedFile.type.startsWith('image/') ? 'fa-image' : 'fa-file'}`}></i></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-black text-white truncate">{selectedFile.name}</p>
                        <p className="text-[9px] text-white/60 font-bold">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button onClick={() => setSelectedFile(null)} className="text-honey hover:text-white w-7 h-7 flex items-center justify-center"><i className="fas fa-times"></i></button>
                    </div>
                  )}
                  <textarea
                    ref={composerRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && settings.enterToSend) { e.preventDefault(); handleSend(); }
                      if (e.key === 'Escape') { setReplyTo(null); setEditingMsg(null); if (editingMsg) setInput(''); }
                    }}
                    placeholder={editingMsg ? 'Xabarni tahrirlang...' : 'Xabar yozing...'}
                    rows={1}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm md:text-[15px] outline-none focus:border-honey/50 transition-all font-medium text-white resize-none max-h-40 placeholder:text-white/30"
                    data-testid="input-composer"
                  />
                </div>
                <button onClick={handleSend}
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl active:scale-95 shrink-0 ${input.trim() || selectedFile || editingMsg ? 'bg-honey text-black hover:brightness-110' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                  disabled={!input.trim() && !selectedFile && !editingMsg}
                  data-testid="button-send">
                  <i className={`fas ${editingMsg ? 'fa-check' : 'fa-paper-plane'} text-base md:text-lg`}></i>
                </button>
              </div>
              {input.length === 0 && !editingMsg && !replyTo && (
                <p className="text-[9px] text-white/30 text-center mt-2 font-bold uppercase tracking-widest">Enter — yuborish · Shift+Enter — yangi qator</p>
              )}
            </div>
          </>
        )}
      </main>

      {/* ============= RIGHT INFO PANEL ============= */}
      {showInfoPanel && activeChat && activeChat !== 'ai' && (
        <>
          <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none md:hidden" onClick={() => setShowInfoPanel(false)}></div>
          <aside className="fixed md:absolute right-0 top-0 bottom-0 w-full md:w-[340px] xl:w-[380px] z-[90] chat-sidebar-glass border-l border-white/10 shadow-2xl flex flex-col animate-slideInRight">
            <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-3 shrink-0">
              <button onClick={() => setShowInfoPanel(false)} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"><i className="fas fa-times"></i></button>
              <h3 className="text-base font-black text-white uppercase tracking-tighter flex-1">Ma'lumot</h3>
            </div>
            <div className="overflow-y-auto custom-scrollbar flex-1">
              {/* Avatar + name */}
              <div className="px-5 py-6 text-center border-b border-white/5">
                <div className={`w-24 h-24 rounded-3xl mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black border border-white/10 shadow-2xl ${activeChatItem?.is_group ? (activeChatItem.group_type === 'channel' ? 'bg-gradient-to-br from-purple-600 to-indigo-700' : 'bg-gradient-to-br from-honey to-amber-600') : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                  {activeChat === 'saved' ? <i className="fas fa-bookmark"></i> : activeChatItem?.is_group ? <i className={activeChatItem.group_type === 'channel' ? 'fas fa-bullhorn' : 'fas fa-users'}></i> : (activeChatName || 'C').substring(0, 2).toUpperCase()}
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">{activeChatName}</h3>
                <p className="text-[11px] text-white/50 font-bold uppercase tracking-widest">
                  {activeChatItem?.is_group ? `${activeChatItem.members?.length || 1} a'zo` : 'Foydalanuvchi'}
                </p>
                {activeChatItem?.is_group && activeChatItem.description && (
                  <p className="text-xs text-white/70 font-medium mt-3 leading-relaxed">{activeChatItem.description}</p>
                )}
              </div>

              {/* Quick actions */}
              <div className="px-5 py-4 border-b border-white/5 space-y-2">
                {activeChatItem && (
                  <>
                    <button onClick={() => toggleMute(String(activeChatItem.id))} className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white"><i className="fas fa-bell-slash text-blue-400 w-4"></i> Bildirishnomalar</span>
                      <span className={`w-9 h-5 rounded-full transition-all ${mutedChats.includes(String(activeChatItem.id)) ? 'bg-white/20' : 'bg-emerald-500'}`}><span className={`block w-4 h-4 rounded-full bg-white shadow mt-0.5 transition-transform ${mutedChats.includes(String(activeChatItem.id)) ? 'translate-x-0.5' : 'translate-x-[18px]'}`}></span></span>
                    </button>
                    <button onClick={() => togglePin(String(activeChatItem.id))} className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                      <span className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-white"><i className="fas fa-thumbtack text-honey w-4"></i> Pin qilish</span>
                      <span className={`w-9 h-5 rounded-full transition-all ${pinnedChats.includes(String(activeChatItem.id)) ? 'bg-honey' : 'bg-white/20'}`}><span className={`block w-4 h-4 rounded-full bg-white shadow mt-0.5 transition-transform ${pinnedChats.includes(String(activeChatItem.id)) ? 'translate-x-[18px]' : 'translate-x-0.5'}`}></span></span>
                    </button>
                  </>
                )}
              </div>

              {/* Tabs */}
              <div className="px-5 pt-4 pb-2 flex gap-1.5">
                {([
                  { k: 'media', label: 'Media', icon: 'fa-image', count: mediaList.length },
                  { k: 'files', label: 'Fayl', icon: 'fa-file', count: filesList.length },
                  { k: 'links', label: 'Link', icon: 'fa-link', count: linksList.length },
                ] as { k: 'media' | 'files' | 'links'; label: string; icon: string; count: number }[]).map(t => (
                  <button key={t.k} onClick={() => setInfoTab(t.k)} className={`flex-1 px-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 ${infoTab === t.k ? 'bg-honey text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
                    <i className={`fas ${t.icon}`}></i>{t.label}<span className="opacity-60">{t.count}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="px-5 py-4">
                {infoTab === 'media' && (
                  mediaList.length === 0 ? <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest py-8">Media yo'q</p>
                  : <div className="grid grid-cols-3 gap-1.5">{mediaList.map(m => (
                      <a key={m.id} href={m.file!.startsWith('http') ? m.file! : `${API_BASE_URL}${m.file}`} target="_blank" rel="noreferrer" className="aspect-square rounded-lg overflow-hidden bg-white/5 hover:opacity-80 transition-opacity">
                        <img src={m.file!.startsWith('http') ? m.file! : `${API_BASE_URL}${m.file}`} className="w-full h-full object-cover" alt="" />
                      </a>
                    ))}</div>
                )}
                {infoTab === 'files' && (
                  filesList.length === 0 ? <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest py-8">Fayl yo'q</p>
                  : <div className="space-y-1.5">{filesList.map(m => (
                      <a key={m.id} href={m.file!.startsWith('http') ? m.file! : `${API_BASE_URL}${m.file}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                        <div className="w-10 h-10 rounded-lg bg-honey/20 text-honey flex items-center justify-center"><i className="fas fa-file"></i></div>
                        <div className="flex-1 min-w-0"><p className="text-xs font-bold text-white truncate">{m.content}</p><p className="text-[9px] text-white/40 font-bold uppercase">{formatTime(m.created_at)}</p></div>
                        <i className="fas fa-download text-white/40"></i>
                      </a>
                    ))}</div>
                )}
                {infoTab === 'links' && (
                  linksList.length === 0 ? <p className="text-center text-[10px] text-white/40 font-bold uppercase tracking-widest py-8">Link yo'q</p>
                  : <div className="space-y-1.5">{linksList.map(m => m.link_preview && (
                      <a key={m.id} href={m.link_preview.url} target="_blank" rel="noreferrer" className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
                        <p className="text-[10px] font-black uppercase tracking-widest text-honey/80 truncate">{m.link_preview.site_name}</p>
                        <p className="text-xs font-bold text-white truncate">{m.link_preview.url}</p>
                      </a>
                    ))}</div>
                )}
              </div>
            </div>
          </aside>
        </>
      )}

      {/* ============= HAMBURGER DRAWER ============= */}
      {showHamburger && (
        <>
          <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm" onClick={() => setShowHamburger(false)}></div>
          <aside className="fixed top-0 left-0 bottom-0 w-[280px] z-[160] chat-sidebar-glass shadow-2xl border-r border-white/10 animate-slideInLeft flex flex-col">
            {/* Profile header */}
            <div className="p-5 border-b border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-honey to-amber-600 flex items-center justify-center text-white text-xl font-black border border-white/10 shadow-lg mb-3">
                {(user?.name || user?.username || 'U').substring(0, 2).toUpperCase()}
              </div>
              <h3 className="text-base font-black text-white uppercase tracking-tighter truncate">{user?.name || user?.username}</h3>
              <p className="text-[11px] text-white/50 font-bold truncate">{user?.email}</p>
            </div>
            {/* Menu */}
            <nav className="flex-1 overflow-y-auto custom-scrollbar py-2">
              {[
                { icon: 'fa-user', label: 'Profil', onClick: () => { setShowHamburger(false); navigate('/profile'); } },
                { icon: 'fa-bookmark', label: 'Saqlangan xabarlar', onClick: () => { setShowHamburger(false); setActiveChat('saved'); } },
                { icon: 'fa-robot', label: 'Honey AI', onClick: () => { setShowHamburger(false); setActiveChat('ai'); } },
                { icon: 'fa-cog', label: 'Sozlamalar', onClick: () => { setShowHamburger(false); setShowSettings(true); } },
                { icon: 'fa-home', label: 'Bosh sahifa', onClick: () => { setShowHamburger(false); navigate('/'); } },
              ].map((item, i) => (
                <button key={i} onClick={item.onClick} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 transition-all text-left">
                  <i className={`fas ${item.icon} text-honey/80 w-5`}></i>
                  <span className="text-[12px] font-black uppercase tracking-widest text-white">{item.label}</span>
                </button>
              ))}
              <div className="my-2 mx-5 h-px bg-white/5"></div>
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-red-500/10 transition-all text-left">
                <i className="fas fa-sign-out-alt text-red-400 w-5"></i>
                <span className="text-[12px] font-black uppercase tracking-widest text-red-400">Chiqish</span>
              </button>
            </nav>
            <div className="p-4 border-t border-white/5 text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Honey Hub · v1.0</p>
            </div>
          </aside>
        </>
      )}

      {/* ============= SETTINGS MODAL ============= */}
      {showSettings && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSettings(false)}></div>
          <div className="relative w-full max-w-md glass-premium rounded-[2rem] border border-white/10 shadow-2xl animate-scaleIn max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-white/5 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-black text-white uppercase tracking-tighter flex items-center gap-3"><i className="fas fa-cog text-honey"></i> Sozlamalar</h2>
              <button onClick={() => setShowSettings(false)} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center"><i className="fas fa-times"></i></button>
            </div>
            <div className="overflow-y-auto custom-scrollbar p-5 space-y-6">
              {/* Chat */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-honey/80 mb-3">Suhbat</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Enter — yuborish</span>
                    <input type="checkbox" checked={settings.enterToSend} onChange={(e) => setSettings(s => ({ ...s, enterToSend: e.target.checked }))} className="w-5 h-5 accent-honey" data-testid="setting-enter-to-send" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Link previewlar</span>
                    <input type="checkbox" checked={settings.showPreviews} onChange={(e) => setSettings(s => ({ ...s, showPreviews: e.target.checked }))} className="w-5 h-5 accent-honey" />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Compact rejim</span>
                    <input type="checkbox" checked={settings.compactMode} onChange={(e) => setSettings(s => ({ ...s, compactMode: e.target.checked }))} className="w-5 h-5 accent-honey" />
                  </label>
                </div>
              </div>
              {/* Notifications */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-honey/80 mb-3">Bildirishnomalar</h3>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
                    <span className="text-[11px] font-black uppercase tracking-widest text-white">Tovush</span>
                    <input type="checkbox" checked={settings.soundOn} onChange={(e) => setSettings(s => ({ ...s, soundOn: e.target.checked }))} className="w-5 h-5 accent-honey" />
                  </label>
                  <p className="text-[9px] text-white/40 font-bold px-3 leading-relaxed">{mutedChats.length} ta chat ovozsiz qilingan</p>
                </div>
              </div>
              {/* Storage */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-honey/80 mb-3">Saqlash</h3>
                <button onClick={() => {
                  if (window.confirm("Barcha lokal kesh tozalansinmi? (chatlar saqlanib qoladi)")) {
                    Object.keys(localStorage).filter(k => k.startsWith('honey:chat:') && k.endsWith(':draft')).forEach(k => localStorage.removeItem(k));
                    alert('Keshlar tozalandi');
                  }
                }} className="w-full p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"><i className="fas fa-trash"></i> Draftlarni tozalash</button>
              </div>
              {/* Shortcuts */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-honey/80 mb-3">Klaviatura</h3>
                <div className="space-y-1.5 text-[11px] text-white/70 font-medium">
                  <div className="flex justify-between p-2 rounded-lg bg-white/5"><span>Yuborish</span><kbd className="px-2 py-0.5 bg-white/10 rounded font-mono text-[10px]">Enter</kbd></div>
                  <div className="flex justify-between p-2 rounded-lg bg-white/5"><span>Yangi qator</span><kbd className="px-2 py-0.5 bg-white/10 rounded font-mono text-[10px]">Shift+Enter</kbd></div>
                  <div className="flex justify-between p-2 rounded-lg bg-white/5"><span>Bekor qilish</span><kbd className="px-2 py-0.5 bg-white/10 rounded font-mono text-[10px]">Esc</kbd></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============= CREATE GROUP MODAL ============= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="relative w-full max-w-md glass-premium p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-2xl animate-scaleIn">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6">Yangi yaratish</h2>
            <div className="flex gap-3 mb-5">
              <button onClick={() => setCreateType('group')} className={`flex-1 py-3 rounded-xl border-2 transition-all font-black text-[11px] uppercase tracking-widest ${createType === 'group' ? 'border-honey bg-honey/10 text-honey' : 'border-white/5 text-gray-500'}`}><i className="fas fa-users mb-1.5 block text-base"></i>Guruh</button>
              <button onClick={() => setCreateType('channel')} className={`flex-1 py-3 rounded-xl border-2 transition-all font-black text-[11px] uppercase tracking-widest ${createType === 'channel' ? 'border-purple-500 bg-purple-500/10 text-purple-400' : 'border-white/5 text-gray-500'}`}><i className="fas fa-bullhorn mb-1.5 block text-base"></i>Kanal</button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nomi" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-honey transition-all font-bold text-white" />
              <textarea placeholder="Tavsif (ixtiyoriy)" value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-honey transition-all font-bold text-white resize-none h-24" />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest text-gray-500 hover:text-white transition-all">Bekor</button>
              <button onClick={handleCreateGroup} disabled={isCreatingGroup || !newGroupName.trim()} className="flex-1 bg-honey text-black py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isCreatingGroup ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div> : "Yaratish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============= FORWARD MODAL ============= */}
      {showForwardModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowForwardModal(false)}></div>
          <div className="relative w-full max-w-md glass-premium p-6 rounded-[2rem] border border-white/10 shadow-2xl animate-scaleIn max-h-[80vh] flex flex-col">
            <h2 className="text-base font-black text-white uppercase tracking-tighter mb-4 flex items-center gap-3"><i className="fas fa-share text-honey"></i>Xabarni ulashish</h2>
            <div className="space-y-2 overflow-y-auto custom-scrollbar pr-2 flex-1">
              {savedChat && (
                <button onClick={() => handleForwardMessage(String(savedChat.id), false)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-honey/10 border border-white/5 hover:border-honey/30 transition-all text-left">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white"><i className="fas fa-bookmark"></i></div>
                  <h4 className="font-bold text-white text-sm flex-1">Saqlangan xabarlar</h4>
                </button>
              )}
              {chats.filter(c => !(c.other_user?.id === user?.id)).map(chat => (
                <button key={chat.id} onClick={() => handleForwardMessage(String(chat.id), !!chat.is_group)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-honey/10 border border-white/5 hover:border-honey/30 transition-all text-left">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${chat.is_group ? 'bg-purple-500/20 text-purple-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {chat.is_group ? <i className="fas fa-users"></i> : (chat.other_user?.username?.substring(0, 2).toUpperCase())}
                  </div>
                  <h4 className="font-bold text-white text-sm flex-1 truncate">{chat.is_group ? chat.name : chat.other_user?.username}</h4>
                </button>
              ))}
            </div>
            <button onClick={() => setShowForwardModal(false)} className="mt-4 w-full py-3 rounded-xl bg-white/5 text-gray-400 font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all">Bekor</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
