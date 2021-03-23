/**
 * Promise的状态一经改变就不能再改变
 * .then和.catch都会返回一个新的Promise
 * catch不管被连接到哪里，都能捕获上层的错误
 * 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)
 * Promise 的 .then 或者 .catch 可以被调用多次, 当如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值
 * .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获
 * .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环
 * .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
 * .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法
 * .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数
 * .all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
 * .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
 */
const first = () => (new Promise((resolve, reject) => {
  console.log(3);
  let p = new Promise((resolve, reject) => {
      console.log(7);
      setTimeout(() => {
          console.log(5);
          resolve(6);
          console.log(p)
      }, 0)
      resolve(1);
  });
  resolve(2);
  p.then((arg) => {
      console.log(arg);
  });

}));

first().then((arg) => {
  console.log(arg);
});
console.log(4);
/**
 * 第一段代码定义的是一个函数，所以我们得看看它是在哪执行的，发现它在4之前，所以可以来看看first函数里面的内容了。(这一步有点类似于题目1.5)
 * 函数first返回的是一个new Promise()，因此先执行里面的同步代码3
 * 接着又遇到了一个new Promise()，直接执行里面的同步代码7
 * 执行完7之后，在p中，遇到了一个定时器，先将它放到下一个宏任务队列里不管它，接着向下走
 * 碰到了resolve(1)，这里就把p的状态改为了resolved，且返回值为1，不过这里也先不执行
 * 跳出p，碰到了resolve(2)，这里的resolve(2)，表示的是把first函数返回的那个Promise的状态改了，也先不管它。
 * 然后碰到了p.then，将它加入本次循环的微任务列表，等待执行
 * 跳出first函数，遇到了first().then()，将它加入本次循环的微任务列表(p.then的后面执行)
 * 然后执行同步代码4
 * 本轮的同步代码全部执行完毕，查找微任务列表，发现p.then和first().then()，依次执行，打印出1和2
 * 本轮任务执行完毕了，发现还有一个定时器没有跑完，接着执行这个定时器里的内容，执行同步代码5
 * 然后又遇到了一个resolve(6)，它是放在p里的，但是p的状态在之前已经发生过改变了，因此这里就不会再改变，也就是说resolve(6)相当于没任何用处，因此打印出来的p为Promise{<resolved>: 1}。(这一步类似于题目3.1)
 */
const async1 = async () => {
  console.log('async1');
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 end')
  return 'async1 success'
} 
console.log('script start');
async1().then(res => console.log(res));
console.log('script end');
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then(res => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)
/**
 * 注意的知识点：
 * async函数中await的new Promise要是没有返回值的话则不执行后面的内容(类似题5.5)
 * .then函数中的参数期待的是函数，如果不是函数的话会发生穿透(类似题3.8 )
 * 注意定时器的延迟时间
 */
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
/**
 * 注意的知识点：
 * Promise的状态一旦改变就无法改变(类似题目3.5)
 * finally不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是没有参数的(类似3.10)
 */

async function asyncl() {
  console.log('asyncl start')
  await async2()
  console.log('asyncl end')
}
async function async2() {
  console.log('async2 start')
  return new Promise((resolve, reject) =>{
    resolve()
    console.log('async2 promise')
  })
}
console.log('script start')
setTimeout(function() {
  console.log('setTimeout')
}, 0)
asyncl()
new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
}).then(function() {
  console.log('promise3')
}).then(function() {
  console.log('promise4')
}).then(function() {
  console.log('promise5')
}).then(function() {
  console.log('promise6')
})
console.log('script end')

/** 
 * 总结：首先先按照顺序执行同步代码，再执行微任务队列（promise），回来看是否存在被await阻断的同步代码及微任务，执行完，再执行宏任务队列(setTimeout)
 */