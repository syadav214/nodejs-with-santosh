module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '/__tests__/.*(test|spec)\\.(jsx?|tsx?)$',
  modulePathIgnorePatterns: ['dist'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40
    }
  },
  collectCoverageFrom: ['**/*.ts', '!src/server.ts']
};
