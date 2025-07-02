import pluginTailwind from 'eslint-plugin-tailwindcss';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import pluginNoDuplicateTailwindClass from './no-duplicate-tailwind-class-template.js';
import pluginHtml from 'eslint-plugin-html';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
  {
    files: ["src/**/*.ts"],
    plugins: {
      tailwindcss: pluginTailwind,
      sonarjs: pluginSonarjs,
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
      "sonarjs/no-duplicate-string": "warn",
      "tailwindcss/no-contradicting-classname": "warn"
    }
  },
  {
    files: ["src/**/*.html"],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      "no-duplicate-tailwind-class-template": pluginNoDuplicateTailwindClass
    },
    rules: {
      "no-duplicate-tailwind-class-template/no-duplicate-tailwind-class-template": "error"
    }
  }
];
