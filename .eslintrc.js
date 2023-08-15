module.exports = {
  root: true,

  env: {
    node: true,
  },

  globals: {
    window: "readonly",
    document: "readonly",
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
  ],

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "@babel/eslint-parser",
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeature: {
      jsx: true,
    },
  },

  plugins: ["prettier"],

  rules: {
    "space-before-function-paren": [
      2,
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],

    "no-unused-vars": 1,
    "vue/no-deprecated-v-bind-sync": 0,
    "vue/no-deprecated-slot-scope-attribute": 0,
    "vue/require-default-prop": 0,
    "vue/no-v-html": 0,
    "no-debugger": 1,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
