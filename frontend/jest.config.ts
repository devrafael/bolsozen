module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageReporters: [ 'html' ],
  coverageDirectory:  'coverage/angular-jest',
};
