/**
 * 数据类型判断
 */
function myTypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
console.log(myTypeof('1'))
/**
 * 数据类型判断
 */
