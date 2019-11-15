// 云函数入口文件
const cloud = require('wx-server-sdk')//加载sdk依赖
cloud.init() //初始化

// 获取用的的openid
exports.main = async(event,context) => {
  return event.userInfo;
}

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }