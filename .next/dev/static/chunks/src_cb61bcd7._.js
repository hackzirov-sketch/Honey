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
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Textarea;
;
var _c;
__turbopack_context__.k.register(_c, "Textarea");
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
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "popper", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/feed-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeedSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3X3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
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
// ============================================
// Gradient configs
// ============================================
const gradients = [
    'from-honey/20 via-amber/10 to-orange/10',
    'from-honey-dark/20 via-brown/10 to-warm-gray/10',
    'from-gold/20 via-honey-light/10 to-amber/10',
    'from-honey/10 via-muted to-honey-dark/10',
    'from-amber-light/20 via-honey/10 to-warm-gray-light/10',
    'from-gold-light/20 via-cream/10 to-honey/10',
    'from-honey-dim/20 via-amber/10 to-gold/5',
    'from-pink/10 via-honey/10 to-gold/10',
    'from-amber/10 via-cream/10 to-honey-light/10'
];
function getGradient(id) {
    const idx = id.split('').reduce((a, c)=>a + c.charCodeAt(0), 0) % gradients.length;
    return gradients[idx];
}
const storyGradients = [
    'from-honey via-amber to-gold-dark',
    'from-pink-500 via-rose-400 to-honey',
    'from-violet-500 via-purple-400 to-honey',
    'from-cyan-400 via-blue-400 to-honey',
    'from-emerald-400 via-teal-400 to-honey'
];
function getStoryGradient(id) {
    const idx = id.split('').reduce((a, c)=>a + c.charCodeAt(0), 0) % storyGradients.length;
    return storyGradients[idx];
}
function FeedSection() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('latest');
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('feed');
    const [showCreatePost, setShowCreatePost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localPosts, setLocalPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [storyViewerOpen, setStoryViewerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedStoryGroup, setSelectedStoryGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStoryIndex, setSelectedStoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const allPosts = [
        ...localPosts,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPosts"]
    ];
    const sortedPosts = allPosts.sort((a, b)=>{
        if (activeTab === 'popular') return b.likes - a.likes;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    const openStory = (group)=>{
        setSelectedStoryGroup(group);
        setSelectedStoryIndex(0);
        setStoryViewerOpen(true);
    };
    const addNewPost = (post)=>{
        setLocalPosts((prev)=>[
                post,
                ...prev
            ]);
        setShowCreatePost(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-4 md:p-6 pb-24 md:pb-6 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: -10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-bold text-gradient-honey",
                        children: "Feed"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: ()=>setActiveView('feed'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-2 rounded-xl transition-all', activeView === 'feed' ? 'glass-premium text-honey' : 'glass-card text-muted-foreground'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3X3$3e$__["Grid3X3"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: ()=>setActiveView('explore'),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-2 rounded-xl transition-all', activeView === 'explore' ? 'glass-premium text-honey' : 'glass-card text-muted-foreground'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoriesRow, {
                onStoryClick: openStory
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: activeView === 'feed' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1 p-1 glass-card rounded-xl",
                            children: [
                                'latest',
                                'popular',
                                'following'
                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all', activeTab === tab ? 'bg-honey text-background shadow-honey' : 'text-muted-foreground hover:text-foreground'),
                                    children: tab
                                }, tab, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: sortedPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostCard, {
                                    post: post,
                                    index: index
                                }, post.id, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 190,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this)
                    ]
                }, "feed", true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 162,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    className: "space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExploreGrid, {}, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 202,
                        columnNumber: 13
                    }, this)
                }, "explore", false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 195,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                whileHover: {
                    scale: 1.05
                },
                whileTap: {
                    scale: 0.9
                },
                onClick: ()=>setShowCreatePost(true),
                className: "fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 w-14 h-14 bg-honey rounded-2xl shadow-honey-lg flex items-center justify-center text-background",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    className: "w-6 h-6"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: showCreatePost,
                onOpenChange: setShowCreatePost,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    className: "glass-premium sm:max-w-md border-honey/10 max-h-[90vh] overflow-y-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CreatePostForm, {
                        onSubmit: addNewPost,
                        onClose: ()=>setShowCreatePost(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 220,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            selectedStoryGroup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StoryViewer, {
                storyGroup: selectedStoryGroup,
                storyIndex: selectedStoryIndex,
                isOpen: storyViewerOpen,
                onClose: ()=>setStoryViewerOpen(false),
                onNavigate: (group, index)=>{
                    setSelectedStoryGroup(group);
                    setSelectedStoryIndex(index);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 226,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/feed-section.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(FeedSection, "zfXOkyWEdoHtS9ATisw7/+C+XaI=");
_c = FeedSection;
// ============================================
// Stories Row Component
// ============================================
function StoriesRow({ onStoryClick }) {
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"][0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
        initial: {
            opacity: 0,
            y: 10
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.1
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-3 overflow-x-auto pb-2 scrollbar-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-1.5 shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-16 h-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full h-full rounded-full bg-muted border-2 border-dashed border-honey/40 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(currentUser.displayName),
                                        alt: "",
                                        className: "w-full h-full rounded-full object-cover opacity-60"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 257,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-honey rounded-full flex items-center justify-center shadow-honey",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-3 h-3 text-background"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 256,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] text-muted-foreground",
                            children: "Your Story"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 255,
                    columnNumber: 9
                }, this),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"].map((group, idx)=>{
                    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === group.userId);
                    if (!user) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.92
                        },
                        onClick: ()=>onStoryClick(group),
                        className: "flex flex-col items-center gap-1.5 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative w-16 h-16 rounded-full p-[2px]', group.hasUnviewed ? 'bg-gradient-to-br ' + getStoryGradient(group.userId) : 'bg-muted-foreground/20'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(user.displayName),
                                        alt: user.displayName,
                                        className: "w-full h-full rounded-full object-cover border-2 border-background"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 290,
                                        columnNumber: 17
                                    }, this),
                                    group.hasUnviewed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-honey rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[7px] text-background font-bold",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/feed-section.tsx",
                                            lineNumber: 297,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 282,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] text-muted-foreground truncate max-w-[64px]",
                                children: user.displayName.split(' ')[0]
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 301,
                                columnNumber: 15
                            }, this)
                        ]
                    }, group.userId, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 276,
                        columnNumber: 13
                    }, this);
                })
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/feed-section.tsx",
            lineNumber: 253,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/feed-section.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_c1 = StoriesRow;
