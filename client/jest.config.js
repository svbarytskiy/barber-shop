module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',  // Додайте це, якщо S Babel
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)',
  ],
};
