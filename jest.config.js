const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8", // Use "v8" for better performance with TypeScript

  // The preset configures Jest to use ts-jest for TypeScript files
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Tells ts-jest that your project is using TypeScript with CommonJS modules
  globals: {
    "ts-jest": {
      tsconfig: {
        module: "CommonJS",
      },
    },
  },

  // Transform setting is probably not needed if you are using the preset, but here for custom transformations
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Specify the root directory if your test files are located in a specific folder
  roots: ["./tests"],

  // Optionally, if you have a specific setup file to configure your testing environment, you can specify it here
  // setupFilesAfterEnv: ['./jest.setup.js'], // Uncomment and create jest.setup.js if needed

  // If you're using absolute imports or path aliases in TypeScript, you might need to replicate them here for Jest
  // moduleNameMapper: {
  //   '^@myAlias/(.*)$': '<rootDir>/path/to/alias/$1',
  // },

  // If using MongoDB or other services, you might want to ignore their path to avoid transformation errors
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

module.exports = config;
