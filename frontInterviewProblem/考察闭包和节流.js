//评测题目: 3-日志上报
/*
现在有一个基于 http 的前端日志采集系统，为了优化性能，我们需要把较密集的单次上报日志的行为，
改成合并掉 100ms 时间窗口内的单次上报为批量上报。
假设现有的单次上报的函数如下，请改写此函数的实现，不能使用任何库：
假设现有的单次上报的函数如下，请改写此函数的实现，不能使用任何库：
const uploadLog = (logStr) => {
  fetch('https://log.xxx.com', {
    method: 'POST',
    body: JSON.stringify([logStr])
  });
}
注意：
1.没有日志上报调用时，不发生 http 请求。
2.无论日志上报调用有多频繁，http 请求间隔"不小于" 100ms
*/
// uploadLog('123');uploadLog('456');

//考察闭包 + 节流
const uploadLog=(logStr)=>{
  let timer=null;
  let queue=[]
  return()=>{
    queue.push(logStr)
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      console.log(queue);
      queue.length=0;
      timer = null;
    }, 100);
  }
}
setInterval(uploadLog([111]),10)