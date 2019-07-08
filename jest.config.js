module.exports = {
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/spec/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
