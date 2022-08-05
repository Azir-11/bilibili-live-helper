module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "vue-global-api",
    "plugin:vue/vue3-strongly-recommended",
    "standard",
    "./eslintrc-auto-import.json",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    "comma-dangle": [2, "never"],
    "eol-last": [2, "never"],
    "no-tabs": 0,
    camelcase: "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-text-v-html-on-component": "off",
  },
  overrides: [
    {
      files: ["auto-import.d.ts", "components.d.ts"],
      rules: {
        "no-unused-vars": "off",
      },
    },
  ],
};
