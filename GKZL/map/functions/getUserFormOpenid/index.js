// 云函数入口文件
const cloud = require('wx-server-sdk') //引入需要的依赖
cloud.init(); //实例化云函数，初始化

const db = cloud.database(); //链接云数据库的实例
// 云函数入口函数
exports.main = async(event, context) => { //中间构建云函数内容
  const wxContext = cloud.getWXContext();
  //方法体
  try {
    let data = await db.collection('user').where({
      openid: wxContext.OPENID
    }).get();
    if (data.data != null && data.data != undefined && data.data != "" && data.data.length > 0) {
      return data.data;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}