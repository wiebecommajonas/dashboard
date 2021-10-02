module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    project: "./server/tsconfig.json"
  },

  plugins: [
    '@typescript-eslint'
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "max-classes-per-file": "off"
  },

  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ]
};
