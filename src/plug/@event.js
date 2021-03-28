
window._hai2007_debug_phone_eventarray_ = {};

/**
 * 使用方式:
 * this.on(eventType, callback);    注册事件
 * this.trigger(eventType, data);   触发事件
 *
 * 全局通信工具
 *
 */

export default {
    install(QuickPaper) {

        QuickPaper.prototype.on = (eventType, callback) => {
            window._hai2007_debug_phone_eventarray_[eventType] = window._hai2007_debug_phone_eventarray_[eventType] || [];
            window._hai2007_debug_phone_eventarray_[eventType].push(callback);
        };

        QuickPaper.prototype.trigger = (eventType, data) => {

            window._hai2007_debug_phone_eventarray_[eventType] = window._hai2007_debug_phone_eventarray_[eventType] || [];

            for (let index = 0; index < window._hai2007_debug_phone_eventarray_[eventType].length; index++) {
                window._hai2007_debug_phone_eventarray_[eventType][index](data);
            }

        };

    }
};
