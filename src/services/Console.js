
// 拦截日志服务

let console = window.console;

// 原生的打印方法 + 当前执行的代码在堆栈中的调用路径
const { log, info, debug, warn, error, trace } = console;

import { bindEvent } from './event.js';

export default function (target) {
    console.log = function () {
        log.apply(this, arguments);
        target.trigger('console', {
            type: "log",
            content: arguments
        });
    };
    console.info = function () {
        info.apply(this, arguments);
        target.trigger('console', {
            type: "info",
            content: arguments
        });
    };
    console.debug = function () {
        debug.apply(this, arguments);
        target.trigger('console', {
            type: "debug",
            content: arguments
        });
    };
    console.warn = function () {
        warn.apply(this, arguments);
        target.trigger('console', {
            type: "warn",
            content: arguments
        });
    };
    console.error = function () {
        error.apply(this, arguments);
        target.trigger('console', {
            type: "error",
            content: arguments
        });
    };
    console.trace = function () {
        trace.apply(this, arguments);
        target.trigger('console', {
            type: "trace",
            content: arguments
        });
    };

    // 还有一个throw new error的捕获
    bindEvent(window, 'error', function (content) {
        content = content.message + " " + content.filename + " " + content.lineno + " \nstack :\n" + (content.error ? content.error.stack : "");
        target.trigger('console', {
            type: "error",
            content: [content]
        });
    });

    // 监听Promise相关错误
    window.addEventListener('unhandledrejection', event => {
        let content = event.reason.stack;
        target.trigger('console', {
            type: "error",
            content: [content]
        });
    });

};
