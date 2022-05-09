module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverageFrom: ["<rootDir>/**/*.vue", "<rootDir>/src/App.vue"],
  coverageProvider: "v8",
};
