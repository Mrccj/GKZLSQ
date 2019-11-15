//根据openid 获取当前用户所有的签到情况

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    let skip = event.skip != undefined ? event.skip : 0;
    let limit = event.limit != undefined ? event.limit : 7;
    return await db.collection('signDate').where({
        openid: wxContext.OPENID,
        // openid: event.openid,
      }).skip(skip) // 跳过结果集中的前 10 条，从第 11 条开始返回 //开始的位置
      .limit(limit) // 限制返回数量为 10 条 //每次多少条
      .get()
  } catch (e) {
    console.log(e);
  }


  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}