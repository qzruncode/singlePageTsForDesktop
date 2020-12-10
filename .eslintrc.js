module.exports = {
    "env": { // 不同的环境内置了一些全局变量
        "browser": true, // dom相关的变量
        "es2021": true, // es12相关的变量
    },
    "parser": '@typescript-eslint/parser',
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": 'module',
    },
    "extends": [ 'plugin:@typescript-eslint/recommended' ],
    "ignorePatterns": ["node_modules", "config", "public", "dist", "env", "static", ".eslintrc.js"], // 忽略目录
    "rules": {
        "consistent-return": 2,
        "indent": [1, 4],
        "no-else-return": 1,
        "semi": [1, "always"],
        "space-unary-ops": 2
    },
    "globals": {
        "process": "readonly",
    },
    "noInlineConfig": true, // 禁止在js文件中使用注释来配置eslint规则
};