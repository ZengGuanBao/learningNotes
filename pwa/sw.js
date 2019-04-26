const CACHE_NAME = 'cache_v' + 4 //默认情况 sw文件变换后会重新注册serviceWorker

const CACHE_LIST = [
  '/',
  '/index.html',
  '/index.css',
  '/main.js',
  '/api/img'
]

self.addEventListener('fetch',(e)=>{
  console.log(e.request.url)
})
//缓存 需要缓存内容
function preCache() {
  //开启了一个缓存空间
  return caches.open(CACHE_NAME).then(cache=>{
    //添加列表到缓存中
    return cache.addAll(CACHE_LIST)
  })
}
self.addEventListener('install',(e)=>{
  //如果上一个serviceWorker不销毁 需要手动skipWating()
  e.waitUntil(
    preCache().then(skipWaiting)
  )//等待promise执行完成
})

//激活当前serviceWorker,让serviceWorker立即生效 self.clients.claim()
function clearCache(params) {
  return caches.keys().then(keys=>{
    return Promise.all(keys.map(key=>{
      if (key !== CACHE_NAME) {
        return caches.delete(key)
      }
    }))
  })
}
//当前安装完毕后
self.addEventListener('activate',(e)=>{
  e.waitUntil(
    Promise.all([
      clearCache(),
      self.clients.claim()
    ])
  )

})

//添加主屏幕 两次访问 间隔5分钟 会弹出横条
//手动点是没问题的