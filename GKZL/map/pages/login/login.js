// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //提交事件
  formSubmit: function(e) {
    console.log(e.detail.value.nick)
    console.log(e.detail.value.password)
    if (e.detail.value.nick.length == 0) {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 1500
      })
    console.log("按钮触发了")
    } else if (e.detail.value.password.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      })
    } else if (e.detail.value.password.length != 8) {
      wx.showToast({
        title: '密码必须为8位',
        icon: 'none',
        duration: 1500
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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