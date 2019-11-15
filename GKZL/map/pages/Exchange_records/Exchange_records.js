// pages/Exchange_records/Exchange_records.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_list:[
      {},{},{},{}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击复制
  copy:function(e){
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  //取消兑换
  dete:function(e){
    console.log(e.target.dataset.id)
    var id = e.target.dataset.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确定取消',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
  
          that.data.shop_list.splice(id, 1)
          console.log(that.data.shop_list)
         that.setData({
           shop_list: that.data.shop_list
         })
          console.log(that.data.shop_list.length)

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})