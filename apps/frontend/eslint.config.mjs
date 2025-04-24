import baseConfig from '../../eslint.config.mjs';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      react: fixupPluginRules(react),
      'react-hooks': fixupPluginRules(reactHooks),
    },
    rules: {},
  },
];
