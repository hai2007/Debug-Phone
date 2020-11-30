export default function addStylesClient(parentId, list, isICrushStyle) {

    // 添加样式的方法
    var addStyle = function (iframe) {

        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        var styleElement = iframeDocument.createElement('style');
        var head = iframeDocument.head || iframeDocument.getElementsByTagName('head')[0];

        var style = "",
            i;
        for (i = 0; i < list.length; i++) {
            style += "\n/* " + list[i][0] + " */\n";
            style += list[i][1] + "\n\n";
        }

        // 如果是iCrush内置样式，添加data-icrush-hash
        if (isICrushStyle) {

            style = style.replace(/( {0,}){/g, "{");
            style = style.replace(/( {0,}),/g, ",");

            var temp = "";
            var isSpecial = false, isContent = false;
            for (var i = 0; i < style.length; i++) {
                if (style[i] == '{' && !isSpecial) {
                    isContent = true;
                    temp += "[" + parentId + "]";
                } else if (style[i] == '}' && !isSpecial) {
                    isContent = false;
                } else if (style[i] == '/' && style[i + 1] == '*') {
                    isSpecial = true;
                } else if (style[i] == '*' && style[i + 1] == '/') {
                    isSpecial = false;
                } else if (style[i] == ',' && !isSpecial && !isContent) {
                    temp += "[" + parentId + "]";
                }

                temp += style[i];

            }

            style = temp;

        }

        styleElement.innerHTML = style;
        styleElement.type = 'text/css';
        head.appendChild(styleElement);
    };

    // 由于开始的时候结点可能没有挂载好，定时尝试
    (function doit() {
        var iframe = document.getElementById('@hai2007/debug-phone/iframe');
        if (!iframe) {
            setTimeout(doit, 100);
        } else {
            addStyle(iframe);
        }
    })();

};
