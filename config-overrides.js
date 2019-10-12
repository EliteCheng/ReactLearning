const {override, fixBabelImports, addLessLoader, useEslintRc} = require('customize-cra');

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

    useEslintRc()
);