// ============================================
// Story Viewer Component
// ============================================
function StoryViewer({ storyGroup, storyIndex, isOpen, onClose, onNavigate }) {
    _s1();
    const [currentStoryIdx, setCurrentStoryIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(storyIndex);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [replyText, setReplyText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const storyDuration = 5000;
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === storyGroup.userId);
    const stories = storyGroup.stories;
    const currentStory = stories[currentStoryIdx];
    const goNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoryViewer.useCallback[goNext]": ()=>{
            if (currentStoryIdx < stories.length - 1) {
                setCurrentStoryIdx({
                    "StoryViewer.useCallback[goNext]": (i)=>i + 1
                }["StoryViewer.useCallback[goNext]"]);
            } else {
                const groupIdx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"].findIndex({
                    "StoryViewer.useCallback[goNext].groupIdx": (g)=>g.userId === storyGroup.userId
                }["StoryViewer.useCallback[goNext].groupIdx"]);
                if (groupIdx < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"].length - 1) {
                    const nextGroup = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"][groupIdx + 1];
                    onNavigate(nextGroup, 0);
                    setCurrentStoryIdx(0);
                } else {
                    onClose();
                }
            }
        }
    }["StoryViewer.useCallback[goNext]"], [
        currentStoryIdx,
        stories.length,
        storyGroup.userId,
        onNavigate,
        onClose
    ]);
    const goPrev = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StoryViewer.useCallback[goPrev]": ()=>{
            if (currentStoryIdx > 0) {
                setCurrentStoryIdx({
                    "StoryViewer.useCallback[goPrev]": (i)=>i - 1
                }["StoryViewer.useCallback[goPrev]"]);
            } else {
                const groupIdx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"].findIndex({
                    "StoryViewer.useCallback[goPrev].groupIdx": (g)=>g.userId === storyGroup.userId
                }["StoryViewer.useCallback[goPrev].groupIdx"]);
                if (groupIdx > 0) {
                    const prevGroup = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockStories"][groupIdx - 1];
                    onNavigate(prevGroup, prevGroup.stories.length - 1);
                    setCurrentStoryIdx(prevGroup.stories.length - 1);
                }
            }
        }
    }["StoryViewer.useCallback[goPrev]"], [
        currentStoryIdx,
        storyGroup.userId,
        onNavigate
    ]);
    // Progress timer
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StoryViewer.useEffect": ()=>{
            if (!isOpen) return;
            const startTime = Date.now();
            const animate = {
                "StoryViewer.useEffect.animate": ()=>{
                    const elapsed = Date.now() - startTime;
                    const pct = Math.min(elapsed / storyDuration * 100, 100);
                    setProgress(pct);
                    if (pct < 100) {
                        timerRef.current = requestAnimationFrame(animate);
                    } else {
                        goNext();
                    }
                }
            }["StoryViewer.useEffect.animate"];
            timerRef.current = requestAnimationFrame(animate);
            return ({
                "StoryViewer.useEffect": ()=>{
                    if (timerRef.current) cancelAnimationFrame(timerRef.current);
                }
            })["StoryViewer.useEffect"];
        }
    }["StoryViewer.useEffect"], [
        currentStoryIdx,
        isOpen,
        goNext
    ]);
    // Touch areas
    const handleTapArea = (area)=>{
        if (timerRef.current) cancelAnimationFrame(timerRef.current);
        if (area === 'left') {
            goPrev();
        } else {
            goNext();
        }
    };
    if (!isOpen || !currentStory || !user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            className: "fixed inset-0 z-50 bg-black flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "w-5 h-5 text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 411,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 407,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-4 left-4 right-14 z-50 flex gap-1",
                    children: stories.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-full bg-white rounded-full transition-all duration-100', idx < currentStoryIdx ? 'w-full' : idx === currentStoryIdx ? '' : 'w-0'),
                                style: idx === currentStoryIdx ? {
                                    width: `${progress}%`
                                } : undefined
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 418,
                                columnNumber: 15
                            }, this)
                        }, idx, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 417,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 415,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-10 left-4 z-50 flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(user.displayName),
                            alt: "",
                            className: "w-8 h-8 rounded-full border border-white/30"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-white",
                                    children: user.displayName
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 437,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-white/60",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(currentStory.createdAt)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 438,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 436,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 430,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative w-full h-full flex items-center justify-center', `bg-gradient-to-br ${getStoryGradient(storyGroup.userId)}`),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-0 top-0 w-1/3 h-full z-40",
                            onClick: ()=>handleTapArea('left')
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute right-0 top-0 w-1/3 h-full z-40",
                            onClick: ()=>handleTapArea('right')
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-4 px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        scale: 0.9,
                                        opacity: 0
                                    },
                                    animate: {
                                        scale: 1,
                                        opacity: 1
                                    },
                                    className: "w-28 h-28 rounded-full flex items-center justify-center text-5xl font-bold text-white/80",
                                    style: {
                                        background: `linear-gradient(135deg, ${getGradient(currentStory.id).replace('from-', '#').split(' ')[0]}, rgba(255,184,0,0.3))`
                                    },
                                    children: user.displayName.split(' ').map((w)=>w[0]).join('')
                                }, currentStory.id, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this),
                                currentStory.caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-white/90 text-center font-medium",
                                    children: currentStory.caption
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 466,
                                    columnNumber: 15
                                }, this),
                                currentStory.media.alt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-white/50",
                                    children: currentStory.media.alt
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 469,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 443,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-4 left-4 right-4 z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: `Reply to ${user.displayName}...`,
                                value: replyText,
                                onChange: (e)=>setReplyText(e.target.value),
                                className: "flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-xs h-10 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 477,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.9
                                },
                                onClick: ()=>setReplyText(''),
                                className: "p-2.5 rounded-full bg-honey text-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 488,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 483,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 476,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/sections/feed-section.tsx",
            lineNumber: 400,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/feed-section.tsx",
        lineNumber: 399,
        columnNumber: 5
    }, this);
}
_s1(StoryViewer, "9eodHXL+/9tgfGfRLHHvUQlTvVk=");
_c2 = StoryViewer;
// ============================================
// Post Card Component
// ============================================
function PostCard({ post, index }) {
    _s2();
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(post.isLiked);
    const [isSaved, setIsSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(post.isBookmarked);
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(post.likes);
    const [showHeart, setShowHeart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showComments, setShowComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [commentText, setCommentText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(post.comments);
    const [showMore, setShowMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const lastTapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const author = post.author || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === post.authorId);
    if (!author) return null;
    const handleDoubleTap = ()=>{
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            if (!isLiked) {
                setIsLiked(true);
                setLikeCount((c)=>c + 1);
            }
            setShowHeart(true);
            setTimeout(()=>setShowHeart(false), 800);
        }
        lastTapRef.current = now;
    };
    const handleLike = ()=>{
        setIsLiked(!isLiked);
        setLikeCount((c)=>isLiked ? c - 1 : c + 1);
    };
    const handleSave = ()=>{
        setIsSaved(!isSaved);
    };
    const handleComment = ()=>{
        if (!commentText.trim()) return;
        const newComment = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])(),
            postId: post.id,
            authorId: 'u1',
            content: commentText,
            likes: 0,
            isLiked: false,
            replies: [],
            createdAt: new Date().toISOString()
        };
        setComments((prev)=>[
                ...prev,
                newComment
            ]);
        setCommentText('');
    };
    // Render caption with hashtags highlighted
    const renderCaption = (text)=>{
        const parts = text.split(/(#\w+)/g);
        return parts.map((part, i)=>part.startsWith('#') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-honey font-medium",
                children: part
            }, i, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 557,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: part
            }, i, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 559,
                columnNumber: 9
            }, this));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
        initial: {
            opacity: 0,
            y: 15
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            delay: 0.05 + index * 0.05
        },
        className: "glass-card rounded-2xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between p-3 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(author.displayName),
                                alt: author.displayName,
                                className: "w-9 h-9 rounded-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-semibold",
                                                children: author.displayName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 581,
                                                columnNumber: 15
                                            }, this),
                                            author.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-3.5 h-3.5 bg-honey rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[7px] text-background font-bold",
                                                    children: "✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 583,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 580,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-muted-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(post.createdAt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 588,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-1.5 rounded-full hover:bg-accent/50 transition-colors text-muted-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 594,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 572,
                columnNumber: 7
            }, this),
            post.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1 px-3 pb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                        className: "w-3 h-3 text-muted-foreground"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 601,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-muted-foreground",
                        children: post.location
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 602,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 600,
                columnNumber: 9
            }, this),
            (post.type === 'image' || post.type === 'video') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-3 rounded-xl overflow-hidden cursor-pointer",
                onClick: handleDoubleTap,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('aspect-square flex items-center justify-center', `bg-gradient-to-br ${getGradient(post.id)}`),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-12 h-12 text-muted-foreground/20"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 613,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 612,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showHeart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                scale: 0,
                                opacity: 1
                            },
                            animate: {
                                scale: 1.2,
                                opacity: 1
                            },
                            exit: {
                                scale: 1.5,
                                opacity: 0
                            },
                            transition: {
                                duration: 0.5
                            },
                            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: "w-24 h-24 text-white fill-white drop-shadow-2xl"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 626,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 619,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 617,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 608,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pt-2.5 pb-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xs leading-relaxed', !showMore && post.content.length > 120 ? 'line-clamp-3' : ''),
                        children: renderCaption(post.content)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 635,
                        columnNumber: 9
                    }, this),
                    post.content.length > 120 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowMore(!showMore),
                        className: "text-[10px] text-muted-foreground font-medium mt-0.5",
                        children: showMore ? 'Show less' : 'Show more'
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 639,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 634,
                columnNumber: 7
            }, this),
            post.hashtags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5 flex-wrap px-3 pb-2",
                children: post.hashtags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-honey font-medium hover:underline cursor-pointer",
                        children: tag
                    }, tag, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 652,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 650,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-3 py-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.8
                                },
                                onClick: handleLike,
                                className: "relative",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    animate: isLiked ? {
                                        scale: [
                                            1,
                                            1.3,
                                            1
                                        ]
                                    } : {
                                        scale: 1
                                    },
                                    transition: {
                                        duration: 0.3
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5 transition-colors', isLiked ? 'text-red-500 fill-red-500' : 'text-foreground')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 672,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 668,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.85
                                },
                                onClick: ()=>setShowComments(!showComments),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5', showComments ? 'text-honey' : 'text-foreground')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 686,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 682,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                whileTap: {
                                    scale: 0.85
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    className: "w-5 h-5 text-foreground -rotate-12"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 691,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 661,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.8
                        },
                        onClick: handleSave,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            animate: isSaved ? {
                                scale: [
                                    1,
                                    1.2,
                                    1
                                ]
                            } : {
                                scale: 1
                            },
                            transition: {
                                duration: 0.2
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-5 h-5 transition-colors', isSaved ? 'text-honey fill-honey' : 'text-foreground')
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 698,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 697,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 696,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 660,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 pb-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs font-semibold",
                    children: [
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(likeCount),
                        " likes"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 710,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 709,
                columnNumber: 7
            }, this),
            comments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 space-y-1",
                children: [
                    comments.slice(0, 2).map((comment)=>{
                        const cAuthor = comment.author || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === comment.authorId);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-semibold shrink-0",
                                    children: cAuthor?.displayName || 'User'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 720,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] text-muted-foreground",
                                    children: comment.content
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 721,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, comment.id, true, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 719,
                            columnNumber: 15
                        }, this);
                    }),
                    post.commentCount > 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowComments(!showComments),
                        className: "text-[10px] text-muted-foreground font-medium",
                        children: [
                            "View all ",
                            post.commentCount,
                            " comments"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 726,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 715,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showComments && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        height: 0,
                        opacity: 0
                    },
                    animate: {
                        height: 'auto',
                        opacity: 1
                    },
                    exit: {
                        height: 0,
                        opacity: 0
                    },
                    className: "overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                            className: "bg-border mx-3 my-2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 745,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                            className: "max-h-48",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 space-y-2.5 pb-2",
                                children: comments.map((comment)=>{
                                    const cAuthor = comment.author || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === comment.authorId);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(cAuthor?.displayName || 'User'),
                                                alt: "",
                                                className: "w-6 h-6 rounded-full shrink-0 mt-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 752,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[11px] font-semibold",
                                                                children: cAuthor?.displayName || 'User'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                                lineNumber: 759,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[9px] text-muted-foreground",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(comment.createdAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                                lineNumber: 760,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] text-muted-foreground",
                                                        children: comment.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                                        lineNumber: 762,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 757,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-muted-foreground shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "w-3 h-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                                    lineNumber: 765,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 764,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, comment.id, true, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 751,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 747,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/feed-section.tsx",
                            lineNumber: 746,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 739,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 737,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 px-3 py-2.5 border-t border-border mt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-6 h-6 rounded-full bg-honey/20 flex items-center justify-center text-[8px] font-bold text-honey shrink-0",
                        children: "JK"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 778,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "Add a comment...",
                        value: commentText,
                        onChange: (e)=>setCommentText(e.target.value),
                        onKeyDown: (e)=>e.key === 'Enter' && handleComment(),
                        className: "flex-1 bg-transparent text-xs h-7 rounded-lg border-none shadow-none px-0 focus-visible:ring-0"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 781,
                        columnNumber: 9
                    }, this),
                    commentText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            scale: 0
                        },
                        animate: {
                            scale: 1
                        },
                        whileTap: {
                            scale: 0.9
                        },
                        onClick: handleComment,
                        className: "text-honey text-xs font-semibold shrink-0",
                        children: "Post"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 789,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 777,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/feed-section.tsx",
        lineNumber: 565,
        columnNumber: 5
    }, this);
}
_s2(PostCard, "HBGhdSzvTm0/Z4BoNsa1gkRPqFA=");
_c3 = PostCard;
// ============================================
// Explore Grid
// ============================================
function ExploreGrid() {
    const allPosts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockPosts"].filter((p)=>p.type === 'image' || p.type === 'video');
    const regularPosts = allPosts.filter((_, i)=>i % 3 !== 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    placeholder: "Search explore...",
                    className: "glass-card bg-transparent text-xs h-9 rounded-xl"
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/feed-section.tsx",
                    lineNumber: 815,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 814,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-3 gap-0.5",
                children: regularPosts.map((post, idx)=>{
                    const author = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find((u)=>u.id === post.authorId);
                    const isLarge = idx % 7 === 0;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: idx * 0.03
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative aspect-square cursor-pointer group overflow-hidden', isLarge && 'col-span-1 row-span-2'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('absolute inset-0', `bg-gradient-to-br ${getGradient(post.id + idx)}`)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 837,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                    className: "w-8 h-8 text-muted-foreground/15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 839,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 838,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 text-white text-xs font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                                    className: "w-4 h-4 fill-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                                    lineNumber: 846,
                                                    columnNumber: 21
                                                }, this),
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatNumber"])(post.likes)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/feed-section.tsx",
                                            lineNumber: 845,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                    className: "w-4 h-4 fill-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 21
                                                }, this),
                                                post.commentCount
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/feed-section.tsx",
                                            lineNumber: 849,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 844,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 843,
                                columnNumber: 15
                            }, this)
                        ]
                    }, `${post.id}-${idx}`, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 827,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 822,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/feed-section.tsx",
        lineNumber: 812,
        columnNumber: 5
    }, this);
}
_c4 = ExploreGrid;
// ============================================
// Create Post Form
// ============================================
function CreatePostForm({ onSubmit, onClose }) {
    _s3();
    const [caption, setCaption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [hashtags, setHashtags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [location, setLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [privacy, setPrivacy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('public');
    const [previewMode, setPreviewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDragOver, setIsDragOver] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"][0];
    const handleSubmit = ()=>{
        const newPost = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateId"])(),
            authorId: currentUser.id,
            author: currentUser,
            content: caption,
            type: 'image',
            visibility: privacy,
            media: [],
            hashtags: hashtags.split(/[\s,]+/).filter(Boolean).map((t)=>t.startsWith('#') ? t : `#${t}`),
            mentions: [],
            location: location || undefined,
            taggedUsers: [],
            likes: 0,
            comments: [],
            commentCount: 0,
            shares: 0,
            isLiked: false,
            isShared: false,
            isBookmarked: false,
            isPinned: false,
            createdAt: new Date().toISOString()
        };
        onSubmit(newPost);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        className: "text-gradient-honey",
                        children: "Create Post"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 908,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                        children: "Share something with your followers"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 909,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 907,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 py-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('glass-card rounded-xl p-8 border-2 border-dashed text-center cursor-pointer transition-all', isDragOver ? 'border-honey bg-honey/5' : 'border-honey/20 hover:border-honey/40'),
                        onDragOver: (e)=>{
                            e.preventDefault();
                            setIsDragOver(true);
                        },
                        onDragLeave: ()=>setIsDragOver(false),
                        onDrop: (e)=>{
                            e.preventDefault();
                            setIsDragOver(false);
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-full bg-honey/10 flex items-center justify-center mx-auto mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                    className: "w-6 h-6 text-honey"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/feed-section.tsx",
                                    lineNumber: 924,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 923,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium",
                                children: "Drag & drop your media here"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 926,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-muted-foreground mt-1",
                                children: "or click to browse files"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 927,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[9px] text-muted-foreground/60 mt-1",
                                children: "PNG, JPG, MP4 up to 10MB"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 914,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-foreground",
                                children: "Caption"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 933,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                                placeholder: "Write a caption...",
                                value: caption,
                                onChange: (e)=>setCaption(e.target.value),
                                className: "glass-card bg-transparent text-sm min-h-[80px] resize-none"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 934,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 932,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-foreground",
                                children: "Hashtags"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 944,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "design, photography, lifestyle...",
                                value: hashtags,
                                onChange: (e)=>setHashtags(e.target.value),
                                className: "glass-card bg-transparent text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 945,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 943,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-foreground flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 956,
                                        columnNumber: 13
                                    }, this),
                                    "Location"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 955,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Add a location...",
                                value: location,
                                onChange: (e)=>setLocation(e.target.value),
                                className: "glass-card bg-transparent text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 959,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 954,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-medium text-foreground",
                                children: "Privacy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 969,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: privacy,
                                onValueChange: setPrivacy,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-full glass-card bg-transparent text-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                            fileName: "[project]/src/components/sections/feed-section.tsx",
                                            lineNumber: 972,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 971,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "public",
                                                children: "Public - Everyone"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 975,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "friends",
                                                children: "Friends Only"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 976,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "private",
                                                children: "Private - Only You"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 977,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 974,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 970,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 968,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setPreviewMode(!previewMode),
                        className: "text-[10px] text-honey font-medium hover:underline",
                        children: previewMode ? 'Hide Preview' : 'Show Preview'
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 983,
                        columnNumber: 9
                    }, this),
                    previewMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            height: 0
                        },
                        animate: {
                            opacity: 1,
                            height: 'auto'
                        },
                        className: "glass-card rounded-xl p-3 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(currentUser.displayName),
                                        alt: "",
                                        className: "w-8 h-8 rounded-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 997,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold",
                                                        children: currentUser.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                                        lineNumber: 1004,
                                                        columnNumber: 19
                                                    }, this),
                                                    currentUser.isVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-3 h-3 bg-honey rounded-full flex items-center justify-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[6px] text-background font-bold",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/feed-section.tsx",
                                                            lineNumber: 1007,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                                        lineNumber: 1006,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 1003,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-muted-foreground",
                                                children: "Just now"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                                lineNumber: 1011,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 1002,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 996,
                                columnNumber: 13
                            }, this),
                            caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-muted-foreground",
                                children: caption
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 1015,
                                columnNumber: 15
                            }, this),
                            hashtags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 flex-wrap",
                                children: hashtags.split(/[\s,]+/).filter(Boolean).map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-honey",
                                        children: t.startsWith('#') ? t : `#${t}`
                                    }, i, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 1020,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 1018,
                                columnNumber: 15
                            }, this),
                            location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1 text-[10px] text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "w-3 h-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/feed-section.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 17
                                    }, this),
                                    location
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 1027,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 991,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 912,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                className: "gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: onClose,
                        className: "glass-card text-xs",
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 1037,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleSubmit,
                        disabled: !caption.trim(),
                        className: "bg-honey text-background hover:bg-honey-dark text-xs font-semibold shadow-honey",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                className: "w-3.5 h-3.5 mr-1.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/sections/feed-section.tsx",
                                lineNumber: 1045,
                                columnNumber: 11
                            }, this),
                            "Post"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/sections/feed-section.tsx",
                        lineNumber: 1040,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/feed-section.tsx",
                lineNumber: 1036,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s3(CreatePostForm, "uHZNRg43EMOmZnZtOzCctr8U79A=");
_c5 = CreatePostForm;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "FeedSection");
__turbopack_context__.k.register(_c1, "StoriesRow");
__turbopack_context__.k.register(_c2, "StoryViewer");
__turbopack_context__.k.register(_c3, "PostCard");
__turbopack_context__.k.register(_c4, "ExploreGrid");
__turbopack_context__.k.register(_c5, "CreatePostForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_cb61bcd7._.js.map