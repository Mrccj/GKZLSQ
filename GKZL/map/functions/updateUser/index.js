// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 申明云数据库连接实例对象
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID;
  try {
    return await db.collection('user').where({
      openid: openid,
    }).update({
      data: {
        userInfo: event.userInfo,
        lastLoginDate: new Date(),
      }
    })
  } catch (e) {
    console.log(e)
  }
}