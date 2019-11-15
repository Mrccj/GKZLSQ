// pages/cloud/index.js
//初始化数据库
const getTable = wx.cloud.database(); //初始化数据库
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginType: wx.getStorageSync('loginType'),
    username: '',
    avatarUrl: '',
  },
  //跳转到签到页面
  go_Exchange_area: function(e) {
    wx.cloud.callFunction({ //调用签到的云函数
      name: 'signAdd'
    }).then(res => {
      console.log(res);
      if (res.result != false) {
        wx.showModal({
          title: '提醒',
          content: '签到成功',
          cancelText: '不去哦~',
          confirmText: '兑换区->', //确定按钮的文字 4个字
          success(res) {
            wx.navigateTo({
              url: '../Exchange_area/Exchange_area?index=' + e.currentTarget.dataset.id,
            })
          }
        })
      } else {
        wx.showModal({
          title: '提醒',
          content: '已经签到，不需要重新签到哦',
          cancelText: '不去哦~',
          confirmText: '兑换区->', //确定按钮的文字 4个字
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../Exchange_area/Exchange_area?index=' + e.currentTarget.dataset.id,
              })
            }
          }
        })
      }
    }).catch(err => {
      console.log(err);
    });
    // console.log(e.currentTarget.dataset.id);
  },
  //跳转到兑换记录
  go_Exchange_records: function() {
    wx.navigateTo({
      url: '../Exchange_records/Exchange_records',
    })
  },
  //跳转到签到记录
  go_Attendance_record: function() {
    wx.navigateTo({
      url: '../Attendance_record/Attendance_record',
    })
  },
  //获取当前手机的情况信息
  go_day: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res)
        console.log(res.model)
        var html = res.model + "";
        console.log(html.search("iPhone") != -1)
        that.setData({
          flag: html.search("iPhone") == -1
        })
      },
    })
  },
  //弹窗
  show_tc: function() {
    wx.showToast({
      title: '小程序暂不支持苹果用户',
      icon: 'none',
      duration: 2000
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    if (wx.getStorageSync('loginType')) { //判断是否授权登陆
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.setData({
            username: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          })
          wx.hideLoading();
        }
      })
    } else {
      this.setData({
        username: "请现授权",
        avatarUrl: ""
      })
      wx.hideLoading();
    }
    var that = this;
    that.go_day();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //调用登录以后处理的函数
  getUserInfo: function(e) {
    let detail = e.detail;
    if (detail.userInfo != undefined) {
      wx.showLoading({ //加载提示
        title: '加载中',
      })
      wx.cloud.callFunction({ //根据openid获取当前用户数据库中的信息判断是否为空
        name: 'getUserFormOpenid'
      }).then(res => {
        if (res == false) {
          wx.cloud.callFunction({ //调用新增用户的云函数
            name: 'addUser',
            data: {
              userInfo: detail.userInfo,
            }
          }).then(res => {
            wx.setStorage({ //成功后更改storage的值
              key: 'loginType',
              data: true,
            })
            this.setData({
              loginType: true,
              username: detail.userInfo.nickName,
              avatarUrl: detail.userInfo.avatarUrl
            })
            wx.hideLoading(); //关闭加载提示
          }).catch(err => {
            console.log(err);
          })
        } else { //如果数据库中已存在则更新当前用户信息
          wx.cloud.callFunction({
            name: 'updateUser',
            data: {
              userInfo: detail.userInfo,
            }
          }).then(res => {
            wx.setStorage({ //成功后更改storage的值
              key: 'loginType',
              data: true,
            })
            this.setData({
              loginType: true,
              username: detail.userInfo.nickName,
              avatarUrl: detail.userInfo.avatarUrl
            })
            wx.hideLoading(); //关闭加载提示
          }).catch(err => {
            console.log(err);
          })
        }
      }).catch(err => {
        console.log(err);
        wx.hideLoading(); //关闭加载提示
      });

    } else {
      console.log(2000002);
    }
    console.log(e);
    // onLoad();
  }
})