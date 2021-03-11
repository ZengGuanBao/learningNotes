// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
  traceUser: true
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type == 'initHomeBarner') {
    const dbname = 'HomeBarner'
    return await db.collection(dbname)
      .field({
        type: true,
        url: true,
      })
      .limit(4)
      .get()
  }
  if (event.type == 'addHomeBarner') {
    const dbname = 'HomeBarner'
    const data = event.data
    db.collection(dbname).add({
      data: data
    })
  }
  if (event.type == 'initRecomServer') {
    const dbname = 'RecomServer'
    return await db.collection(dbname)
      .field({
        id: true,
        type: true,
        url: true,
      })
      .orderBy('id', 'asc')
      .limit(4)
      .get()
  }
}