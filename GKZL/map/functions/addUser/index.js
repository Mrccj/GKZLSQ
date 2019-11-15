// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 实例化数据库对象
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let now = new Date();
  try {
    return await db.collection('user').add({
      data: {
        // 系统提供
        openid: wxContext.OPENID, //用户唯一凭证

        // 用户资料
        userInfo: event.userInfo,

        // 需要的数据
        creDate: now, //生成日期 存储的时间对象
        latitude: 0.0, //纬度
        longitude: 0.0, //经度
        lastLoginDate: now
      }
    })
  } catch (e) {
    console.log(e);
  }
}