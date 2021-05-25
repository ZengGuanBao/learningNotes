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