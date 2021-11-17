// Note: This file is not normally picked up via CRA React Scripts.
// However, npm test no longer calls react-scrpts test, rather it calls jest directly
// so now this file is picked up, but it bypasss CRA.
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    // `node_modules/d3-axis`,
  ],
  snapshotSerializers: [
    '@emotion/jest/serializer' /* if needed other snapshotSerializers should go here */,
  ],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
  },
};
