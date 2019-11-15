//根据id修改签到状态

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

//云数据库链接实例对象
const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  // const wxContext = cloud.getWXContext()
  // let openid = wxContext.OPENID
  try {
    return await db.collection('signDate').doc(event.sid).update({ //
      data: {
        signType: event.signType //0未签到，1已签到 ，2补签
      }
    })
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