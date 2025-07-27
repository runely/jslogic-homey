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
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_$" }],
        "@typescript-eslint/semi": ["error", "always"],
        "prefer-const": ["error", { "destructuring": "all" }],
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
