(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getChatById",
    ()=>getChatById,
    "getMessagesForChat",
    ()=>getMessagesForChat,
    "getNotificationsForUser",
    ()=>getNotificationsForUser,
    "getPostsByUser",
    ()=>getPostsByUser,
    "getStoriesForUser",
    ()=>getStoriesForUser,
    "getUserById",
    ()=>getUserById,
    "mockChats",
    ()=>mockChats,
    "mockFiles",
    ()=>mockFiles,
    "mockMeetings",
    ()=>mockMeetings,
    "mockMessages",
    ()=>mockMessages,
    "mockNotifications",
    ()=>mockNotifications,
    "mockPosts",
    ()=>mockPosts,
    "mockStories",
    ()=>mockStories,
    "mockStreams",
    ()=>mockStreams,
    "mockUsers",
    ()=>mockUsers,
    "mockVideos",
    ()=>mockVideos
]);
const mockUsers = [
    {
        id: 'u1',
        username: 'jasur_karimov',
        displayName: 'Jasur Karimov',
        email: 'jasur@example.com',
        avatar: undefined,
        bio: 'Software engineer & tech enthusiast. Building the future one line at a time. 🚀',
        status: 'online',
        role: 'premium',
        isVerified: true,
        isPremium: true,
        followers: 12400,
        following: 890,
        postsCount: 342,
        joinedAt: '2024-01-15T10:00:00Z',
        lastSeen: new Date().toISOString(),
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        },
        profile: {
            bio: 'Software engineer & tech enthusiast. Building the future one line at a time. 🚀',
            location: 'Tashkent, Uzbekistan',
            website: 'https://jasur.dev',
            birthday: '1995-06-15',
            interests: [
                'technology',
                'photography',
                'travel',
                'AI'
            ],
            socialLinks: {
                twitter: 'jasurdev',
                github: 'jasurkarimov'
            }
        }
    },
    {
        id: 'u2',
        username: 'dilnoza_rakhimova',
        displayName: 'Dilnoza Rakhimova',
        email: 'dilnoza@example.com',
        avatar: undefined,
        bio: 'UX designer crafting beautiful digital experiences ✨',
        status: 'online',
        role: 'premium',
        isVerified: true,
        isPremium: true,
        followers: 8200,
        following: 456,
        postsCount: 189,
        joinedAt: '2024-02-20T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u3',
        username: 'timur_aliyev',
        displayName: 'Timur Aliyev',
        email: 'timur@example.com',
        avatar: undefined,
        bio: 'Full-stack developer | Open source contributor | Coffee lover ☕',
        status: 'away',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 3400,
        following: 678,
        postsCount: 95,
        joinedAt: '2024-03-10T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: false,
                messagePreview: true,
                groupNotifications: false,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: false,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u4',
        username: 'nodira_ushakova',
        displayName: 'Nodira Ushakova',
        email: 'nodira@example.com',
        avatar: undefined,
        bio: 'Digital artist & illustrator 🎨 Creating worlds from pixels',
        status: 'online',
        role: 'user',
        isVerified: true,
        isPremium: false,
        followers: 15600,
        following: 312,
        postsCount: 567,
        joinedAt: '2023-11-05T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u5',
        username: 'alex_chen',
        displayName: 'Alex Chen',
        email: 'alex@example.com',
        avatar: undefined,
        bio: 'Product designer at a fintech startup. Design systems advocate.',
        status: 'offline',
        role: 'user',
        isVerified: false,
        isPremium: true,
        followers: 5200,
        following: 743,
        postsCount: 210,
        joinedAt: '2024-01-30T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: false,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: false
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u6',
        username: 'sardor_mirzayev',
        displayName: 'Sardor Mirzayev',
        email: 'sardor@example.com',
        avatar: undefined,
        bio: 'Data scientist & ML engineer. Turning data into insights 📊',
        status: 'busy',
        role: 'moderator',
        isVerified: true,
        isPremium: false,
        followers: 9800,
        following: 234,
        postsCount: 156,
        joinedAt: '2023-09-20T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u7',
        username: 'maria_garcia',
        displayName: 'Maria Garcia',
        email: 'maria@example.com',
        avatar: undefined,
        bio: 'Content creator & lifestyle blogger. Living my best life ✨',
        status: 'online',
        role: 'user',
        isVerified: true,
        isPremium: true,
        followers: 24500,
        following: 567,
        postsCount: 890,
        joinedAt: '2023-06-10T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u8',
        username: 'bobur_toshmatov',
        displayName: 'Bobur Toshmatov',
        email: 'bobur@example.com',
        avatar: undefined,
        bio: 'Backend engineer | Rust & Go enthusiast | Distributed systems',
        status: 'offline',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 2100,
        following: 890,
        postsCount: 67,
        joinedAt: '2024-04-05T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: false,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: false,
                liveNotifications: true
            },
            privacy: {
                profileVisibility: 'friends',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: false,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u9',
        username: 'yuki_tanaka',
        displayName: 'Yuki Tanaka',
        email: 'yuki@example.com',
        avatar: undefined,
        bio: 'iOS developer by day, game dev by night 🎮',
        status: 'online',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 6700,
        following: 445,
        postsCount: 234,
        joinedAt: '2024-02-14T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: true,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    },
    {
        id: 'u10',
        username: 'olivia_smith',
        displayName: 'Olivia Smith',
        email: 'olivia@example.com',
        avatar: undefined,
        bio: 'Marketing manager | Brand strategist | Coffee addict ☕',
        status: 'away',
        role: 'user',
        isVerified: false,
        isPremium: false,
        followers: 4300,
        following: 678,
        postsCount: 145,
        joinedAt: '2024-03-25T10:00:00Z',
        settings: {
            theme: 'dark',
            language: 'en',
            notifications: {
                pushEnabled: true,
                emailEnabled: true,
                soundEnabled: false,
                messagePreview: true,
                groupNotifications: true,
                liveNotifications: false
            },
            privacy: {
                profileVisibility: 'public',
                onlineStatus: true,
                readReceipts: true,
                typingIndicator: true,
                lastSeen: true
            },
            appearance: {
                fontSize: 'medium',
                compactMode: false,
                animations: true
            }
        }
    }
];
const mockMessages = [
    {
        id: 'm1',
        chatId: 'c1',
        senderId: 'u2',
        content: 'Hey Jasur! Have you seen the new design system updates? They look incredible 🔥',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🔥',
                userIds: [
                    'u1'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    {
        id: 'm2',
        chatId: 'c1',
        senderId: 'u1',
        content: 'Yes! The glassmorphism approach is exactly what we needed. The dark mode variant is stunning.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '💯',
                userIds: [
                    'u2'
                ]
            },
            {
                emoji: '✨',
                userIds: [
                    'u2'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString()
    },
    {
        id: 'm3',
        chatId: 'c1',
        senderId: 'u2',
        content: 'I also added some micro-interactions with Framer Motion. Want me to share the prototype?',
        type: 'text',
        status: 'read',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString()
    },
    {
        id: 'm4',
        chatId: 'c2',
        senderId: 'u3',
        content: 'The deployment went smoothly. All services are up and running 🚀',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '🎉',
                userIds: [
                    'u1',
                    'u6'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u6'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'm5',
        chatId: 'c2',
        senderId: 'u6',
        content: 'Great work Timur! The API response times are down to 45ms average. Sardor optimized the queries.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '💪',
                userIds: [
                    'u3',
                    'u1'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u3'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
        id: 'm6',
        chatId: 'c2',
        senderId: 'u1',
        content: 'Amazing team effort! Let\'s push the next feature branch tomorrow morning.',
        type: 'text',
        status: 'read',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'm7',
        chatId: 'c3',
        senderId: 'u4',
        content: 'Just finished the new illustration set for the onboarding flow! Check it out 🎨',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '😍',
                userIds: [
                    'u1',
                    'u2',
                    'u5'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    },
    {
        id: 'm8',
        chatId: 'c3',
        senderId: 'u5',
        content: 'Nodira these are beautiful! The color palette is perfect for our brand.',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '❤️',
                userIds: [
                    'u4'
                ]
            }
        ],
        attachments: [],
        mentions: [
            'u4'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString()
    },
    {
        id: 'm9',
        chatId: 'c4',
        senderId: 'u7',
        content: 'Going live in 10 minutes! Today we\'re discussing the latest web design trends for 2025 🎬',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '🎬',
                userIds: [
                    'u1',
                    'u9',
                    'u10'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
        id: 'm10',
        chatId: 'c5',
        senderId: 'u9',
        content: 'Just published my first indie game on the App Store! It\'s a puzzle adventure called "Crystal Maze" 🎮',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🎮',
                userIds: [
                    'u1'
                ]
            },
            {
                emoji: '🎉',
                userIds: [
                    'u3'
                ]
            },
            {
                emoji: '🏆',
                userIds: [
                    'u6'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
        id: 'm11',
        chatId: 'c6',
        senderId: 'u10',
        content: 'The Q4 marketing report is ready for review. Revenue is up 23% from last quarter! 📈',
        type: 'text',
        status: 'delivered',
        reactions: [],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
    },
    {
        id: 'm12',
        chatId: 'c7',
        senderId: 'u1',
        content: 'Welcome to the Honey Design Community! Feel free to share your work and get feedback 🍯',
        type: 'text',
        status: 'read',
        reactions: [
            {
                emoji: '🍯',
                userIds: [
                    'u2',
                    'u3',
                    'u4',
                    'u5'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'm13',
        chatId: 'c8',
        senderId: 'u6',
        content: '📢 Weekly ML paper reading session tomorrow at 7PM Tashkent time. This week: Attention Is All You Need revisited.',
        type: 'text',
        status: 'delivered',
        reactions: [
            {
                emoji: '📚',
                userIds: [
                    'u1',
                    'u3'
                ]
            }
        ],
        attachments: [],
        mentions: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
const mockChats = [
    {
        id: 'c1',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-01-15T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u2',
                role: 'member',
                joinedAt: '2024-01-15T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[2],
        unreadCount: 1,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 1).toISOString()
    },
    {
        id: 'c2',
        type: 'group',
        name: 'Dev Team 🛠️',
        avatar: undefined,
        description: 'Development team coordination',
        participants: [
            {
                userId: 'u1',
                role: 'admin',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u3',
                role: 'member',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u6',
                role: 'member',
                joinedAt: '2024-01-20T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u8',
                role: 'member',
                joinedAt: '2024-04-05T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u1'
        ],
        memberCount: 4,
        lastMessage: mockMessages[5],
        unreadCount: 2,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-20T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'c3',
        type: 'group',
        name: 'Design Studio',
        avatar: undefined,
        description: 'Creative discussions and design reviews',
        participants: [
            {
                userId: 'u2',
                role: 'admin',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u4',
                role: 'member',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u5',
                role: 'member',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u2'
        ],
        memberCount: 3,
        lastMessage: mockMessages[7],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 55).toISOString()
    },
    {
        id: 'c4',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-03-01T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u7',
                role: 'member',
                joinedAt: '2024-03-01T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[8],
        unreadCount: 0,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-03-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
    },
    {
        id: 'c5',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-02-14T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u9',
                role: 'member',
                joinedAt: '2024-02-14T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[9],
        unreadCount: 0,
        isPinned: false,
        isMuted: true,
        createdAt: '2024-02-14T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString()
    },
    {
        id: 'c6',
        type: 'private',
        participants: [
            {
                userId: 'u1',
                role: 'member',
                joinedAt: '2024-03-25T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u10',
                role: 'member',
                joinedAt: '2024-03-25T10:00:00Z',
                isMuted: false
            }
        ],
        lastMessage: mockMessages[10],
        unreadCount: 1,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-03-25T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString()
    },
    {
        id: 'c7',
        type: 'channel',
        name: 'Honey Design Community',
        avatar: undefined,
        description: 'Official design community for Honey platform',
        participants: [
            {
                userId: 'u1',
                role: 'owner',
                joinedAt: '2024-01-10T10:00:00Z',
                isMuted: false
            },
            {
                userId: 'u2',
                role: 'admin',
                joinedAt: '2024-01-10T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u1',
            'u2'
        ],
        memberCount: 1240,
        isPrivate: false,
        category: 'Design',
        lastMessage: mockMessages[11],
        unreadCount: 5,
        isPinned: true,
        isMuted: false,
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'c8',
        type: 'channel',
        name: 'ML & Data Science',
        avatar: undefined,
        description: 'Machine learning discussions, paper reviews, and AI news',
        participants: [
            {
                userId: 'u6',
                role: 'owner',
                joinedAt: '2024-02-01T10:00:00Z',
                isMuted: false
            }
        ],
        admins: [
            'u6'
        ],
        memberCount: 3200,
        isPrivate: false,
        category: 'Technology',
        lastMessage: mockMessages[12],
        unreadCount: 1,
        isPinned: false,
        isMuted: false,
        createdAt: '2024-02-01T10:00:00Z',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
// ============================================
// Mock Posts
// ============================================
const mockComments = [
    {
        id: 'cm1',
        postId: 'p1',
        authorId: 'u2',
        content: 'This is absolutely gorgeous! The attention to detail is incredible 🔥',
        likes: 12,
        isLiked: false,
        replies: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'cm2',
        postId: 'p1',
        authorId: 'u4',
        content: 'Love the color transitions. Very smooth!',
        likes: 8,
        isLiked: true,
        replies: [],
        createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString()
    },
    {
        id: 'cm3',
        postId: 'p2',
        authorId: 'u3',
        content: 'The golden hour shots are magical. What camera did you use?',
        likes: 5,
        isLiked: false,
        replies: [
            {
                id: 'cm3r1',
                postId: 'p2',
                authorId: 'u7',
                content: 'Canon R5 with a 24-70mm f/2.8 lens! 📸',
                likes: 3,
                isLiked: false,
                replies: [],
                createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString()
            }
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    }
];
const mockPosts = [
    {
        id: 'p1',
        authorId: 'u4',
        content: 'New illustration series: "Digital Botanics" 🌿✨ Exploring the intersection of nature and technology through digital art. Each piece took about 12 hours to complete.',
        type: 'image',
        visibility: 'public',
        media: [],
        hashtags: [
            '#DigitalArt',
            '#Illustration',
            '#Botanics',
            '#CreativeProcess'
        ],
        mentions: [],
        likes: 847,
        comments: [
            mockComments[0],
            mockComments[1]
        ],
        commentCount: 24,
        shares: 56,
        isLiked: true,
        isShared: false,
        isBookmarked: true,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
        id: 'p2',
        authorId: 'u7',
        content: 'Golden hour in Tashkent never disappoints 🌅 The way the light hits the old city walls is something truly magical. #Photography #GoldenHour #Tashkent #Travel',
        type: 'image',
        visibility: 'public',
        media: [],
        hashtags: [
            '#Photography',
            '#GoldenHour',
            '#Tashkent',
            '#Travel'
        ],
        mentions: [],
        likes: 2340,
        comments: [
            mockComments[2]
        ],
        commentCount: 89,
        shares: 134,
        isLiked: false,
        isShared: true,
        isBookmarked: false,
        isPinned: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
    },
    {
        id: 'p3',
        authorId: 'u1',
        content: 'Just shipped a major update to our design system! Here\'s what\'s new:\n\n✅ Glassmorphism component library\n✅ 50+ new animations\n✅ Dark mode improvements\n✅ Accessibility audit passed\n\nBuilding in public feels great! 🚀',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#BuildInPublic',
            '#DesignSystem',
            '#OpenSource'
        ],
        mentions: [],
        likes: 456,
        comments: [],
        commentCount: 32,
        shares: 78,
        isLiked: false,
        isShared: false,
        isBookmarked: false,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
        id: 'p4',
        authorId: 'u6',
        content: 'Exciting results from our latest ML experiment! Our new model achieved 97.3% accuracy on the benchmark dataset, a 4.2% improvement over the previous state-of-the-art. Paper coming soon! 📊 #MachineLearning #AI',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#MachineLearning',
            '#AI',
            '#Research',
            '#DataScience'
        ],
        mentions: [],
        likes: 892,
        comments: [],
        commentCount: 67,
        shares: 156,
        isLiked: true,
        isShared: false,
        isBookmarked: true,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'p5',
        authorId: 'u5',
        content: 'Redesigned the entire onboarding flow. Conversion rate went from 34% to 58%. The key insight? Less is more. We cut the steps from 7 to 3 and made each one count. #UXDesign #ProductDesign',
        type: 'text',
        visibility: 'public',
        media: [],
        hashtags: [
            '#UXDesign',
            '#ProductDesign',
            '#ConversionOptimization'
        ],
        mentions: [],
        likes: 1203,
        comments: [],
        commentCount: 45,
        shares: 89,
        isLiked: false,
        isShared: false,
        isBookmarked: false,
        isPinned: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
    }
];
const mockStories = [
    {
        userId: 'u2',
        stories: [
            {
                id: 's1',
                authorId: 'u2',
                media: {
                    id: 'sm1',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Design workspace'
                },
                type: 'image',
                caption: 'New design workspace setup! ✨',
                isViewed: false,
                viewers: [],
                viewerCount: 234,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 22).toISOString()
            },
            {
                id: 's2',
                authorId: 'u2',
                media: {
                    id: 'sm2',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Coffee break'
                },
                type: 'image',
                caption: 'Coffee break with the team ☕',
                isViewed: false,
                viewers: [],
                viewerCount: 189,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u7',
        stories: [
            {
                id: 's3',
                authorId: 'u7',
                media: {
                    id: 'sm3',
                    type: 'video',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Travel vlog'
                },
                type: 'video',
                caption: 'Behind the scenes of today\'s shoot 🎬',
                isViewed: false,
                viewers: [],
                viewerCount: 567,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 23).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u4',
        stories: [
            {
                id: 's4',
                authorId: 'u4',
                media: {
                    id: 'sm4',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Art progress'
                },
                type: 'image',
                caption: 'Work in progress... coming together beautifully 🎨',
                isViewed: false,
                viewers: [],
                viewerCount: 892,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 21).toISOString()
            },
            {
                id: 's5',
                authorId: 'u4',
                media: {
                    id: 'sm5',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Finished piece'
                },
                type: 'image',
                caption: 'Finished! Swipe to see the final piece 🖼️',
                isViewed: false,
                viewers: [],
                viewerCount: 1043,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 19).toISOString()
            }
        ],
        hasUnviewed: true,
        latestStory: {}
    },
    {
        userId: 'u9',
        stories: [
            {
                id: 's6',
                authorId: 'u9',
                media: {
                    id: 'sm6',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'Game development'
                },
                type: 'image',
                caption: 'Crystal Maze - Day 180 of development 🎮',
                isViewed: true,
                viewers: [
                    {
                        userId: 'u1',
                        viewedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
                    }
                ],
                viewerCount: 345,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString()
            }
        ],
        hasUnviewed: false,
        latestStory: {}
    },
    {
        userId: 'u6',
        stories: [
            {
                id: 's7',
                authorId: 'u6',
                media: {
                    id: 'sm7',
                    type: 'image',
                    url: '',
                    thumbnailUrl: '',
                    alt: 'ML visualization'
                },
                type: 'image',
                caption: 'Beautiful neural network visualization from today\'s research 🧠',
                isViewed: true,
                viewers: [
                    {
                        userId: 'u1',
                        viewedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString()
                    }
                ],
                viewerCount: 456,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 16).toISOString()
            }
        ],
        hasUnviewed: false,
        latestStory: {}
    }
];
const mockVideos = [
    {
        id: 'v1',
        title: 'Building a Design System from Scratch - Full Tutorial',
        description: 'In this comprehensive tutorial, we build a complete design system using Figma, covering tokens, components, and documentation.',
        authorId: 'u2',
        url: '',
        thumbnailUrl: '',
        duration: 2847,
        views: 45600,
        likes: 3420,
        dislikes: 23,
        comments: [],
        commentCount: 234,
        isLiked: false,
        isDisliked: false,
        isBookmarked: true,
        category: 'Design',
        tags: [
            'design system',
            'figma',
            'tutorial',
            'ui'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    },
    {
        id: 'v2',
        title: 'Advanced TypeScript Patterns Every Developer Should Know',
        description: 'Deep dive into advanced TypeScript patterns including template literals, conditional types, and mapped types.',
        authorId: 'u1',
        url: '',
        thumbnailUrl: '',
        duration: 1920,
        views: 23400,
        likes: 1890,
        dislikes: 12,
        comments: [],
        commentCount: 156,
        isLiked: true,
        isDisliked: false,
        isBookmarked: false,
        category: 'Technology',
        tags: [
            'typescript',
            'programming',
            'tutorial'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
    },
    {
        id: 'v3',
        title: 'Digital Art Process: From Sketch to Final Piece',
        description: 'Watch the complete process of creating a digital illustration from initial concept sketch to the final polished artwork.',
        authorId: 'u4',
        url: '',
        thumbnailUrl: '',
        duration: 3600,
        views: 67800,
        likes: 5670,
        dislikes: 15,
        comments: [],
        commentCount: 345,
        isLiked: false,
        isDisliked: false,
        isBookmarked: true,
        category: 'Art',
        tags: [
            'digital art',
            'illustration',
            'process',
            'art'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
    },
    {
        id: 'v4',
        title: 'Machine Learning in Production: Lessons Learned',
        description: 'Real-world lessons from deploying ML models at scale. Covering monitoring, drift detection, and model versioning.',
        authorId: 'u6',
        url: '',
        thumbnailUrl: '',
        duration: 2400,
        views: 18900,
        likes: 1456,
        dislikes: 8,
        comments: [],
        commentCount: 98,
        isLiked: false,
        isDisliked: false,
        isBookmarked: false,
        category: 'Technology',
        tags: [
            'machine learning',
            'production',
            'mlops'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
    },
    {
        id: 'v5',
        title: 'Tashkent Street Food Tour - Hidden Gems',
        description: 'Exploring the best street food spots in Tashkent, from plov to samsa. A culinary adventure through Uzbekistan\'s capital.',
        authorId: 'u7',
        url: '',
        thumbnailUrl: '',
        duration: 1800,
        views: 123000,
        likes: 8900,
        dislikes: 45,
        comments: [],
        commentCount: 567,
        isLiked: true,
        isDisliked: false,
        isBookmarked: false,
        category: 'Lifestyle',
        tags: [
            'food',
            'travel',
            'tashkent',
            'uzbekistan'
        ],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
    }
];
const mockStreams = [
    {
        id: 'st1',
        title: 'Live Coding: Building a Real-time Chat App',
        description: 'Building a real-time chat application with Next.js and Socket.io from scratch. Ask questions in the chat!',
        streamerId: 'u3',
        thumbnailUrl: '',
        categoryId: 'tech',
        category: 'Technology',
        tags: [
            'coding',
            'nextjs',
            'socket.io',
            'livestream'
        ],
        viewers: 342,
        peakViewers: 456,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
    },
    {
        id: 'st2',
        title: 'Digital Art Stream: Fantasy Character Design',
        description: 'Designing a fantasy character from scratch. Join me as I explore different styles and techniques!',
        streamerId: 'u4',
        thumbnailUrl: '',
        categoryId: 'art',
        category: 'Art',
        tags: [
            'art',
            'digital art',
            'character design',
            'fantasy'
        ],
        viewers: 1890,
        peakViewers: 2100,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    },
    {
        id: 'st3',
        title: 'Music Production: Lo-fi Beats Session',
        description: 'Creating chill lo-fi beats. Requests welcome in the chat! 🎵',
        streamerId: 'u7',
        thumbnailUrl: '',
        categoryId: 'music',
        category: 'Music',
        tags: [
            'music',
            'lo-fi',
            'beats',
            'production'
        ],
        viewers: 567,
        peakViewers: 678,
        isLive: true,
        isRecorded: false,
        startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
        id: 'st4',
        title: 'AI Research Discussion: Latest in LLMs',
        description: 'Weekly discussion on the latest developments in large language models and AI research.',
        streamerId: 'u6',
        thumbnailUrl: '',
        categoryId: 'tech',
        category: 'Technology',
        tags: [
            'ai',
            'llm',
            'research',
            'machine learning'
        ],
        viewers: 2340,
        peakViewers: 2800,
        isLive: false,
        isRecorded: true,
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        endedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        duration: 7200
    },
    {
        id: 'st5',
        title: 'UI/UX Design Review: Community Submissions',
        description: 'Reviewing design submissions from the community. Providing feedback and tips!',
        streamerId: 'u5',
        thumbnailUrl: '',
        categoryId: 'design',
        category: 'Design',
        tags: [
            'design',
            'ui',
            'ux',
            'review'
        ],
        viewers: 0,
        peakViewers: 1234,
        isLive: false,
        isRecorded: true,
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        endedAt: new Date(Date.now() - 1000 * 60 * 60 * 45).toISOString(),
        duration: 10800
    }
];
const mockMeetings = [
    {
        id: 'mt1',
        title: 'Sprint Planning - Week 18',
        description: 'Planning session for the upcoming sprint. Review backlog items and assign tasks.',
        hostId: 'u1',
        participants: [
            {
                userId: 'u1',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u3',
                role: 'participant',
                isMuted: true,
                isVideoOn: false,
                isScreenSharing: false
            },
            {
                userId: 'u6',
                role: 'participant',
                isMuted: true,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u8',
                role: 'participant',
                isMuted: false,
                isVideoOn: false,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
        duration: 60,
        status: 'scheduled',
        meetingLink: 'meet/honey/sprint-18',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 10,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
        id: 'mt2',
        title: 'Design Review: Mobile App v2',
        description: 'Review the latest designs for the mobile app version 2. Focus on the new navigation and chat interface.',
        hostId: 'u2',
        participants: [
            {
                userId: 'u2',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: true
            },
            {
                userId: 'u4',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u5',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
        duration: 45,
        status: 'scheduled',
        meetingLink: 'meet/honey/design-review',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
        id: 'mt3',
        title: '1:1 with Sardor - Project Update',
        description: 'Weekly sync to discuss ML pipeline improvements and data pipeline architecture.',
        hostId: 'u1',
        participants: [
            {
                userId: 'u1',
                role: 'host',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            },
            {
                userId: 'u6',
                role: 'participant',
                isMuted: false,
                isVideoOn: true,
                isScreenSharing: false
            }
        ],
        scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        duration: 30,
        status: 'scheduled',
        meetingLink: 'meet/honey/1on1-sardor',
        type: 'video',
        isMuted: false,
        isRecording: false,
        maxParticipants: 2,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
    }
];
const mockNotifications = [
    {
        id: 'n1',
        type: 'like',
        title: 'New Like',
        body: 'Dilnoza Rakhimova liked your post "Design System Update"',
        fromUserId: 'u2',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        actionUrl: '/feed'
    },
    {
        id: 'n2',
        type: 'comment',
        title: 'New Comment',
        body: 'Timur Aliyev commented on your post: "This is amazing work! 🚀"',
        fromUserId: 'u3',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        actionUrl: '/feed'
    },
    {
        id: 'n3',
        type: 'follow',
        title: 'New Follower',
        body: 'Yuki Tanaka started following you',
        fromUserId: 'u9',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        actionUrl: '/profile/u9'
    },
    {
        id: 'n4',
        type: 'message',
        title: 'New Message',
        body: 'Dilnoza Rakhimova sent you a message: "Want me to share the prototype?"',
        fromUserId: 'u2',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n5',
        type: 'mention',
        title: 'Mentioned You',
        body: 'Sardor Mirzayev mentioned you in Dev Team: "Great work @Jasur!"',
        fromUserId: 'u6',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n6',
        type: 'stream',
        title: 'Live Stream Started',
        body: 'Nodira Ushakova started streaming: "Digital Art Stream"',
        fromUserId: 'u4',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        actionUrl: '/streams'
    },
    {
        id: 'n7',
        type: 'meeting',
        title: 'Meeting Reminder',
        body: 'Sprint Planning - Week 18 starts in 2 hours',
        fromUserId: 'u1',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
        actionUrl: '/meet'
    },
    {
        id: 'n8',
        type: 'group_invite',
        title: 'Group Invitation',
        body: 'Alex Chen invited you to join "UX Research Group"',
        fromUserId: 'u5',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        actionUrl: '/hub'
    },
    {
        id: 'n9',
        type: 'achievement',
        title: 'Achievement Unlocked! 🏆',
        body: 'You\'ve reached 10,000 followers! Congratulations on building an amazing community.',
        fromUserId: 'u1',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        actionUrl: '/profile'
    },
    {
        id: 'n10',
        type: 'like',
        title: 'Post Trending',
        body: 'Your post "Design System Update" is trending with 456 likes!',
        fromUserId: 'u1',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        actionUrl: '/feed'
    }
];
const mockFiles = [
    {
        id: 'f1',
        name: 'Honey_DesignSystem_v2.fig',
        type: 'document',
        size: 24576000,
        url: '',
        mimeType: 'application/x-figma',
        uploadedBy: 'u2',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        folder: 'Design'
    },
    {
        id: 'f2',
        name: 'project-proposal.pdf',
        type: 'document',
        size: 3145728,
        url: '',
        mimeType: 'application/pdf',
        uploadedBy: 'u1',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        folder: 'Documents'
    },
    {
        id: 'f3',
        name: 'team-photo-2024.jpg',
        type: 'image',
        size: 5242880,
        url: '',
        mimeType: 'image/jpeg',
        uploadedBy: 'u7',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        thumbnailUrl: '',
        width: 4000,
        height: 3000,
        folder: 'Photos'
    },
    {
        id: 'f4',
        name: 'sprint-demo-recording.mp4',
        type: 'video',
        size: 104857600,
        url: '',
        mimeType: 'video/mp4',
        uploadedBy: 'u3',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        thumbnailUrl: '',
        duration: 1800,
        folder: 'Videos'
    },
    {
        id: 'f5',
        name: 'ML-model-weights-v3.bin',
        type: 'other',
        size: 524288000,
        url: '',
        mimeType: 'application/octet-stream',
        uploadedBy: 'u6',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        folder: 'ML'
    },
    {
        id: 'f6',
        name: 'podcast-episode-12.mp3',
        type: 'audio',
        size: 52428800,
        url: '',
        mimeType: 'audio/mpeg',
        uploadedBy: 'u7',
        uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        duration: 3600,
        folder: 'Audio'
    }
];
function getUserById(id) {
    return mockUsers.find((u)=>u.id === id);
}
function getChatById(id) {
    return mockChats.find((c)=>c.id === id);
}
function getMessagesForChat(chatId) {
    return mockMessages.filter((m)=>m.chatId === chatId);
}
function getPostsByUser(userId) {
    return mockPosts.filter((p)=>p.authorId === userId);
}
function getStoriesForUser(userId) {
    return mockStories.find((sg)=>sg.userId === userId)?.stories ?? [];
}
function getNotificationsForUser() {
    return mockNotifications;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function ScrollArea({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "scroll-area",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                "data-slot": "scroll-area-viewport",
                className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/src/components/ui/scroll-area.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = ScrollArea;
function ScrollBar({ className, orientation = "vertical", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        "data-slot": "scroll-area-scrollbar",
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none p-px transition-colors select-none", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            "data-slot": "scroll-area-thumb",
            className: "bg-border relative flex-1 rounded-full"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/scroll-area.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c1 = ScrollBar;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrollArea");
__turbopack_context__.k.register(_c1, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Avatar",
    ()=>Avatar,
    "AvatarFallback",
    ()=>AvatarFallback,
    "AvatarImage",
    ()=>AvatarImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-avatar/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Avatar({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "avatar",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex size-8 shrink-0 overflow-hidden rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Avatar;
function AvatarImage({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
        "data-slot": "avatar-image",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("aspect-square size-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_c1 = AvatarImage;
function AvatarFallback({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$avatar$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fallback"], {
        "data-slot": "avatar-fallback",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted flex size-full items-center justify-center rounded-full", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/avatar.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = AvatarFallback;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Avatar");
__turbopack_context__.k.register(_c1, "AvatarImage");
__turbopack_context__.k.register(_c2, "AvatarFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "separator",
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/separator.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = Separator;
;
var _c;
__turbopack_context__.k.register(_c, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/switch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Switch",
    ()=>Switch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-switch/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Switch({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "switch",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$switch$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
            "data-slot": "switch-thumb",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0")
        }, void 0, false, {
            fileName: "[project]/src/components/ui/switch.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/switch.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Switch;
;
var _c;
__turbopack_context__.k.register(_c, "Switch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = TooltipProvider;
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c1 = Tooltip;
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_c2 = TooltipTrigger;
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
                    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/tooltip.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/tooltip.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/tooltip.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c3 = TooltipContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TooltipProvider");
__turbopack_context__.k.register(_c1, "Tooltip");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/hub-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HubSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile.js [app-client] (ecmascript) <export default as Smile>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pin.js [app-client] (ecmascript) <export default as Pin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell-off.js [app-client] (ecmascript) <export default as BellOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ban.js [app-client] (ecmascript) <export default as Ban>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/reply.js [app-client] (ecmascript) <export default as Reply>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Forward$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/forward.js [app-client] (ecmascript) <export default as Forward>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sticky$2d$note$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StickyNote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sticky-note.js [app-client] (ecmascript) <export default as StickyNote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
// ============================================
// Constants
// ============================================
const CURRENT_USER_ID = 'u1';
const STORAGE_KEY_CHATS = 'honey_chats';
const STORAGE_KEY_MESSAGES = 'honey_messages';
const MAX_CACHED_MESSAGES = 10;
const QUICK_EMOJIS = [
    '👍',
    '❤️',
    '🔥',
    '😂',
    '😍',
    '😮',
    '🎉',
    '💯'
];
const TYPING_TIMEOUT = 3000;
const SIMULATED_TYPING_INTERVAL = 8000;
// ============================================
// Helper Functions
// ============================================
function getChatDisplayName(chat) {
    if (chat.name) return chat.name;
    const other = chat.participants.find((p)=>p.userId !== CURRENT_USER_ID);
    if (!other) return 'Unknown';
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === other.userId);
    return user?.displayName ?? other.nickname ?? 'Unknown';
}
function getChatAvatarUrl(chat) {
    if (chat.type !== 'private') return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(chat.name ?? 'Group');
    const other = chat.participants.find((p)=>p.userId !== CURRENT_USER_ID);
    if (!other) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])('Unknown');
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === other.userId);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(user?.displayName ?? 'Unknown');
}
function getChatInitials(chat) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(getChatDisplayName(chat));
}
function getOtherUser(chat) {
    if (chat.type !== 'private') return null;
    const other = chat.participants.find((p)=>p.userId !== CURRENT_USER_ID);
    if (!other) return null;
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === other.userId) ?? null;
}
function getOnlineStatusText(chat) {
    if (chat.type !== 'private') {
        if (chat.memberCount) return `${chat.memberCount} members`;
        return `${chat.participants.length} members`;
    }
    const other = getOtherUser(chat);
    if (!other) return '';
    if (other.status === 'online') return 'online';
    if (other.lastSeen) return `last seen ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(other.lastSeen)}`;
    return 'offline';
}
function isOnline(chat) {
    if (chat.type !== 'private') return false;
    const other = getOtherUser(chat);
    return other?.status === 'online';
}
function formatDateSeparator(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 86400000);
    const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (msgDate.getTime() === today.getTime()) return 'Today';
    if (msgDate.getTime() === yesterday.getTime()) return 'Yesterday';
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}
function needsDateSeparator(msgs, index) {
    if (index === 0) return true;
    const prev = new Date(msgs[index - 1].createdAt);
    const curr = new Date(msgs[index].createdAt);
    return prev.toDateString() !== curr.toDateString();
}
// ============================================
// LocalStorage helpers
// ============================================
function loadFromStorage(key, fallback) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch  {
        return fallback;
    }
}
function saveToStorage(key, data) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch  {
    // localStorage might be full
    }
}
// ============================================
// Typing Indicator Component
// ============================================
function TypingDots() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-0.5 px-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "w-1.5 h-1.5 rounded-full bg-muted-foreground",
                animate: {
                    y: [
                        0,
                        -4,
                        0
                    ]
                },
                transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "w-1.5 h-1.5 rounded-full bg-muted-foreground",
                animate: {
                    y: [
                        0,
                        -4,
                        0
                    ]
                },
                transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.15
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                className: "w-1.5 h-1.5 rounded-full bg-muted-foreground",
                animate: {
                    y: [
                        0,
                        -4,
                        0
                    ]
                },
                transition: {
                    duration: 0.6,
                    repeat: Infinity,
                    delay: 0.3
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_c = TypingDots;
// ============================================
// Typing Indicator Bar Component
// ============================================
function TypingBar({ names }) {
    const displayText = names.length === 1 ? `${names[0]} is typing` : `${names.join(', ')} are typing`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 5
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 5
        },
        className: "flex items-center gap-1.5 px-4 py-1 text-xs text-muted-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: displayText
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_c1 = TypingBar;
// ============================================
// Message Reactions Component
// ============================================
function MessageReactions({ reactions, onToggle }) {
    if (reactions.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-1 mt-1",
        children: reactions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                whileHover: {
                    scale: 1.1
                },
                whileTap: {
                    scale: 0.9
                },
                onClick: (e)=>{
                    e.stopPropagation();
                    onToggle(r.emoji);
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs transition-colors', r.userIds.includes(CURRENT_USER_ID) ? 'bg-honey/20 border border-honey/30 text-honey' : 'glass-card text-muted-foreground hover:text-foreground'),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: r.emoji
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px]",
                        children: r.userIds.length
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this)
                ]
            }, r.emoji, true, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 233,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 231,
        columnNumber: 5
    }, this);
}
_c2 = MessageReactions;
// ============================================
// Quick Emoji Picker
// ============================================
function EmojiPicker({ onPick, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.9,
            y: 5
        },
        animate: {
            opacity: 1,
            scale: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 5
        },
        className: "absolute bottom-full right-0 mb-2 p-2 rounded-xl glass-premium shadow-lg z-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-1",
                children: QUICK_EMOJIS.map((emoji)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileHover: {
                            scale: 1.3
                        },
                        whileTap: {
                            scale: 0.9
                        },
                        onClick: ()=>onPick(emoji),
                        className: "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent/50 transition-colors text-base",
                        children: emoji
                    }, emoji, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "absolute -top-1 -right-1 w-4 h-4 bg-muted rounded-full flex items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    className: "w-2.5 h-2.5 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 280,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 261,
        columnNumber: 5
    }, this);
}
_c3 = EmojiPicker;
// ============================================
// Status Checks for Message
// ============================================
function MessageStatus({ status }) {
    if (status === 'sent') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
        className: "w-3.5 h-3.5 text-muted-foreground"
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 294,
        columnNumber: 33
    }, this);
    if (status === 'delivered') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
        className: "w-3.5 h-3.5 text-muted-foreground"
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 295,
        columnNumber: 38
    }, this);
    if (status === 'read') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
        className: "w-3.5 h-3.5 text-honey"
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 296,
        columnNumber: 33
    }, this);
    if (status === 'failed') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
        className: "w-3.5 h-3.5 text-destructive"
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 297,
        columnNumber: 35
    }, this);
    return null;
}
_c4 = MessageStatus;
// ============================================
// Message Bubble Component
// ============================================
function MessageBubble({ message, isOwn, onReply, onReaction, onContextMenu, replyingTo }) {
    _s();
    const [showEmojiPicker, setShowEmojiPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const sender = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === message.senderId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 10,
            scale: 0.97
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        transition: {
            duration: 0.2
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex w-full px-3', isOwn ? 'justify-end' : 'justify-start'),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col max-w-[85%] md:max-w-[70%]', isOwn ? 'items-end' : 'items-start'),
            children: [
                !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] text-muted-foreground mb-0.5 ml-2 font-medium",
                    children: sender?.displayName ?? 'Unknown'
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 332,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onContextMenu: (e)=>onContextMenu(e, message),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative group rounded-2xl px-3 py-2 transition-colors', isOwn ? 'bg-honey/90 text-background rounded-br-md' : 'glass-card text-foreground rounded-bl-md'),
                    children: [
                        replyingTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2 mb-1.5 pb-1.5 border-b border-current/10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-0.5 self-stretch rounded-full bg-current/20 shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 348,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-semibold opacity-70",
                                            children: replyingTo.senderId === CURRENT_USER_ID ? 'You' : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === replyingTo.senderId)?.displayName ?? 'Unknown'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 350,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs opacity-60 truncate",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateText"])(replyingTo.content, 40)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 353,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm leading-relaxed whitespace-pre-wrap break-words",
                            children: message.content
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 359,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1 mt-0.5', isOwn ? 'justify-end' : 'justify-end'),
                            children: [
                                message.editedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[9px] opacity-50",
                                    children: "edited"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 364,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[10px] opacity-50', isOwn && 'text-background/70'),
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(message.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 366,
                                    columnNumber: 13
                                }, this),
                                isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageStatus, {
                                    status: message.status
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 369,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 362,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageReactions, {
                            reactions: message.reactions,
                            onToggle: (emoji)=>onReaction(message.id, emoji)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                whileHover: {
                                                    scale: 1.1
                                                },
                                                whileTap: {
                                                    scale: 0.9
                                                },
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    setShowEmojiPicker(!showEmojiPicker);
                                                },
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-6 h-6 rounded-full glass-premium flex items-center justify-center shadow-md', isOwn ? '-left-8' : '-right-8'),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                                    className: "w-3 h-3 text-muted-foreground"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                            children: "React"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 398,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 381,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 379,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            children: showEmojiPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmojiPicker, {
                                onPick: (emoji)=>{
                                    onReaction(message.id, emoji);
                                    setShowEmojiPicker(false);
                                },
                                onClose: ()=>setShowEmojiPicker(false)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 406,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 336,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/hub-section.tsx",
            lineNumber: 329,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 323,
        columnNumber: 5
    }, this);
}
_s(MessageBubble, "42zkWFSFG0Y7Ecy7kMf8QKEKx58=");
_c5 = MessageBubble;
// ============================================
// Scroll to Bottom Button
// ============================================
function ScrollToBottomBtn({ onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.8
        },
        className: "absolute bottom-24 left-1/2 -translate-x-1/2 z-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
            whileHover: {
                scale: 1.05
            },
            whileTap: {
                scale: 0.95
            },
            onClick: onClick,
            className: "w-8 h-8 rounded-full glass-premium shadow-lg flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "w-4 h-4 text-honey"
            }, void 0, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 438,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/sections/hub-section.tsx",
            lineNumber: 432,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c6 = ScrollToBottomBtn;
// ============================================
// Chat List Item Component
// ============================================
function ChatListItem({ chat, isActive, onClick, typingNames }) {
    const displayName = getChatDisplayName(chat);
    const avatarUrl = getChatAvatarUrl(chat);
    const initials = getChatInitials(chat);
    const online = isOnline(chat);
    const other = getOtherUser(chat);
    const lastMsg = chat.lastMessage;
    const isTyping = typingNames.length > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        whileHover: {
            backgroundColor: 'rgba(255, 184, 0, 0.06)'
        },
        whileTap: {
            scale: 0.98
        },
        onClick: onClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left', isActive && 'bg-honey/10'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                        className: "w-11 h-11 border border-border/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                src: avatarUrl,
                                alt: displayName
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 479,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                className: "bg-honey/20 text-honey text-xs font-bold",
                                children: initials
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 480,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 478,
                        columnNumber: 9
                    }, this),
                    online && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 485,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 477,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold truncate",
                                        children: displayName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 493,
                                        columnNumber: 13
                                    }, this),
                                    other?.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        className: "w-3.5 h-3.5 text-honey shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 492,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 shrink-0",
                                children: [
                                    chat.isPinned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sticky$2d$note$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__StickyNote$3e$__["StickyNote"], {
                                        className: "w-3 h-3 text-muted-foreground/50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 500,
                                        columnNumber: 15
                                    }, this),
                                    lastMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(lastMsg.createdAt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 498,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-2 mt-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 min-w-0",
                                children: isTyping ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-honey flex items-center gap-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 513,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground truncate",
                                    children: lastMsg ? (lastMsg.senderId === CURRENT_USER_ID ? 'You: ' : '') + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateText"])(lastMsg.content, 35) : 'No messages yet'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 shrink-0",
                                children: [
                                    chat.isMuted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOff$3e$__["BellOff"], {
                                        className: "w-3 h-3 text-muted-foreground/50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 525,
                                        columnNumber: 15
                                    }, this),
                                    chat.unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "min-w-[18px] h-[18px] px-1 bg-honey rounded-full flex items-center justify-center text-[10px] font-bold text-background",
                                        children: chat.unreadCount
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 523,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 509,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 467,
        columnNumber: 5
    }, this);
}
_c7 = ChatListItem;
// ============================================
// Filter Tabs Component
// ============================================
function FilterTabs({ active, onChange }) {
    const tabs = [
        {
            id: 'all',
            label: 'All'
        },
        {
            id: 'private',
            label: 'Private'
        },
        {
            id: 'groups',
            label: 'Groups'
        },
        {
            id: 'channels',
            label: 'Channels'
        },
        {
            id: 'unread',
            label: 'Unread'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-1 px-2 pb-2 overflow-x-auto no-scrollbar-x",
        children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onChange(tab.id),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all shrink-0', active === tab.id ? 'bg-honey text-background shadow-honey' : 'text-muted-foreground hover:text-foreground hover:bg-accent/30'),
                children: tab.label
            }, tab.id, false, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 559,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 557,
        columnNumber: 5
    }, this);
}
_c8 = FilterTabs;
// ============================================
// Info Panel Content Component
// ============================================
function InfoPanelContent({ chat, chats, setChats, onClose }) {
    _s1();
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(chat.isMuted);
    const displayName = getChatDisplayName(chat);
    const avatarUrl = getChatAvatarUrl(chat);
    const initials = getChatInitials(chat);
    const other = getOtherUser(chat);
    const online = isOnline(chat);
    const toggleMute = ()=>{
        const newValue = !isMuted;
        setIsMuted(newValue);
        setChats((prev)=>prev.map((c)=>c.id === chat.id ? {
                    ...c,
                    isMuted: newValue
                } : c));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-base font-semibold",
                        children: "Info"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 606,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "h-8 w-8 md:hidden",
                        onClick: onClose,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 608,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 607,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 605,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                className: "flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center px-4 pb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                className: "w-20 h-20 border-2 border-honey/30 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                        src: avatarUrl,
                                        alt: displayName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                        className: "bg-honey/20 text-honey text-xl font-bold",
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 616,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-base font-semibold",
                                children: displayName
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 620,
                                columnNumber: 11
                            }, this),
                            other && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: [
                                    "@",
                                    other.username
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 622,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs mt-1 flex items-center gap-1.5', online ? 'text-green-500' : 'text-muted-foreground'),
                                children: [
                                    online && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 bg-green-500 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 628,
                                        columnNumber: 24
                                    }, this),
                                    getOnlineStatusText(chat)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            other?.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground mt-2 text-center max-w-[240px]",
                                children: other.bio
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 632,
                                columnNumber: 13
                            }, this),
                            chat.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground mt-2 text-center max-w-[240px]",
                                children: chat.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 637,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                        className: "bg-border/50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 643,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-3 gap-2 p-4",
                        children: [
                            {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 648,
                                    columnNumber: 21
                                }, this),
                                label: 'Media'
                            },
                            {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 649,
                                    columnNumber: 21
                                }, this),
                                label: 'Files'
                            },
                            {
                                icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 650,
                                    columnNumber: 21
                                }, this),
                                label: 'Links'
                            }
                        ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex flex-col items-center gap-1.5 py-3 rounded-xl glass-card hover:bg-accent/30 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-muted-foreground",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 656,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 652,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 646,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                        className: "bg-border/50"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 662,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            isMuted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BellOff$3e$__["BellOff"], {
                                                className: "w-4 h-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 668,
                                                columnNumber: 26
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                className: "w-4 h-4 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 668,
                                                columnNumber: 82
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm",
                                                children: "Notifications"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 669,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 667,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                        checked: !isMuted,
                                        onCheckedChange: toggleMute
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 671,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 666,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                className: "w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ban$3e$__["Ban"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 678,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Block User"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 679,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 674,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                className: "w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-9",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 686,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm",
                                        children: "Clear History"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 687,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 665,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/hub-section.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 604,
        columnNumber: 5
    }, this);
}
_s1(InfoPanelContent, "6bgXX+SLefm1YRdVrD0BcI2lTWQ=");
_c9 = InfoPanelContent;
function HubSection() {
    _s2();
    // ---- State ----
    // Lazy state initialization — avoids setState-in-effect
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HubSection.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = loadFromStorage(STORAGE_KEY_CHATS, []);
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockChats"].map({
                "HubSection.useState": (mc)=>{
                    const sc = stored.find({
                        "HubSection.useState.sc": (s)=>s.id === mc.id
                    }["HubSection.useState.sc"]);
                    return sc ? {
                        ...mc,
                        ...sc
                    } : mc;
                }
            }["HubSection.useState"]);
        }
    }["HubSection.useState"]);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HubSection.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const stored = loadFromStorage(STORAGE_KEY_MESSAGES, []);
            const merged = [
                ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockMessages"]
            ];
            stored.forEach({
                "HubSection.useState": (sm)=>{
                    if (!merged.find({
                        "HubSection.useState": (m)=>m.id === sm.id
                    }["HubSection.useState"])) merged.push(sm);
                }
            }["HubSection.useState"]);
            return merged;
        }
    }["HubSection.useState"]);
    const [activeChatId, setActiveChatId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [messageText, setMessageText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [replyTo, setReplyTo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileView, setMobileView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('list');
    const [showInfoPanel, setShowInfoPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showMobileInfo, setShowMobileInfo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [typingUsers, setTypingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showScrollBtn, setShowScrollBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [contextMessage, setContextMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contextPos, setContextPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    // ---- Refs ----
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollAreaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const typingTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const simulatedTypingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ---- Active Chat ----
    const activeChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HubSection.useMemo[activeChat]": ()=>chats.find({
                "HubSection.useMemo[activeChat]": (c)=>c.id === activeChatId
            }["HubSection.useMemo[activeChat]"]) ?? null
    }["HubSection.useMemo[activeChat]"], [
        chats,
        activeChatId
    ]);
    const chatMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HubSection.useMemo[chatMessages]": ()=>messages.filter({
                "HubSection.useMemo[chatMessages]": (m)=>m.chatId === activeChatId
            }["HubSection.useMemo[chatMessages]"])
    }["HubSection.useMemo[chatMessages]"], [
        messages,
        activeChatId
    ]);
    // ---- Initialize data (lazy state initializer to avoid setState in effect) ----
    // Initialization is done via useState factory functions defined above component.
    // ---- Persist to localStorage ----
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HubSection.useEffect": ()=>{
            if (chats.length > 0) {
                saveToStorage(STORAGE_KEY_CHATS, chats.map({
                    "HubSection.useEffect": (c)=>({
                            ...c,
                            lastMessage: messages.find({
                                "HubSection.useEffect": (m)=>m.id === c.lastMessage?.id
                            }["HubSection.useEffect"]) ?? c.lastMessage
                        })
                }["HubSection.useEffect"]));
            }
        }
    }["HubSection.useEffect"], [
        chats,
        messages
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HubSection.useEffect": ()=>{
            if (messages.length > 0) {
                // Save last MAX_CACHED_MESSAGES per chat
                const chatIds = [
                    ...new Set(messages.map({
                        "HubSection.useEffect": (m)=>m.chatId
                    }["HubSection.useEffect"]))
                ];
                const toCache = [];
                chatIds.forEach({
                    "HubSection.useEffect": (cid)=>{
                        const msgs = messages.filter({
                            "HubSection.useEffect.msgs": (m)=>m.chatId === cid
                        }["HubSection.useEffect.msgs"]).slice(-MAX_CACHED_MESSAGES);
                        toCache.push(...msgs);
                    }
                }["HubSection.useEffect"]);
                saveToStorage(STORAGE_KEY_MESSAGES, toCache);
            }
        }
    }["HubSection.useEffect"], [
        messages
    ]);
    // ---- Auto scroll to bottom ----
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[scrollToBottom]": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["HubSection.useCallback[scrollToBottom]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HubSection.useEffect": ()=>{
            if (chatMessages.length > 0) {
                scrollToBottom();
            }
        }
    }["HubSection.useEffect"], [
        chatMessages.length,
        scrollToBottom
    ]);
    // ---- Scroll detection ----
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HubSection.useEffect": ()=>{
            const el = scrollAreaRef.current;
            if (!el) return;
            const handleScroll = {
                "HubSection.useEffect.handleScroll": ()=>{
                    if (!el) return;
                    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
                    setShowScrollBtn(!isAtBottom);
                }
            }["HubSection.useEffect.handleScroll"];
            el.addEventListener('scroll', handleScroll);
            return ({
                "HubSection.useEffect": ()=>el.removeEventListener('scroll', handleScroll)
            })["HubSection.useEffect"];
        }
    }["HubSection.useEffect"], [
        activeChatId
    ]);
    // ---- Typing detection (user typing) - handled via ref timer in onChangeText ----
    const handleTextChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[handleTextChange]": (text)=>{
            setMessageText(text);
            if (text && activeChatId) {
                setIsTyping(true);
                if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
                typingTimerRef.current = setTimeout({
                    "HubSection.useCallback[handleTextChange]": ()=>{
                        setIsTyping(false);
                    }
                }["HubSection.useCallback[handleTextChange]"], TYPING_TIMEOUT);
            } else {
                setIsTyping(false);
            }
        }
    }["HubSection.useCallback[handleTextChange]"], [
        activeChatId
    ]);
    // ---- Simulated typing from other users ----
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HubSection.useEffect": ()=>{
            if (!activeChatId) return;
            simulatedTypingRef.current = setInterval({
                "HubSection.useEffect": ()=>{
                    if (Math.random() < 0.3) {
                        const chat = chats.find({
                            "HubSection.useEffect.chat": (c)=>c.id === activeChatId
                        }["HubSection.useEffect.chat"]);
                        if (!chat) return;
                        const others = chat.participants.filter({
                            "HubSection.useEffect.others": (p)=>p.userId !== CURRENT_USER_ID
                        }["HubSection.useEffect.others"]);
                        if (others.length === 0) return;
                        const randomUser = others[Math.floor(Math.random() * others.length)];
                        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find({
                            "HubSection.useEffect.user": (u)=>u.id === randomUser.userId
                        }["HubSection.useEffect.user"]);
                        if (!user) return;
                        setTypingUsers({
                            "HubSection.useEffect": (prev)=>({
                                    ...prev,
                                    [activeChatId]: [
                                        user.displayName
                                    ]
                                })
                        }["HubSection.useEffect"]);
                        setTimeout({
                            "HubSection.useEffect": ()=>{
                                setTypingUsers({
                                    "HubSection.useEffect": (prev)=>({
                                            ...prev,
                                            [activeChatId]: []
                                        })
                                }["HubSection.useEffect"]);
                            }
                        }["HubSection.useEffect"], 2000 + Math.random() * 3000);
                    }
                }
            }["HubSection.useEffect"], SIMULATED_TYPING_INTERVAL);
            return ({
                "HubSection.useEffect": ()=>{
                    if (simulatedTypingRef.current) clearInterval(simulatedTypingRef.current);
                }
            })["HubSection.useEffect"];
        }
    }["HubSection.useEffect"], [
        activeChatId,
        chats
    ]);
    // ---- Filter chats ----
    const filteredChats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HubSection.useMemo[filteredChats]": ()=>{
            let result = chats;
            // Filter tab
            if (filter === 'private') result = result.filter({
                "HubSection.useMemo[filteredChats]": (c)=>c.type === 'private'
            }["HubSection.useMemo[filteredChats]"]);
            else if (filter === 'groups') result = result.filter({
                "HubSection.useMemo[filteredChats]": (c)=>c.type === 'group'
            }["HubSection.useMemo[filteredChats]"]);
            else if (filter === 'channels') result = result.filter({
                "HubSection.useMemo[filteredChats]": (c)=>c.type === 'channel'
            }["HubSection.useMemo[filteredChats]"]);
            else if (filter === 'unread') result = result.filter({
                "HubSection.useMemo[filteredChats]": (c)=>c.unreadCount > 0
            }["HubSection.useMemo[filteredChats]"]);
            // Search
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                result = result.filter({
                    "HubSection.useMemo[filteredChats]": (c)=>{
                        const name = getChatDisplayName(c).toLowerCase();
                        return name.includes(q);
                    }
                }["HubSection.useMemo[filteredChats]"]);
            }
            // Sort: pinned first, then by updatedAt
            return result.sort({
                "HubSection.useMemo[filteredChats]": (a, b)=>{
                    if (a.isPinned && !b.isPinned) return -1;
                    if (!a.isPinned && b.isPinned) return 1;
                    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
                }
            }["HubSection.useMemo[filteredChats]"]);
        }
    }["HubSection.useMemo[filteredChats]"], [
        chats,
        filter,
        searchQuery
    ]);
    // ---- Send message ----
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[sendMessage]": ()=>{
            if (!messageText.trim() || !activeChatId) return;
            const newMsg = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])(),
                chatId: activeChatId,
                senderId: CURRENT_USER_ID,
                content: messageText.trim(),
                type: 'text',
                status: 'sent',
                replyTo: replyTo?.id,
                reactions: [],
                attachments: [],
                mentions: [],
                createdAt: new Date().toISOString()
            };
            setMessages({
                "HubSection.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        newMsg
                    ]
            }["HubSection.useCallback[sendMessage]"]);
            setChats({
                "HubSection.useCallback[sendMessage]": (prev)=>prev.map({
                        "HubSection.useCallback[sendMessage]": (c)=>c.id === activeChatId ? {
                                ...c,
                                lastMessage: newMsg,
                                updatedAt: newMsg.createdAt,
                                unreadCount: 0
                            } : c
                    }["HubSection.useCallback[sendMessage]"])
            }["HubSection.useCallback[sendMessage]"]);
            setMessageText('');
            setReplyTo(null);
            // Simulate "delivered" then "read" after a delay
            setTimeout({
                "HubSection.useCallback[sendMessage]": ()=>{
                    setMessages({
                        "HubSection.useCallback[sendMessage]": (prev)=>prev.map({
                                "HubSection.useCallback[sendMessage]": (m)=>m.id === newMsg.id ? {
                                        ...m,
                                        status: 'delivered'
                                    } : m
                            }["HubSection.useCallback[sendMessage]"])
                    }["HubSection.useCallback[sendMessage]"]);
                }
            }["HubSection.useCallback[sendMessage]"], 1000);
            setTimeout({
                "HubSection.useCallback[sendMessage]": ()=>{
                    setMessages({
                        "HubSection.useCallback[sendMessage]": (prev)=>prev.map({
                                "HubSection.useCallback[sendMessage]": (m)=>m.id === newMsg.id ? {
                                        ...m,
                                        status: 'read'
                                    } : m
                            }["HubSection.useCallback[sendMessage]"])
                    }["HubSection.useCallback[sendMessage]"]);
                }
            }["HubSection.useCallback[sendMessage]"], 2500);
            scrollToBottom();
        }
    }["HubSection.useCallback[sendMessage]"], [
        messageText,
        activeChatId,
        replyTo,
        scrollToBottom
    ]);
    // ---- Reaction toggle ----
    const toggleReaction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[toggleReaction]": (messageId, emoji)=>{
            setMessages({
                "HubSection.useCallback[toggleReaction]": (prev)=>prev.map({
                        "HubSection.useCallback[toggleReaction]": (m)=>{
                            if (m.id !== messageId) return m;
                            const existing = m.reactions.find({
                                "HubSection.useCallback[toggleReaction].existing": (r)=>r.emoji === emoji
                            }["HubSection.useCallback[toggleReaction].existing"]);
                            if (existing) {
                                if (existing.userIds.includes(CURRENT_USER_ID)) {
                                    // Remove
                                    if (existing.userIds.length === 1) {
                                        return {
                                            ...m,
                                            reactions: m.reactions.filter({
                                                "HubSection.useCallback[toggleReaction]": (r)=>r.emoji !== emoji
                                            }["HubSection.useCallback[toggleReaction]"])
                                        };
                                    }
                                    return {
                                        ...m,
                                        reactions: m.reactions.map({
                                            "HubSection.useCallback[toggleReaction]": (r)=>r.emoji === emoji ? {
                                                    ...r,
                                                    userIds: r.userIds.filter({
                                                        "HubSection.useCallback[toggleReaction]": (u)=>u !== CURRENT_USER_ID
                                                    }["HubSection.useCallback[toggleReaction]"])
                                                } : r
                                        }["HubSection.useCallback[toggleReaction]"])
                                    };
                                } else {
                                    // Add
                                    return {
                                        ...m,
                                        reactions: m.reactions.map({
                                            "HubSection.useCallback[toggleReaction]": (r)=>r.emoji === emoji ? {
                                                    ...r,
                                                    userIds: [
                                                        ...r.userIds,
                                                        CURRENT_USER_ID
                                                    ]
                                                } : r
                                        }["HubSection.useCallback[toggleReaction]"])
                                    };
                                }
                            } else {
                                return {
                                    ...m,
                                    reactions: [
                                        ...m.reactions,
                                        {
                                            emoji,
                                            userIds: [
                                                CURRENT_USER_ID
                                            ]
                                        }
                                    ]
                                };
                            }
                        }
                    }["HubSection.useCallback[toggleReaction]"])
            }["HubSection.useCallback[toggleReaction]"]);
        }
    }["HubSection.useCallback[toggleReaction]"], []);
    // ---- Open chat ----
    const openChat = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[openChat]": (chatId)=>{
            setActiveChatId(chatId);
            setMobileView('chat');
            setShowInfoPanel(false);
            // Clear unread
            setChats({
                "HubSection.useCallback[openChat]": (prev)=>prev.map({
                        "HubSection.useCallback[openChat]": (c)=>c.id === chatId ? {
                                ...c,
                                unreadCount: 0
                            } : c
                    }["HubSection.useCallback[openChat]"])
            }["HubSection.useCallback[openChat]"]);
        }
    }["HubSection.useCallback[openChat]"], []);
    // ---- Context menu actions ----
    const handleContextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[handleContextMenu]": (e, msg)=>{
            e.preventDefault();
            setContextMessage(msg);
            setContextPos({
                x: e.clientX,
                y: e.clientY
            });
        }
    }["HubSection.useCallback[handleContextMenu]"], []);
    const handleContextAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[handleContextAction]": (action)=>{
            if (!contextMessage) return;
            switch(action){
                case 'reply':
                    setReplyTo(contextMessage);
                    break;
                case 'copy':
                    navigator.clipboard?.writeText(contextMessage.content);
                    break;
                case 'pin':
                    break;
                case 'delete':
                    setMessages({
                        "HubSection.useCallback[handleContextAction]": (prev)=>prev.filter({
                                "HubSection.useCallback[handleContextAction]": (m)=>m.id !== contextMessage.id
                            }["HubSection.useCallback[handleContextAction]"])
                    }["HubSection.useCallback[handleContextAction]"]);
                    break;
            }
            setContextMessage(null);
        }
    }["HubSection.useCallback[handleContextAction]"], [
        contextMessage
    ]);
    // ---- Back to list (mobile) ----
    const goBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[goBack]": ()=>{
            setMobileView('list');
            setActiveChatId(null);
            setShowInfoPanel(false);
        }
    }["HubSection.useCallback[goBack]"], []);
    // ---- Keyboard send ----
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HubSection.useCallback[handleKeyDown]": (e)=>{
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        }
    }["HubSection.useCallback[handleKeyDown]"], [
        sendMessage
    ]);
    // ---- Render ----
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        delayDuration: 300,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[calc(100vh-3rem)] md:h-screen md:max-h-screen overflow-hidden -m-4 md:-m-6 w-[calc(100%+2rem)] md:w-[calc(100%+3rem)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full md:w-[320px] lg:w-[340px] md:min-w-[300px] h-full flex flex-col border-r border-border/50 glass-subtle', mobileView !== 'list' ? 'hidden md:flex' : 'flex'),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-4 pt-4 pb-2 flex items-center justify-between shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-bold text-gradient-honey",
                                    children: "Messages"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1029,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    size: "icon",
                                                    className: "h-8 w-8 text-muted-foreground hover:text-honey",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1034,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1033,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1032,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: "New Group"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1031,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1030,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1028,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-3 pb-1 shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1045,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        placeholder: "Search conversations...",
                                        className: "pl-8 h-9 text-xs rounded-xl glass-card bg-transparent border-0 focus-visible:ring-1 focus-visible:ring-honey/30"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1044,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1043,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterTabs, {
                            active: filter,
                            onChange: setFilter
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1056,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                            className: "flex-1 px-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-0.5 pb-4",
                                children: [
                                    filteredChats.map((chat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatListItem, {
                                            chat: chat,
                                            isActive: chat.id === activeChatId,
                                            onClick: ()=>openChat(chat.id),
                                            typingNames: typingUsers[chat.id] ?? []
                                        }, chat.id, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1062,
                                            columnNumber: 17
                                        }, this)),
                                    filteredChats.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center py-12 text-muted-foreground",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                className: "w-8 h-8 mb-2 opacity-40"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1072,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs",
                                                children: "No conversations found"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1073,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1060,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1059,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 1021,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 h-full flex flex-col bg-background/50', mobileView !== 'chat' ? 'hidden md:flex' : 'flex'),
                    children: activeChat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 px-3 py-2.5 glass-subtle border-b border-border/50 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-8 w-8 md:hidden shrink-0",
                                        onClick: goBack,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1100,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                        className: "w-9 h-9 border border-border/50 cursor-pointer",
                                        onClick: ()=>{
                                            setShowMobileInfo(true);
                                            setShowInfoPanel(true);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                src: getChatAvatarUrl(activeChat),
                                                alt: getChatDisplayName(activeChat)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                className: "bg-honey/20 text-honey text-xs font-bold",
                                                children: getChatInitials(activeChat)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1104,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 min-w-0 cursor-pointer",
                                        onClick: ()=>{
                                            setShowMobileInfo(true);
                                            setShowInfoPanel(true);
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-sm font-semibold truncate",
                                                        children: getChatDisplayName(activeChat)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 21
                                                    }, this),
                                                    getOtherUser(activeChat)?.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "w-3.5 h-3.5 text-honey shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1116,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                mode: "wait",
                                                children: (typingUsers[activeChat.id]?.length ?? 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingBar, {
                                                    names: typingUsers[activeChat.id]
                                                }, "typing", false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1121,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                                    initial: {
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        opacity: 1
                                                    },
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[11px]', isOnline(activeChat) ? 'text-green-500' : 'text-muted-foreground'),
                                                    children: getOnlineStatusText(activeChat)
                                                }, "status", false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1123,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1119,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            className: "h-8 w-8 text-muted-foreground hover:text-honey",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                                lineNumber: 1143,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1142,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1141,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                        children: "Voice Call"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1146,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1140,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            className: "h-8 w-8 text-muted-foreground hover:text-honey",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                                lineNumber: 1151,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1150,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                        children: "Video Call"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1154,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1148,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            variant: "ghost",
                                                            size: "icon",
                                                            className: "h-8 w-8 text-muted-foreground hover:text-honey",
                                                            onClick: ()=>{
                                                                setShowInfoPanel(!showInfoPanel);
                                                                setShowMobileInfo(true);
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                                lineNumber: 1164,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1158,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1157,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                        children: "More"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1167,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1156,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1139,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1092,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollAreaRef,
                                className: "flex-1 overflow-y-auto relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-4 space-y-1 min-h-full",
                                        children: [
                                            chatMessages.map((msg, index)=>{
                                                const isOwn = msg.senderId === CURRENT_USER_ID;
                                                const replyingTo = msg.replyTo ? messages.find((m)=>m.id === msg.replyTo) : undefined;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                    children: [
                                                        needsDateSeparator(chatMessages, index) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-3 py-1 rounded-full glass-card text-[10px] text-muted-foreground font-medium",
                                                                children: formatDateSeparator(msg.createdAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                                lineNumber: 1189,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1188,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageBubble, {
                                                            message: msg,
                                                            isOwn: isOwn,
                                                            onReply: setReplyTo,
                                                            onReaction: toggleReaction,
                                                            onContextMenu: handleContextMenu,
                                                            replyingTo: replyingTo
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1195,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, msg.id, true, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1185,
                                                    columnNumber: 23
                                                }, this);
                                            }),
                                            chatMessages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center justify-center h-64 text-muted-foreground",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                        className: "w-10 h-10 mb-3 opacity-30"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1208,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-medium",
                                                        children: "No messages yet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1209,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs mt-1",
                                                        children: "Start a conversation!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1210,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1207,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: messagesEndRef
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1213,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1177,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: showScrollBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollToBottomBtn, {
                                            onClick: scrollToBottom
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1218,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1217,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1173,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: isTyping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: 'auto'
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "px-4 py-1 text-[10px] text-muted-foreground flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingDots, {}, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "You are typing..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1232,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1225,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1223,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: replyTo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    animate: {
                                        opacity: 1,
                                        height: 'auto'
                                    },
                                    exit: {
                                        opacity: 0,
                                        height: 0
                                    },
                                    className: "px-3 py-2 glass-card border-l-2 border-honey mx-3 mb-1 rounded-lg flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] font-semibold text-honey",
                                                    children: replyTo.senderId === CURRENT_USER_ID ? 'You' : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === replyTo.senderId)?.displayName ?? 'Unknown'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1247,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-muted-foreground truncate",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["truncateText"])(replyTo.content, 50)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1252,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1246,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-6 w-6 shrink-0",
                                            onClick: ()=>setReplyTo(null),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "w-3 h-3 text-muted-foreground"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1262,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1256,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1240,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1238,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2 border-t border-border/30 glass-subtle shrink-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-end gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        className: "h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smile$3e$__["Smile"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1275,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1274,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1273,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: "Emoji"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1278,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1272,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: messageText,
                                                onChange: (e)=>handleTextChange(e.target.value),
                                                onKeyDown: handleKeyDown,
                                                placeholder: "Type a message...",
                                                rows: 1,
                                                className: "w-full resize-none rounded-2xl glass-card bg-transparent border-0 text-sm px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-honey/30 max-h-32 overflow-y-auto",
                                                style: {
                                                    minHeight: '40px'
                                                },
                                                onInput: (e)=>{
                                                    const target = e.target;
                                                    target.style.height = 'auto';
                                                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1283,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1282,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        className: "h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1303,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1302,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1301,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: "Attach"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1306,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1300,
                                            columnNumber: 19
                                        }, this),
                                        messageText.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            whileTap: {
                                                scale: 0.9
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: sendMessage,
                                                            size: "icon",
                                                            className: "h-9 w-9 shrink-0 rounded-full bg-honey hover:bg-honey-dark text-background shadow-honey",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                                lineNumber: 1319,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1314,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1313,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                        children: "Send"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1322,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1312,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1311,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "ghost",
                                                        size: "icon",
                                                        className: "h-9 w-9 shrink-0 text-muted-foreground hover:text-honey rounded-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                            className: "w-5 h-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                                            lineNumber: 1329,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                                        lineNumber: 1328,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1327,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: "Voice Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                                    lineNumber: 1332,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1326,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1270,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1269,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /* Empty state */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col items-center justify-center text-muted-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.9
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            className: "flex flex-col items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full bg-honey/10 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                        className: "w-8 h-8 text-honey/50"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1347,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1346,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-sm font-medium text-foreground",
                                    children: "Select a conversation"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1349,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-center max-w-[200px]",
                                    children: "Choose from your existing conversations or start a new one"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1350,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1341,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 1340,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 1083,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-[300px] lg:w-[320px] h-full border-l border-border/50 glass-subtle shrink-0 overflow-hidden', !showInfoPanel ? 'hidden md:flex' : 'hidden'),
                    children: activeChat ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoPanelContent, {
                        chat: activeChat,
                        chats: chats,
                        setChats: setChats,
                        onClose: ()=>setShowInfoPanel(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 1368,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex items-center justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-2 text-muted-foreground",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-6 h-6 opacity-30"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1377,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs",
                                    children: "Select a chat to view info"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/hub-section.tsx",
                                    lineNumber: 1378,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1376,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 1375,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 1361,
                    columnNumber: 9
                }, this),
                activeChat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
                    open: showMobileInfo,
                    onOpenChange: setShowMobileInfo,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
                        side: "right",
                        className: "w-[300px] p-0 glass-premium",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoPanelContent, {
                            chat: activeChat,
                            chats: chats,
                            setChats: setChats,
                            onClose: ()=>setShowMobileInfo(false)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1390,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 1389,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 1388,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                    children: contextMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        exit: {
                            opacity: 0
                        },
                        className: "fixed inset-0 z-50",
                        onClick: ()=>setContextMessage(null),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fixed z-50",
                            style: {
                                left: contextPos.x,
                                top: contextPos.y
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                className: "glass-premium rounded-xl shadow-lg p-1 min-w-[160px]",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    {
                                        action: 'reply',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$reply$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Reply$3e$__["Reply"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1424,
                                            columnNumber: 46
                                        }, this),
                                        label: 'Reply'
                                    },
                                    {
                                        action: 'forward',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$forward$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Forward$3e$__["Forward"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1425,
                                            columnNumber: 48
                                        }, this),
                                        label: 'Forward'
                                    },
                                    {
                                        action: 'copy',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1426,
                                            columnNumber: 45
                                        }, this),
                                        label: 'Copy'
                                    },
                                    {
                                        action: 'pin',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pin$3e$__["Pin"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1427,
                                            columnNumber: 44
                                        }, this),
                                        label: 'Pin'
                                    },
                                    {
                                        action: 'delete',
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "w-4 h-4 text-destructive"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/hub-section.tsx",
                                            lineNumber: 1428,
                                            columnNumber: 47
                                        }, this),
                                        label: 'Delete',
                                        destructive: true
                                    }
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>handleContextAction(item.action),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors', item.destructive ? 'text-destructive hover:bg-destructive/10' : 'text-foreground hover:bg-accent/30'),
                                        children: [
                                            item.icon,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                                lineNumber: 1441,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, item.action, true, {
                                        fileName: "[project]/src/components/sections/hub-section.tsx",
                                        lineNumber: 1430,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/hub-section.tsx",
                                lineNumber: 1416,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/hub-section.tsx",
                            lineNumber: 1412,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/hub-section.tsx",
                        lineNumber: 1405,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/hub-section.tsx",
                    lineNumber: 1403,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/hub-section.tsx",
            lineNumber: 1017,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/hub-section.tsx",
        lineNumber: 1016,
        columnNumber: 5
    }, this);
}
_s2(HubSection, "uQsi1vsMRUQFjVaWDPSL4ixTS8k=");
_c10 = HubSection;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "TypingDots");
__turbopack_context__.k.register(_c1, "TypingBar");
__turbopack_context__.k.register(_c2, "MessageReactions");
__turbopack_context__.k.register(_c3, "EmojiPicker");
__turbopack_context__.k.register(_c4, "MessageStatus");
__turbopack_context__.k.register(_c5, "MessageBubble");
__turbopack_context__.k.register(_c6, "ScrollToBottomBtn");
__turbopack_context__.k.register(_c7, "ChatListItem");
__turbopack_context__.k.register(_c8, "FilterTabs");
__turbopack_context__.k.register(_c9, "InfoPanelContent");
__turbopack_context__.k.register(_c10, "HubSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_8044037b._.js.map