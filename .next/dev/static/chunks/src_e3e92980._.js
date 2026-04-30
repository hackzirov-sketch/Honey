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
"[project]/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
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
"[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>Accordion,
    "AccordionContent",
    ()=>AccordionContent,
    "AccordionItem",
    ()=>AccordionItem,
    "AccordionTrigger",
    ()=>AccordionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Accordion({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "accordion",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Accordion;
function AccordionItem({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "accordion-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b last:border-b-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = AccordionItem;
function AccordionTrigger({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "accordion-trigger",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/accordion.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 35,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_c2 = AccordionTrigger;
function AccordionContent({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "accordion-content",
        className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pt-0 pb-4", className),
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/ui/accordion.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/accordion.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c3 = AccordionContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Accordion");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger");
__turbopack_context__.k.register(_c3, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>AlertDialog,
    "AlertDialogAction",
    ()=>AlertDialogAction,
    "AlertDialogCancel",
    ()=>AlertDialogCancel,
    "AlertDialogContent",
    ()=>AlertDialogContent,
    "AlertDialogDescription",
    ()=>AlertDialogDescription,
    "AlertDialogFooter",
    ()=>AlertDialogFooter,
    "AlertDialogHeader",
    ()=>AlertDialogHeader,
    "AlertDialogOverlay",
    ()=>AlertDialogOverlay,
    "AlertDialogPortal",
    ()=>AlertDialogPortal,
    "AlertDialogTitle",
    ()=>AlertDialogTitle,
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "alert-dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = AlertDialog;
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "alert-dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = AlertDialogTrigger;
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "alert-dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = AlertDialogPortal;
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "alert-dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = AlertDialogOverlay;
function AlertDialogContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/alert-dialog.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "alert-dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/alert-dialog.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c4 = AlertDialogContent;
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_c5 = AlertDialogHeader;
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c6 = AlertDialogFooter;
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "alert-dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c7 = AlertDialogTitle;
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "alert-dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c8 = AlertDialogDescription;
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c9 = AlertDialogAction;
function AlertDialogCancel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cancel"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
            variant: "outline"
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert-dialog.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_c10 = AlertDialogCancel;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "AlertDialog");
__turbopack_context__.k.register(_c1, "AlertDialogTrigger");
__turbopack_context__.k.register(_c2, "AlertDialogPortal");
__turbopack_context__.k.register(_c3, "AlertDialogOverlay");
__turbopack_context__.k.register(_c4, "AlertDialogContent");
__turbopack_context__.k.register(_c5, "AlertDialogHeader");
__turbopack_context__.k.register(_c6, "AlertDialogFooter");
__turbopack_context__.k.register(_c7, "AlertDialogTitle");
__turbopack_context__.k.register(_c8, "AlertDialogDescription");
__turbopack_context__.k.register(_c9, "AlertDialogAction");
__turbopack_context__.k.register(_c10, "AlertDialogCancel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/progress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Progress",
    ()=>Progress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-progress/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Progress({ className, value, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "progress",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$progress$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "progress-indicator",
            className: "bg-primary h-full w-full flex-1 transition-all",
            style: {
                transform: `translateX(-${100 - (value || 0)}%)`
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ui/progress.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/progress.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = Progress;
;
var _c;
__turbopack_context__.k.register(_c, "Progress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/sections/settings-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/languages.js [app-client] (ecmascript) <export default as Languages>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MonitorDot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor-dot.js [app-client] (ecmascript) <export default as MonitorDot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-client] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mock-data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/progress.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
// ============================================
// Settings Storage Helper
// ============================================
const SETTINGS_KEY = 'honey-settings';
const defaultSettings = {
    msgNotif: true,
    groupNotif: true,
    channelNotif: true,
    callNotif: true,
    streamNotif: true,
    mentionNotif: true,
    dnd: false,
    twoFA: false,
    passcode: false,
    profileVis: 'public',
    onlineStatus: 'everyone',
    whoMessage: 'everyone',
    whoGroups: 'everyone',
    chatTheme: 'default',
    fontSize: 'medium',
    msgPreview: true,
    enterSend: true,
    autoDownload: true,
    glassEffect: true,
    compactMode: false,
    animLevel: 'normal',
    accentColor: 'honey',
    noiseSuppress: true,
    bgBlur: false,
    joinMuted: false,
    cameraOffDefault: false,
    streamQuality: '1080p',
    chatModeration: true,
    youtubeConnected: false,
    instaConnected: false
};
function loadSettings() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) return {
            ...defaultSettings,
            ...JSON.parse(stored)
        };
    } catch  {
    // ignore
    }
    return defaultSettings;
}
function saveSettings(s) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    } catch  {
    // ignore
    }
}
// ============================================
// Reusable Sub-Components (declared outside render)
// ============================================
function SectionTitle({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
        className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-1",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/sections/settings-section.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
_c = SectionTitle;
function ToggleRow({ label, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                checked: value,
                onCheckedChange: onChange
            }, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/settings-section.tsx",
        lineNumber: 181,
        columnNumber: 5
    }, this);
}
_c1 = ToggleRow;
function SelectRow({ label, value, onValueChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between py-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                value: value,
                onValueChange: onValueChange,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                        className: "w-36 h-8 text-xs",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                        children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                value: o.value,
                                children: o.label
                            }, o.value, false, {
                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/settings-section.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
_c2 = SelectRow;
// ============================================
// Settings Categories
// ============================================
const categories = [
    {
        id: 'account',
        label: 'Account',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
    },
    {
        id: 'privacy',
        label: 'Privacy & Security',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
    },
    {
        id: 'notifications',
        label: 'Notifications',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"]
    },
    {
        id: 'chat',
        label: 'Chat Settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        id: 'appearance',
        label: 'Appearance',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"]
    },
    {
        id: 'storage',
        label: 'Data & Storage',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"]
    },
    {
        id: 'meeting',
        label: 'Meeting Settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"]
    },
    {
        id: 'stream',
        label: 'Stream Settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"]
    },
    {
        id: 'language',
        label: 'Language',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$languages$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Languages$3e$__["Languages"]
    },
    {
        id: 'help',
        label: 'Help & Support',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"]
    }
];
function SettingsSection({ onBack }) {
    _s();
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('account');
    const [deleteDialog, setDeleteDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsVersion, setSettingsVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Load settings from localStorage safely
    const [s, setS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultSettings);
    // Load on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "SettingsSection.useState": ()=>{
            setS(loadSettings());
        }
    }["SettingsSection.useState"]);
    const update = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SettingsSection.useCallback[update]": (key, value)=>{
            setS({
                "SettingsSection.useCallback[update]": (prev)=>{
                    const next = {
                        ...prev,
                        [key]: value
                    };
                    saveSettings(next);
                    return next;
                }
            }["SettingsSection.useCallback[update]"]);
        }
    }["SettingsSection.useCallback[update]"], []);
    const settingContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                x: 12
            },
            animate: {
                opacity: 1,
                x: 0
            },
            exit: {
                opacity: 0,
                x: -12
            },
            transition: {
                duration: 0.15
            },
            className: "pb-6",
            children: [
                activeCategory === 'account' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Personal Information"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: "Display Name"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            defaultValue: "Jasur Karimov",
                                            className: "h-9 text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: "Username"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 278,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            defaultValue: "jasur_karimov",
                                            className: "h-9 text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 279,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 277,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 282,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            defaultValue: "jasur@example.com",
                                            className: "h-9 text-sm",
                                            type: "email"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 281,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Security"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: "Current Password"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "password",
                                            placeholder: "••••••••",
                                            className: "h-9 text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: "New Password"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 293,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            type: "password",
                                            placeholder: "••••••••",
                                            className: "h-9 text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 294,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 292,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Danger Zone"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 297,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "ghost",
                            className: "w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 h-9 text-sm",
                            onClick: ()=>setDeleteDialog(true),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this),
                                "Delete Account"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 298,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 270,
                    columnNumber: 11
                }, this),
                activeCategory === 'privacy' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Authentication"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 312,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Two-Factor Authentication",
                            value: s.twoFA,
                            onChange: (v)=>update('twoFA', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 313,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "App Lock Passcode",
                            value: s.passcode,
                            onChange: (v)=>update('passcode', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 314,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Visibility"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 316,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Profile Visibility",
                            value: s.profileVis,
                            onValueChange: (v)=>update('profileVis', v),
                            options: [
                                {
                                    value: 'public',
                                    label: 'Public'
                                },
                                {
                                    value: 'friends',
                                    label: 'Friends Only'
                                },
                                {
                                    value: 'private',
                                    label: 'Private'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 317,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Online Status",
                            value: s.onlineStatus,
                            onValueChange: (v)=>update('onlineStatus', v),
                            options: [
                                {
                                    value: 'everyone',
                                    label: 'Everyone'
                                },
                                {
                                    value: 'contacts',
                                    label: 'Contacts'
                                },
                                {
                                    value: 'nobody',
                                    label: 'Nobody'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Who Can Message Me",
                            value: s.whoMessage,
                            onValueChange: (v)=>update('whoMessage', v),
                            options: [
                                {
                                    value: 'everyone',
                                    label: 'Everyone'
                                },
                                {
                                    value: 'contacts',
                                    label: 'Contacts'
                                },
                                {
                                    value: 'nobody',
                                    label: 'Nobody'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 337,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Who Can Add to Groups",
                            value: s.whoGroups,
                            onValueChange: (v)=>update('whoGroups', v),
                            options: [
                                {
                                    value: 'everyone',
                                    label: 'Everyone'
                                },
                                {
                                    value: 'contacts',
                                    label: 'Contacts'
                                },
                                {
                                    value: 'nobody',
                                    label: 'Nobody'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Blocked Users"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 358,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].slice(3, 6).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateAvatar"])(u.displayName),
                                            alt: "",
                                            className: "w-7 h-7 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 362,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm truncate",
                                                    children: u.displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 364,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: [
                                                        "@",
                                                        u.username
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 363,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            className: "h-7 text-[10px] text-honey hover:text-honey-light",
                                            children: "Unblock"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 367,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, u.id, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 361,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Active Sessions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 374,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1",
                            children: [
                                {
                                    device: 'MacBook Pro',
                                    loc: 'Tashkent, UZ',
                                    time: 'Active now',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"],
                                    current: true
                                },
                                {
                                    device: 'iPhone 15 Pro',
                                    loc: 'Tashkent, UZ',
                                    time: '2h ago',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
                                    current: false
                                },
                                {
                                    device: 'iPad Air',
                                    loc: 'Tashkent, UZ',
                                    time: '3d ago',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"],
                                    current: false
                                }
                            ].map((session, i)=>{
                                const Icon = session.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent/20 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-4 h-4 text-muted-foreground flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 384,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: session.device
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 386,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: session.loc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 385,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right flex-shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-[10px] ${session.current ? 'text-emerald-400' : 'text-muted-foreground'}`,
                                                    children: session.time
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 390,
                                                    columnNumber: 23
                                                }, this),
                                                session.current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] text-emerald-400",
                                                    children: "Current"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 43
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 389,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 383,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 375,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 311,
                    columnNumber: 11
                }, this),
                activeCategory === 'notifications' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Notification Types"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 405,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Direct Messages",
                            value: s.msgNotif,
                            onChange: (v)=>update('msgNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 406,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Group Messages",
                            value: s.groupNotif,
                            onChange: (v)=>update('groupNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 407,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Channel Updates",
                            value: s.channelNotif,
                            onChange: (v)=>update('channelNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 408,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Voice & Video Calls",
                            value: s.callNotif,
                            onChange: (v)=>update('callNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Live Streams",
                            value: s.streamNotif,
                            onChange: (v)=>update('streamNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Mentions",
                            value: s.mentionNotif,
                            onChange: (v)=>update('mentionNotif', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 411,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Quiet Mode"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 413,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Do Not Disturb",
                            value: s.dnd,
                            onChange: (v)=>update('dnd', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 414,
                            columnNumber: 13
                        }, this),
                        s.dnd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            initial: {
                                opacity: 0,
                                height: 0
                            },
                            animate: {
                                opacity: 1,
                                height: 'auto'
                            },
                            className: "text-[10px] text-muted-foreground pl-1 flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                    className: "w-3 h-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 421,
                                    columnNumber: 17
                                }, this),
                                "All notifications are silenced"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 416,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 404,
                    columnNumber: 11
                }, this),
                activeCategory === 'chat' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Chat Appearance"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 431,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Chat Theme",
                            value: s.chatTheme,
                            onValueChange: (v)=>update('chatTheme', v),
                            options: [
                                {
                                    value: 'default',
                                    label: 'Default'
                                },
                                {
                                    value: 'dark',
                                    label: 'Dark'
                                },
                                {
                                    value: 'light',
                                    label: 'Light'
                                },
                                {
                                    value: 'midnight',
                                    label: 'Midnight'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 432,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Font Size",
                            value: s.fontSize,
                            onValueChange: (v)=>update('fontSize', v),
                            options: [
                                {
                                    value: 'small',
                                    label: 'Small'
                                },
                                {
                                    value: 'medium',
                                    label: 'Medium'
                                },
                                {
                                    value: 'large',
                                    label: 'Large'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Behavior"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 454,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Message Preview",
                            value: s.msgPreview,
                            onChange: (v)=>update('msgPreview', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 455,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Enter to Send",
                            value: s.enterSend,
                            onChange: (v)=>update('enterSend', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 456,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Auto-download Media",
                            value: s.autoDownload,
                            onChange: (v)=>update('autoDownload', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 457,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Chat Background"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 459,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-4 gap-2 py-2",
                            children: [
                                {
                                    id: 'none',
                                    label: 'None',
                                    color: 'bg-card'
                                },
                                {
                                    id: 'gradient1',
                                    label: 'Warm',
                                    color: 'bg-gradient-to-br from-honey/20 to-amber/10'
                                },
                                {
                                    id: 'gradient2',
                                    label: 'Ocean',
                                    color: 'bg-gradient-to-br from-sky-500/20 to-cyan-500/10'
                                },
                                {
                                    id: 'gradient3',
                                    label: 'Forest',
                                    color: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10'
                                }
                            ].map((bg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: "aspect-square rounded-xl border border-border flex flex-col items-center justify-center gap-1 text-[9px] text-muted-foreground hover:border-honey/40 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-full h-full rounded-lg ${bg.color} flex items-center justify-center`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                className: "w-5 h-5 opacity-20"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                                lineNumber: 473,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 472,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px]",
                                            children: bg.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 475,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, bg.id, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 467,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 460,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 430,
                    columnNumber: 11
                }, this),
                activeCategory === 'appearance' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Theme"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 485,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 gap-2 py-2",
                            children: [
                                {
                                    id: 'dark',
                                    label: 'Dark',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"]
                                },
                                {
                                    id: 'light',
                                    label: 'Light',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"]
                                },
                                {
                                    id: 'system',
                                    label: 'System',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2d$dot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MonitorDot$3e$__["MonitorDot"]
                                }
                            ].map((theme)=>{
                                const Icon = theme.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    className: "flex flex-col items-center gap-2 py-3 rounded-xl border border-border hover:border-honey/40 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-5 h-5 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 499,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs",
                                            children: theme.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 500,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, theme.id, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 494,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Accent Color"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 py-2 flex-wrap",
                            children: [
                                {
                                    id: 'honey',
                                    color: '#FFB800'
                                },
                                {
                                    id: 'rose',
                                    color: '#F43F5E'
                                },
                                {
                                    id: 'emerald',
                                    color: '#10B981'
                                },
                                {
                                    id: 'sky',
                                    color: '#0EA5E9'
                                },
                                {
                                    id: 'violet',
                                    color: '#8B5CF6'
                                },
                                {
                                    id: 'orange',
                                    color: '#F97316'
                                }
                            ].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    onClick: ()=>update('accentColor', c.id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center', s.accentColor === c.id ? 'border-foreground scale-110' : 'border-transparent'),
                                    style: {
                                        backgroundColor: c.color
                                    },
                                    children: s.accentColor === c.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-4 h-4 text-white",
                                        strokeWidth: 3
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/sections/settings-section.tsx",
                                        lineNumber: 526,
                                        columnNumber: 46
                                    }, this)
                                }, c.id, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 516,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 507,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Effects"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 531,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Glass Effect",
                            value: s.glassEffect,
                            onChange: (v)=>update('glassEffect', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 532,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Compact Mode",
                            value: s.compactMode,
                            onChange: (v)=>update('compactMode', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 533,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Animation Level",
                            value: s.animLevel,
                            onValueChange: (v)=>update('animLevel', v),
                            options: [
                                {
                                    value: 'none',
                                    label: 'None'
                                },
                                {
                                    value: 'reduced',
                                    label: 'Reduced'
                                },
                                {
                                    value: 'normal',
                                    label: 'Normal'
                                },
                                {
                                    value: 'enhanced',
                                    label: 'Enhanced'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 534,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 484,
                    columnNumber: 11
                }, this),
                activeCategory === 'storage' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Cache"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between py-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: "Cache Size"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 554,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-muted-foreground",
                                            children: "Temporary app data"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 555,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 553,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: "text-xs",
                                            children: "124.5 MB"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            className: "h-7 text-xs text-honey hover:text-honey-light",
                                            children: "Clear"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 561,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 557,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 552,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Storage Usage"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 567,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 py-2",
                            children: [
                                {
                                    label: 'Photos',
                                    used: 2.4,
                                    total: 5,
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
                                    color: 'text-emerald-400'
                                },
                                {
                                    label: 'Videos',
                                    used: 4.1,
                                    total: 10,
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"],
                                    color: 'text-sky-400'
                                },
                                {
                                    label: 'Documents',
                                    used: 0.8,
                                    total: 2,
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                    color: 'text-honey'
                                },
                                {
                                    label: 'Audio',
                                    used: 1.2,
                                    total: 5,
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"],
                                    color: 'text-violet-400'
                                }
                            ].map((item)=>{
                                const Icon = item.icon;
                                const pct = item.used / item.total * 100;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: `w-4 h-4 ${item.color}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                                            lineNumber: 581,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: item.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: [
                                                        item.used,
                                                        " GB / ",
                                                        item.total,
                                                        " GB"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 584,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 579,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$progress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Progress"], {
                                            value: pct,
                                            className: "h-1.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 588,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 578,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 568,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Auto-Download"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 594,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Media auto-download",
                            value: "wifi",
                            onValueChange: ()=>{},
                            options: [
                                {
                                    value: 'wifi',
                                    label: 'Wi-Fi Only'
                                },
                                {
                                    value: 'always',
                                    label: 'Always'
                                },
                                {
                                    value: 'never',
                                    label: 'Never'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 595,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 550,
                    columnNumber: 11
                }, this),
                activeCategory === 'meeting' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Audio & Video"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 611,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Camera",
                            value: "default",
                            onValueChange: ()=>{},
                            options: [
                                {
                                    value: 'default',
                                    label: 'Default'
                                },
                                {
                                    value: 'front',
                                    label: 'Front Camera'
                                },
                                {
                                    value: 'back',
                                    label: 'Back Camera'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 612,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Microphone",
                            value: "default",
                            onValueChange: ()=>{},
                            options: [
                                {
                                    value: 'default',
                                    label: 'Default'
                                },
                                {
                                    value: 'headset',
                                    label: 'Headset'
                                },
                                {
                                    value: 'speaker',
                                    label: 'Speaker'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 622,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Speaker",
                            value: "default",
                            onValueChange: ()=>{},
                            options: [
                                {
                                    value: 'default',
                                    label: 'Default'
                                },
                                {
                                    value: 'earpiece',
                                    label: 'Earpiece'
                                },
                                {
                                    value: 'bluetooth',
                                    label: 'Bluetooth'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 632,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Features"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 643,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Noise Suppression",
                            value: s.noiseSuppress,
                            onChange: (v)=>update('noiseSuppress', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 644,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Background Blur",
                            value: s.bgBlur,
                            onChange: (v)=>update('bgBlur', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 645,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Join Muted",
                            value: s.joinMuted,
                            onChange: (v)=>update('joinMuted', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 646,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Camera Off by Default",
                            value: s.cameraOffDefault,
                            onChange: (v)=>update('cameraOffDefault', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 647,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 610,
                    columnNumber: 11
                }, this),
                activeCategory === 'stream' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Stream Quality"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 654,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectRow, {
                            label: "Default Quality",
                            value: s.streamQuality,
                            onValueChange: (v)=>update('streamQuality', v),
                            options: [
                                {
                                    value: '720p',
                                    label: '720p HD'
                                },
                                {
                                    value: '1080p',
                                    label: '1080p Full HD'
                                },
                                {
                                    value: '1440p',
                                    label: '1440p 2K'
                                },
                                {
                                    value: '4k',
                                    label: '4K Ultra HD'
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 655,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleRow, {
                            label: "Chat Moderation",
                            value: s.chatModeration,
                            onChange: (v)=>update('chatModeration', v)
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 666,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Connected Accounts"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 668,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 py-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
                                                className: "w-4 h-4 text-red-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                                lineNumber: 672,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 671,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "YouTube"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 675,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: s.youtubeConnected ? 'Connected' : 'Not connected'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 676,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 674,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                            checked: s.youtubeConnected,
                                            onCheckedChange: (v)=>update('youtubeConnected', v)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 680,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 670,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 px-3 py-2.5 rounded-xl glass-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/10 to-pink-500/10 flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                className: "w-4 h-4 text-pink-500"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                                lineNumber: 687,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 686,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Instagram"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 690,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-muted-foreground",
                                                    children: s.instaConnected ? 'Connected' : 'Not connected'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                                    lineNumber: 691,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 689,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                            checked: s.instaConnected,
                                            onCheckedChange: (v)=>update('instaConnected', v)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 695,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 669,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 653,
                    columnNumber: 11
                }, this),
                activeCategory === 'language' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "App Language"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 707,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 py-2",
                            children: [
                                {
                                    code: 'en',
                                    label: 'English',
                                    flag: '🇬🇧'
                                },
                                {
                                    code: 'uz',
                                    label: "O'zbek",
                                    flag: '🇺🇿'
                                },
                                {
                                    code: 'ru',
                                    label: 'Русский',
                                    flag: '🇷🇺'
                                }
                            ].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-accent/20 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-lg",
                                            children: lang.flag
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 719,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm flex-1 text-left",
                                            children: lang.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 720,
                                            columnNumber: 19
                                        }, this),
                                        lang.code === 'en' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            className: "bg-honey/10 text-honey border-0 text-[10px]",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 722,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, lang.code, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 714,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 708,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 706,
                    columnNumber: 11
                }, this),
                activeCategory === 'help' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Frequently Asked Questions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 735,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                            type: "single",
                            collapsible: true,
                            className: "space-y-1",
                            children: [
                                {
                                    q: 'How do I change my password?',
                                    a: 'Go to Settings → Account → Security, then enter your current and new password.'
                                },
                                {
                                    q: 'How do I enable two-factor authentication?',
                                    a: 'Go to Settings → Privacy & Security → Two-Factor Authentication and follow the setup steps.'
                                },
                                {
                                    q: 'How do I delete my account?',
                                    a: 'Go to Settings → Account → Danger Zone → Delete Account. This action is irreversible.'
                                },
                                {
                                    q: 'How do I report a user?',
                                    a: 'Visit their profile, tap the three-dot menu, and select Report.'
                                },
                                {
                                    q: 'How do I contact support?',
                                    a: 'Use the Contact Support option below or email support@honey.app'
                                }
                            ].map((faq, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                                    value: `faq-${i}`,
                                    className: "border-border",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                            className: "text-sm py-2.5 hover:no-underline",
                                            children: faq.q
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 760,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                            className: "text-xs text-muted-foreground pb-2",
                                            children: faq.a
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 763,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 759,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 736,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                            children: "Support"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 770,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-1.5 py-2",
                            children: [
                                {
                                    label: 'Contact Support',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"]
                                },
                                {
                                    label: 'Report a Bug',
                                    icon: Bug
                                },
                                {
                                    label: 'Terms of Service',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                                },
                                {
                                    label: 'Privacy Policy',
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"]
                                }
                            ].map((item)=>{
                                const Icon = item.icon;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.98
                                    },
                                    className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/20 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-4 h-4 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 785,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 786,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-4 h-4 text-muted-foreground ml-auto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 787,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 780,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 771,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 734,
                    columnNumber: 11
                }, this)
            ]
        }, activeCategory, true, {
            fileName: "[project]/src/components/sections/settings-section.tsx",
            lineNumber: 260,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/sections/settings-section.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, this);
    // Suppress unused variable warning
    void settingsVersion;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pb-24 md:pb-6 overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-4 md:px-6 pt-1 pb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        whileTap: {
                            scale: 0.9
                        },
                        onClick: onBack,
                        className: "p-1.5 rounded-lg hover:bg-accent/30 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 810,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 805,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-lg font-bold",
                        children: "Settings"
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 812,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 804,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 815,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-56 flex-shrink-0 px-4 py-4 border-r border-border",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "space-y-0.5",
                            children: categories.map((cat)=>{
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    whileTap: {
                                        scale: 0.97
                                    },
                                    onClick: ()=>setActiveCategory(cat.id),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all', isActive ? 'bg-honey/10 text-honey font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-accent/20'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 837,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: cat.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/sections/settings-section.tsx",
                                            lineNumber: 838,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, cat.id, true, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 826,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 821,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 820,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 px-6 py-4 min-w-0",
                        children: settingContent
                    }, void 0, false, {
                        fileName: "[project]/src/components/sections/settings-section.tsx",
                        lineNumber: 846,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 818,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden px-4 py-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
                    type: "single",
                    collapsible: true,
                    defaultValue: activeCategory,
                    children: categories.map((cat)=>{
                        const Icon = cat.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
                            value: cat.id,
                            className: "border-border",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                                    onClick: ()=>setActiveCategory(cat.id),
                                    className: "text-sm py-3 hover:no-underline",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "w-4 h-4 text-honey"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                                lineNumber: 861,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: cat.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/sections/settings-section.tsx",
                                                lineNumber: 862,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/sections/settings-section.tsx",
                                        lineNumber: 860,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 856,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                                    className: "pb-2",
                                    children: settingContent
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 865,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, cat.id, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 855,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 851,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 850,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: deleteDialog,
                onOpenChange: setDeleteDialog,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    className: "glass-premium border-border",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    className: "text-red-400",
                                    children: "Delete Account"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 876,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    className: "text-sm",
                                    children: "This action cannot be undone. All your data, messages, and media will be permanently deleted."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 877,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 875,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    className: "text-sm",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 883,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    className: "bg-red-500 hover:bg-red-600 text-white text-sm",
                                    children: "Delete Account"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/sections/settings-section.tsx",
                                    lineNumber: 884,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/sections/settings-section.tsx",
                            lineNumber: 882,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/sections/settings-section.tsx",
                    lineNumber: 874,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/sections/settings-section.tsx",
                lineNumber: 873,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/sections/settings-section.tsx",
        lineNumber: 802,
        columnNumber: 5
    }, this);
}
_s(SettingsSection, "NLArVpDhwhtNJTEqFB+C9TVEoew=");
_c3 = SettingsSection;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SectionTitle");
__turbopack_context__.k.register(_c1, "ToggleRow");
__turbopack_context__.k.register(_c2, "SelectRow");
__turbopack_context__.k.register(_c3, "SettingsSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_e3e92980._.js.map