/**
 * 开启该配置，如果使用了第三方库customize-cra，
 * 那么需要在config-overrides.js中添加module.exports=override(useEslintRc())配置
 * 这样就支持所有的Eslint的配置了，比如在package.json中配置
 * esLintConfig：{
 *
 * }
 */
module.exports = {
    "extends": "react-app",
    "rules": {
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/anchor-is-valid": "off",
        // "eqeqeq": "off",
        // "no-useless-escape": "off",
        // "default-case": "off",
        // "no-unused-vars": "off",
        // "no-useless-constructor": "off",
        // "react/no-direct-mutation-state": "off",
        // "no-loop-func": "off",
    }
}