import request from 'supertest';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface UserPayload {
  id: string;
  username: string;
  email: string;
}

interface RegisterData {
  user: UserPayload;
  tokens: Tokens;
}

interface ApiSuccess<T> {
  success: true;
  data: T;
}

const API_BASE_URL = process.env.HONEY_API_BASE ?? 'http://localhost:5000';
const api = request(API_BASE_URL);
const rateLimitBypassHeader = { 'x-honey-test-bypass': '1' } as const;

const defaultPassword = 'Password123!';

function uniqueIdentity(prefix: string): { username: string; email: string } {
  const salt = `${Date.now()}${Math.floor(Math.random() * 10_000)}`;
  const safePrefix = prefix.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return {
    username: `${safePrefix}${salt}`,
    email: `${safePrefix}.${salt}@test.local`,
  };
}

async function registerUser(prefix: string): Promise<RegisterData> {
  const identity = uniqueIdentity(prefix);
  const response = await api
    .post('/api/v1/auth/register')
    .set(rateLimitBypassHeader)
    .send({
      username: identity.username,
      email: identity.email,
      password: defaultPassword,
    })
    .expect(201);

  const body = response.body as ApiSuccess<RegisterData>;
  expect(body.success).toBe(true);
  return body.data;
}

describe('Legacy compatibility routes', () => {
  beforeAll(async () => {
    await api.get('/api/health').set(rateLimitBypassHeader).expect(200);
  });

  it('returns 422 for self chat creation', async () => {
    const me = await registerUser('legacy-self');

    await api
      .post('/api/v1/chat/chats/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${me.tokens.accessToken}`)
      .send({ user_id: me.user.id })
      .expect(422);
  });

  it('supports chat/live/video/comment compatibility flow', async () => {
    const sender = await registerUser('legacy-a');
    const receiver = await registerUser('legacy-b');

    const chatResponse = await api
      .post('/api/v1/chat/chats/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ user_id: receiver.user.id })
      .expect(201);

    const chatId = (chatResponse.body as { id: string }).id;
    expect(chatId).toBeTruthy();

    const messageResponse = await api
      .post(`/api/v1/chat/chats/${chatId}/send/`)
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ content: 'compat message', message_type: 'text' })
      .expect(201);

    const messageId = (messageResponse.body as { id: string }).id;
    expect(messageId).toBeTruthy();

    const reactionResponse = await api
      .post(`/api/v1/chat/messages/${messageId}/reactions/`)
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ emoji: '🔥' })
      .expect(200);

    const reactions = (reactionResponse.body as { reactions: unknown[] }).reactions;
    expect(Array.isArray(reactions)).toBe(true);
    expect(reactions.length).toBeGreaterThan(0);

    const groupResponse = await api
      .post('/api/v1/chat/groups/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ name: 'Compat Group', description: 'legacy', group_type: 'group' })
      .expect(201);

    const groupId = (groupResponse.body as { id: string }).id;
    expect(groupId).toBeTruthy();

    await api
      .post(`/api/v1/chat/groups/${groupId}/send/`)
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ content: 'group message', message_type: 'text' })
      .expect(201);

    const liveResponse = await api
      .post('/api/v1/live/sessions/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ title: 'Compat Live', description: 'legacy live', status: 'scheduled' })
      .expect(201);

    const liveId = (liveResponse.body as { id: string }).id;
    expect(liveId).toBeTruthy();

    await api
      .post(`/api/v1/live/sessions/${liveId}/join/`)
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({})
      .expect(200);

    const videosResponse = await api
      .get('/api/v1/video/videos/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .expect(200);

    expect(Array.isArray(videosResponse.body)).toBe(true);

    const commentResponse = await api
      .post('/api/v1/comment/')
      .set(rateLimitBypassHeader)
      .set('Authorization', `Bearer ${sender.tokens.accessToken}`)
      .send({ text: 'compat comment' })
      .expect(201);

    const commentId = (commentResponse.body as { id: string }).id;
    expect(commentId).toBeTruthy();
  });
});
