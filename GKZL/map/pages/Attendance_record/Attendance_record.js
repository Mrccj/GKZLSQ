// pages/Attendance_record/Attendance_record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    state: 1,
    date: "2019-10",
    signAll:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTopData();
  },
  // 生成头部 累积签到 本月签到 在平台时间 //还没做完 本月签到 在平台时间
  getTopData: function() {
    wx.cloud.callFunction({
      name: 'signGetFormOpenid'
    }).then(res => {
      let data =[];
      data = res.result.data;
      console.log(data.length);
      this.setData({
        signAll: data.length
      })
      
    }).catch(err => {

    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      state: 1
    })
  },
  //显示列表全部
  change: function() {
    var that = this;
    that.setData({
      state: 2
    })
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

  }
})