import iCrush from 'icrush';

// 引入启动界面
import App from './App.iCrush';

// 引入公共样式
import '@hai2007/style/normalize.css';
import './styles/common.css';

// 引入指令
import './directives/ui-hidden';
import './directives/ui-show';

// 引入全局通知机制
import event from './plug/@event.js'; iCrush.use(event);

// 追加iframe到页面上去
// 后期整个调试工具的内容都是在这里面进行，隔绝外部环境，避免对工作代码有不好的影响
let iframe = document.createElement("iframe");
iframe.setAttribute('id', '@hai2007/debug-phone/iframe');
iframe.style.cssText = `
        display: block;
        position: fixed;
        top: 0px;
        right: 0px;
        z-index: 9999;
        margin: 0px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 0px;
    `;
document.documentElement.appendChild(iframe);

let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

// ifrmae中写入html模板
iframeDocument.open();
iframeDocument.write("<div id='root'></div>");
iframeDocument.close();

iCrush.prototype.$document = iframeDocument;

new iCrush({

    //挂载点
    el: iframeDocument.getElementById('root'),

    // 启动iCrush
    render: createElement => createElement(App)

});

console.info(
    '\u001B[92m👉  Thank you for using (\u001B[94m https://github.com/hai2007/Debug-Phone \u001B[92m) as the tool of debugger! \u001B[0m\n'
);
