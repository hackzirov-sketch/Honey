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

interface RegisterResponse {
  success: boolean;
  data: RegisterData;
}

const API_BASE_URL = process.env.HONEY_API_BASE ?? 'http://localhost:5000';
const api = request(API_BASE_URL);
const bypassHeader = { 'x-honey-test-bypass': '1' } as const;

function uniqueIdentity(prefix: string): { username: string; email: string } {
  const salt = `${Date.now()}${Math.floor(Math.random() * 10000)}`;
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
    .set(bypassHeader)
    .send({
      username: identity.username,
      email: identity.email,
      password: 'Password123!',
    })
    .expect(201);

  const body = response.body as RegisterResponse;
  expect(body.success).toBe(true);
  return body.data;
}

describe('Auth email verification and password reset', () => {
  beforeAll(async () => {
    await api.get('/api/health').set(bypassHeader).expect(200);
  });

  it('verifies email token and resets password', async () => {
    const account = await registerUser('recovery');

    const verificationRequest = await api
      .post('/api/v1/auth/verify-email/request')
      .set(bypassHeader)
      .send({ email: account.user.email })
      .expect(200);

    const verificationToken = (verificationRequest.body as { data?: { devVerificationToken?: string } }).data?.devVerificationToken;
    expect(typeof verificationToken).toBe('string');

    await api
      .post('/api/v1/auth/verify-email')
      .set(bypassHeader)
      .send({ token: verificationToken })
      .expect(200);

    const meResponse = await api
      .get('/api/v1/auth/me')
      .set(bypassHeader)
      .set('Authorization', `Bearer ${account.tokens.accessToken}`)
      .expect(200);

    expect((meResponse.body as { data: { isVerified: boolean } }).data.isVerified).toBe(true);

    const forgotResponse = await api
      .post('/api/v1/auth/forgot-password')
      .set(bypassHeader)
      .send({ email: account.user.email })
      .expect(200);

    const resetToken = (forgotResponse.body as { data?: { devResetToken?: string } }).data?.devResetToken;
    expect(typeof resetToken).toBe('string');

    const newPassword = 'Password456!';

    await api
      .post('/api/v1/auth/reset-password')
      .set(bypassHeader)
      .send({ token: resetToken, newPassword })
      .expect(200);

    await api
      .post('/api/v1/auth/login')
      .set(bypassHeader)
      .send({ emailOrUsername: account.user.email, password: 'Password123!' })
      .expect(401);

    await api
      .post('/api/v1/auth/login')
      .set(bypassHeader)
      .send({ emailOrUsername: account.user.email, password: newPassword })
      .expect(200);
  });
});
