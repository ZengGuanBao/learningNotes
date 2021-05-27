// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 获取用户的个人信息
  if (event.type === 'GETUSERINFO') {
    const dbname = 'UserList'
    return await db.collection(dbname).where({
      '_openid': wxContext.OPENID
    }).field({
      nickName: true,
      gender: true,
      language: true,
      city: true,
      province: true,
      country: true,
      avatarUrl: true
    }).get()
  }
  // 保存用户信息
  if (event.type === 'ADDUSERINFO') {
    const dbname = 'UserList'
    return await db.collection(dbname).add({
      // data 字段表示需新增的 JSON 数据
      data: {
        ...event.data,
        _openid: wxContext.OPENID,
        _appid: wxContext.APPID,
        _unionid: wxContext.UNIONID
      }
    }).then( res => { 
       console.log(res)
    })
  }
  // 查询是否为管理员
  if (event.type == 'ADMIN') {
    const dbname = 'AdminStator'
    return await db.collection(dbname).where({
      '_openid': wxContext.OPENID
    }).count()
  }
  // 获取用户的OPENID
  if (event.type === 'GETINFO') {
    return {
      event,
      openid: wxContext.OPENID,
      appid: wxContext.APPID,
      unionid: wxContext.UNIONID,
      env: wxContext.ENV,
    }
  }
}