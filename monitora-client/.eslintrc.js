module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-unused-vars': ['error'],
        'no-console': 2,
        'react/no-deprecated': 1,
        'react/no-unknown-property': 1,
        'react/no-string-refs': 1
    },
    globals: {
        describe: true,
        it: true,
        test: true,
        beforeEach: true,
        expect: true
    }
};
