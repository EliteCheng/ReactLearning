const {override, fixBabelImports, addLessLoader, useEslintRc} = require('customize-cra')
const path = require('path')

const configProcess = () => {
    process.env.PORT = 3166
    process.env.HOST = 'localhost'
    process.env.BROWSER = 'none'
    return webpackConf => webpackConf
}

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A',
            '@heading-color': '#eee',
            '@text-color': '#ccc',
            '@text-color-secondary': '#aaa',
        },
    }),
    useEslintRc(),
    configProcess(),
    (wpc) => {
        // wpc.entry[1] = path.join(__dirname, './src/react-rewrite/yolkjs/test-yolkjs.jsx')
        return wpc
    },
)

