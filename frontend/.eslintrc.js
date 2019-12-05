module.exports = {
    parser: "babel-eslint",
    "env": {
        "es6": true,
        "node": true,
        "jest": true,
        "browser": true
    },
    "extends": ["eslint:recommended", 'plugin:react/recommended'],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-unused-vars": 0,
        "react/prop-types": 0,
        "react/no-unknown-property": 0,
        "react/no-unescaped-entities": 0,
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};