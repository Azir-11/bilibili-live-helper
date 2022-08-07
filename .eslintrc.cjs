module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "vue-global-api",
    "plugin:vue/vue3-strongly-recommended",
    "standard",
    "./eslintrc-auto-import.json",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint", "import"],
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    "comma-dangle": [2, "never"],
    "eol-last": [2, "never"],
    "no-tabs": 0,
    camelcase: "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-text-v-html-on-component": "off",
    "import/no-unresolved": "off", // 检查解析路径存在
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/newline-after-import": 2,
    "import/order": 2
  },
  overrides: [
    {
      files: ["auto-import.d.ts", "components.d.ts"],
      rules: {
        "no-unused-vars": "off"
      }
    }
  ]
};