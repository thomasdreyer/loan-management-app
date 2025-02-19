   // jest.config.js
   export default {
    preset: 'ts-jest',
  testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', 
      '^.+\\.jsx?$': 'babel-jest', // Ensure Babel is used for transformation
    },
  };