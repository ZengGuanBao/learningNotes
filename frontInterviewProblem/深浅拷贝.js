// 技巧类拷贝方法
// 数组浅拷贝：concat()、slice()
// 深拷贝：JSON.stringify()

var shallowCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
      }
  }
  return newObj;
}

var deepCopy = function(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
  }
  return newObj;
}
