module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
