// 随机字符串生成
/*
实现一个随机符串生成函数 randomStr()，要求如下：
1. 生成的随机的字符串应该以字母开头，并包含 [a-z][0-9] 这些字符。
2. 生成的字符串长度为 8。
3. 生成的字符串不能够在程序运行的生命周期中存在重复的情形。
*/
const randomStr = (() => {
  let used = new Set()
  let result;
  let map='abcdefghijklmnopqrstuvwxyz0123456789'
  function Random() {
    result = map[Math.floor(Math.random()*26)]
    for (let i = 0; i < 7; i++) {
      let random = map[Math.floor(Math.random() * 36)]
      result += random
    }
    if (used.has(result)) {
      return Random()
    }
    used.add(result)
    return result
  }
  return Random
})()
console.log(randomStr())