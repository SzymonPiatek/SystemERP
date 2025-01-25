module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/models/**/tests/*.test.ts', '**/src/**/tests/*.test.ts'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
