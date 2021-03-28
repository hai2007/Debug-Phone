
// 拦截网络请求服务(Xml Http Request)

export default function (target) {

    /**
     * 基于手机端没有IE内核的，
     * 对于new ActiveXObject('Microsoft.XMLHTTP')这种的xhr不考虑
     * 我们考虑的对象是：new XMLHttpRequest()
     */

    if (window.XMLHttpRequest) {

        // 原生的请求方法
        const { open, send } = window.XMLHttpRequest.prototype;

        window.XMLHttpRequest.prototype.open = function () {

            this.__hai2007__debug__phone__id__ = "hai2007-debug-phone-network^" + arguments[0] + "@" + arguments[1] + ":" + new Date().valueOf() + "[" + (Math.random()) + "]";

            // 响应
            let { ontimeout, onerror, onloadend } = this;


            this.onloadend = function () {
                if (onloadend) { onloadend.apply(this, arguments); }

                if (this.readyState == 4) {

                    let response = "";

                    try {
                        response = JSON.parse(this.response);
                    } catch (e) {
                        response = this.response;
                    }

                    let responseText = "";
                    try {
                        if (this.responseType == "" || this.responseType == 'text') {
                            responseText = this.responseText;
                        } else {
                            responseText = '(Debug Phone)未识别的响应类型：' + this.responseType;
                        }
                    } catch (e) {
                        responseText = "(Debug Phone)捕获异常：" + e;
                    }

                    target.trigger('network@xhr', {
                        method: "end",
                        responseHeaders: this.getAllResponseHeaders(),
                        responseMessage: {
                            URL: this.responseURL,
                            status: this.status,
                            statusText: this.statusText,
                            response,
                            responseText
                        },
                        // 表示正常结束
                        type: 'network-ok',
                        id: this.__hai2007__debug__phone__id__
                    });
                }
            };

            this.ontimeout = function () {
                if (ontimeout) { ontimeout.apply(this, arguments); }

                target.trigger('network@xhr', {
                    method: "end",
                    responseHeaders: this.getAllResponseHeaders(),
                    responseMessage: {},
                    // 表示请求超时
                    type: 'timeout',
                    id: this.__hai2007__debug__phone__id__
                });
            };

            this.onerror = function () {
                if (onerror) { onerror.apply(this, arguments); }
                target.trigger('network@xhr', {
                    method: "end",
                    responseHeaders: this.getAllResponseHeaders(),
                    responseMessage: {},
                    // 表示发生错误
                    type: 'error',
                    id: this.__hai2007__debug__phone__id__
                });
            };

            // 拦截请求
            open.apply(this, arguments);
            target.trigger('network@xhr', {
                method: "open",
                responseHeaders: this.getAllResponseHeaders(),
                content: {
                    method: arguments[0],
                    url: arguments[1]
                },
                id: this.__hai2007__debug__phone__id__
            });
        };

        // 拦截发送
        window.XMLHttpRequest.prototype.send = function () {

            try {
                send.apply(this, arguments);
            } catch (e) {
                target.trigger('network@xhr', {
                    method: "end",
                    responseHeaders: this.getAllResponseHeaders(),
                    responseMessage: e,
                    type: "send-error",
                    id: this.__hai2007__debug__phone__id__
                });
                throw e;
            }

            target.trigger('network@xhr', {
                method: "send",
                responseHeaders: this.getAllResponseHeaders(),
                params: arguments[0],
                id: this.__hai2007__debug__phone__id__
            });
        };

    } else {

        // 如果不支持说明浏览器是IE内核的
        // todo

        console.error('>>> xhr拦截失败，当前版本的浏览器不支持，你可以：告知我们！');

    }

};
