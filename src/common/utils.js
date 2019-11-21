const utils = {
  // 防抖函数
  debounce(fn, delay) {
  var timer = null
  return function () {
    let context = this, args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
      }, delay)
    }
  },
  // 节流函数
  throttle(func, wait = 2000, type = 1) {
    let previous = 0;
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (type === 1) {
        let now = Date.now();
        if (now - previous > wait) {
          func.apply(context, args);
          previous = now;
        }
      } else if (type === 2) {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args)
          }, wait)
        }
      }
    }
  }
}

export default utils
