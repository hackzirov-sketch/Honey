/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/server_new/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2020',
          module: 'commonjs',
          esModuleInterop: true,
          skipLibCheck: true,
          strict: true,
          types: ['jest', 'node'],
        },
        diagnostics: false,
      },
    ],
  },
  verbose: true,
};
