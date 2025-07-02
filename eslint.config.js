import pluginTailwind from 'eslint-plugin-tailwindcss';
import pluginSonarjs from 'eslint-plugin-sonarjs';
import pluginNoDuplicateTailwindClass from './eslint-plugin-no-duplicate-tailwind-class.js';

export default [
  {
    files: ["src/**/*.{ts,html}"],
    plugins: {
      tailwindcss: pluginTailwind,
      sonarjs: pluginSonarjs,
      noDuplicateTailwindClass: pluginNoDuplicateTailwindClass
    },
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
      "sonarjs/no-duplicate-string": "warn",
      "tailwindcss/no-contradicting-classname": "warn",
      "noDuplicateTailwindClass/no-duplicate-tailwind-class": "error"
    }
  }
];
