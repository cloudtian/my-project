/**
 * 节流函数-频率控制 用于将高频率连续调用某函数控制为低频率
 * 抄 underscore.js 的，具体用法请看 _.throttle
 */
var throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options = options || {};
    var later = function() {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = func.apply(context, args);
    };
    return function() {
        var now = new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};


/**
 * 防抖函数-空闲控制 当高频率连续调用某函数停下来时，才会真正地去执行它
 * 抄 underscore.js 的，具体用法请看 _.debounce
 */
var debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function() {
            var last = (new Date()) - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
        }
        return result;
    };
};

export default {
    throttle,
    debounce
};