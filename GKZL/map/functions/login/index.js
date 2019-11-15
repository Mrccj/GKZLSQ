// 云函数入口文件
const cloud = require('wx-server-sdk')//加载sdk依赖
cloud.init() //初始化

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event);
  console.log(context);
  
  // 可执行其他自定义逻辑
  // console.log 的内容可以在云开发云函数调用日志查看

  // 获取 WX Context（微信调用上下文），包括 OPENDID、APPID、及UNIONID（需要满足 UNIONID 获取条件）
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}