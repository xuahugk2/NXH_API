module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'plugins': ['react-refresh'],
    'rules': {
        'react-refresh/only-export-components': 'warn',
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'indent': ['error', 4],
        'comma-dangle': [2, 'always-multiline'],
        'eol-last': [2, 'windows'],
        'semi': [2, 'always'],
    },
};
