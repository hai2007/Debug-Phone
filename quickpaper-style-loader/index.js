// quickpaper-style-loader

const hash = require('hash-sum');
const path = require('path');
const qs = require('querystring');
const loaderUtils = require('loader-utils');

const loaderApi = () => { };

/**
 *
 * loader:[loader3,loader2,loader1]
 *
 * 执行顺序：
 *
 * picth3 -> pitch2 -> pitch1
 *
 * -> loader1 -> loader2 -> loader3
 *
 * 特别注意：如果pitch有return，会提前返回执行
 *
 */

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

  // 判断是不是QuickPaper内置样式
  let isQuickPaperStyle = incomingQuery.QuickPaper != null;

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
    // content list format is [id, css, media, sourceMap]
    "if(typeof content === 'string') content = [[module.id, content, '']];",
    'if(content.locals) module.exports = content.locals;'
  ]

  let code = [
    "// add the styles to the DOM",
    "var add = require(" + addStylesClientPath + ").default",
    "var update = add('data-quickpaper-" + id + "', content, " + isQuickPaperStyle + ");"
  ];

  return shared.concat(code).join('\n');
};

module.exports = loaderApi;
