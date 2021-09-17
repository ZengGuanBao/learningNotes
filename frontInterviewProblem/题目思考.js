/*
 * @Author: your name
 * @Date: 2021-06-29 09:16:22
 * @LastEditTime: 2021-06-30 10:18:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \learningNotes\frontInterviewProblem\题目思考.js
 */
function delayToEcho(msg, cb) {
  setTimeout(() => {
    // new Promise((resolve, reject) => {
      const err = Date.now() % 2 === 0 ? null : new Error()
      // reject(err)
      cb(err, msg)
    // })
  }, 3000);
}
// 正常调用
delayToEcho('msg', (err, msg) => {})
let n = 0
function promisify(func) {
  console.log('开始执行')
  let currying = function () {
      console.log(arguments)
      let _args = Array.prototype.slice.call(arguments)
      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      console.log('_args的长度：' + _args.length)
      console.log(_args)
      if (_args.length < func.length) {
        console.log('第' + (n+1) + '次执行')
        return new Promise((resolve, reject) =>{
          currying.call(this, func, _args)
          resolve(_args)
        })
      } else {
        console.log('最后执行')
        return new Promise((resolve, reject) =>{
          func.call(this, _args)
          resolve(_args)
        })
      }
  }
  return currying
}
// 请实现以上函数，能让以下代码成功运行
promisify(delayToEcho)('msg').then((msg) => {
  console.log('then输出：' + msg)
}).catch((err) => {
  console.log('catch输出：' + err)
});