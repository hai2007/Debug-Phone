
// 直接使用icrush-style-loader不满足这里
// 因此我们进行了改造

const hash = require('hash-sum');
const path = require('path');
const qs = require('querystring');
const loaderUtils = require('loader-utils');

const loaderApi = () => { };

loaderApi.pitch = function (remainingRequest) {

    const loaderContext = this;

    const {
        rootContext,
        resourcePath,
        resourceQuery
    } = loaderContext;

    let addStylesClientPath = loaderUtils.stringifyRequest(this, '!' + path.join(__dirname, 'addStylesClient.js'));

    const rawQuery = resourceQuery.slice(1);
    const incomingQuery = qs.parse(rawQuery);

    // 判断是不是iCrush内置样式
    let isICrushStyle = incomingQuery.iCrush != null;

    const context = rootContext || process.cwd();

    const rawShortFilePath = path
        .relative(context, resourcePath)
        .replace(/^(\.\.[\/\\])+/, '');
    const id = hash(rawShortFilePath);

    let request = loaderUtils.stringifyRequest(this, '!!' + remainingRequest)

    let shared = [
        '// style-loader: Adds some css to the DOM by adding a <style> tag',
        '',
        '// load the styles',
        'var content = require(' + request + ');',
        "if(typeof content === 'string') content = [[module.id, content, '']];",
        'if(content.locals) module.exports = content.locals;'
    ]

    let code = [
        "// add the styles to the DOM",
        "var add = require(" + addStylesClientPath + ").default",
        "var update = add('data-icrush-" + id + "', content, " + isICrushStyle + ");"
    ];

    return shared.concat(code).join('\n');
};

module.exports = loaderApi;
