// pages/web.js

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    url:"www.badiu.com",
    name:"test"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
    var url="";
    if(options.url!="")
    { 
      var temp = JSON.parse(decodeURIComponent(options.url));//使用decodeURIComponent解码
      url = temp.url;
    }else{
      url = "http://www.baidu.com";
    }
    console.log(url);
    var name = options.name;
    this.setData({
      url:url,
      name:name
    })
    wx.setNavigationBarTitle({
      title: options.name,
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