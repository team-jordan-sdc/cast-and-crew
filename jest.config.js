module.exports = {
  projects: [
    {
      displayName: 'dom',
      testEnvironment: 'jsdom',
      testMatch: ['**/spec/**/*.test.dom.js?(x)'],
      setupFiles: ['<rootDir>/spec/setupTests.js'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    },
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [
        '**/spec/**/*.test.js?(x)',
      ],
    },
  ],
};
