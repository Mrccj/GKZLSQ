// pages/Exchange_area/Exchange_area.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_list:[
      {},{},{},{},{}
    ],
    state:1,
    canshu:""
  },

  //隐藏弹窗
  mark_hide:function(){
    var that=this;
    that.setData({
      state: 1
    })
  },
  //显示弹窗
  block_show:function(){
    var that = this;
    that.setData({
      state: 2
    })
  },
//取消事件
  cancel:function(){
    var that=this;
    that.mark_hide();
  },
  //确定事件
 sure: function () {
    var that = this;
    that.mark_hide();
   wx.showToast({
     title: "兑换成功",
     icon: 'success',
     duration: 1500,
      success:function(){
        wx.navigateTo({
          url: '../exchange/exchange',
        })
      }
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.index)
      var that=this;
      that.setData({
        canshu: options.index
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