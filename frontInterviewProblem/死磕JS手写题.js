/*
 * @Author: your name
 * @Date: 2021-04-02 11:28:06
 * @LastEditTime: 2021-10-21 14:40:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learningNotes\frontInterviewProblem\死磕JS手写题.js
 */
/**
 * 数据类型判断
 */
function myTypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
console.log(myTypeof('1'))
/**
 * 数组、二分查找
 */
let searchInsert = function(nums, target) {
  if (nums[parseInt(nums.length/2)] >= target) {
    for (let index = 0; index < parseInt(nums.length/2)+1; index++) {
      if (target === nums[index]) {
        return index
      } else if (target > nums[index]) {
        return index
      }
    }
  } else {
    for (let index = parseInt(nums.length/2); index < nums.length; index++) {
      if (target === nums[index]) {
        return index
      } else if (target > nums[index]) {
        return index
      }
    }
  }
}
/**
 * 深拷贝：对对象内部进行深拷贝，支持 Array、Date、RegExp、DOM
 */
const deepCopy = (sourceObj) => {
  // 如果不是对象则退出（可停止递归）
  if(typeof sourceObj !== 'object') return;
  // 深拷贝初始值：对象/数组
  let newObj = (sourceObj instanceof Array) ? [] : {};
  // 使用 for-in 循环对象属性（包括原型链上的属性）
  for (let key in sourceObj) { 
    // 只访问对象自身属性
    if (sourceObj.hasOwnProperty(key)) {
      // 当前属性还未存在于新对象中时
      if(!(key in newObj)){
        if (sourceObj[key] instanceof Date) {
          // 判断日期类型
          newObj[key] = new Date(sourceObj[key].getTime());
        } else if (sourceObj[key] instanceof RegExp) {
          // 判断正则类型
          newObj[key] = new RegExp(sourceObj[key]);
        } else if ((typeof sourceObj[key] === 'object') && sourceObj[key].nodeType === 1 ) {
          // 判断 DOM 元素节点
          let domEle = document.getElementsByTagName(sourceObj[key].nodeName)[0];
          newObj[key] = domEle.cloneNode(true);
        } else {
          // 当元素属于对象（排除 Date、RegExp、DOM）类型时递归拷贝
          newObj[key] = (typeof sourceObj[key] === 'object') ? deepCopy(sourceObj[key]) : sourceObj[key];
        }
      }
    }
  }
  return newObj;
}
/**
 * 防抖
 */
function debounce(func, wait, immediate) {
  let timeout, result;
  let debounced = function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
          // 如果已经执行过，不再执行
          let callNow = !timeout;
          timeout = setTimeout(function(){
              timeout = null;
          }, wait)
          if (callNow) result = func.apply(context, args)
      }else {
          timeout = setTimeout(function(){
              func.apply(context, args)
          }, wait);
      }
      return result;
  };
  debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
  };
  return debounced;
}
/**
 * 节流
 */
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
  };
  var throttled = function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }
  return throttled;
}
// 用例
throttle(getUserAction, 1000);
throttle(getUserAction, 1000, { leading: false });
throttle(getUserAction, 1000, { trailing: false });