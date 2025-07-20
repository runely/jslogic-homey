module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'jest'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended'
    ],
    rules: {
        // eventuelle overstyringer her
    },
    env: {
        jest: true,
        node: true,
    },
    overrides: [
        {
            files: ['**/*.ts'],
            // spesifikke regler for TS-filer kan legges her
        }
    ],
};
