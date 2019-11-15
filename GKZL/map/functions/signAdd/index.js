// 新增签到的接口 不允许重复签到

// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  let date = new Date();
  let YMD = [date.getFullYear(), date.getMonth(), date.getDate()];
  console.log(wxContext.OPENID);
  try {
    //查询数据库中是否已经存在当前数据
    let data = await db.collection('signDate').where({
      openid: wxContext.OPENID,
      signYMD: YMD
    }).get();
    if (data.data != null && data.data != undefined && data.data != "" && data.data.length > 0) { //没有存在就创建新数据，已存在就返回false
      return false
    } else {
      return await db.collection('signDate').add({
        data: {
          openid: wxContext.OPENID, //当前用户的openid

          signYMD: YMD, //当天日期的标识 数组例如 [2019,1,1]
          signDate: date, //签到时的时间对象
          signType: 1 //0未签到 1已签到 2补签
        }
      })
    }
  } catch (e) {
    console.log(e)
  }

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}