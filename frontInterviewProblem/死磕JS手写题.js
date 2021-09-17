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
