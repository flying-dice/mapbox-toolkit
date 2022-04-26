module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
    "!<rootDir>/src/**/index.{js,jsx,ts,tsx}",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  reporters: ["default"],
};
