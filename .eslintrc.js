module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        project: ['./tsconfig.json', './.eslintrc.js']
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    rules: {
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'react/require-default-props': [
            0,
            {
                forbidDefaultForRequired: false,
                ignoreFunctionalComponents: false
            }
        ],
        'react-native/no-inline-styles': 0
    }
};
