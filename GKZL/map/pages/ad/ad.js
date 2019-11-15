var QQMap = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
// const db = wx.cloud.database();
//上面是map引过来的
Page({

  data: {

    // tab切换  

    currentTab: 0,
    //没有点击nav按钮则默认0
    defaulteone:0,
    kind1:0,

    //下面是地图引过来的data
    dataObj: [],//点击地图坐标的数据
    imgList: [],//广告页面数据
    showDialog: true,
    mapCtx: '',
    longitude: 113.352985,
    latitude: 22.123592,
    speed: 0,
    accuracy: 0,
    scale: 17,
    markers: [{
      iconPath: "../images/zb.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 30,
      height: 30,
      callout: {
        content: 'B2',
        color: '#FF0000',
        fontSize: 12,
        display: 'ALWAYS'
      }
    }],
  },
//下面是nav滑动点击对应tab的js,下面的注释，是点击tap切换对应页面的

 

//禁止点击tap切换到对应界面
  //swiperChange: function (e) {

    //console.log(e);
    //this.setData({
    //currentTab: e.detail.current,
   // })

  //},

  //禁止n内容区域wiper-item左右滑动
  stopTouchMove: function () {
    return false;
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.queryImg();
    this.mapCtx = wx.createMapContext('map');
    qqmapsdk = new QQMap({
      key: '544BZ-C2XW4-JWJUY-DCHQ4-JBS6V-UBFRJ'
    });
    var that = this;
    var lats = that.data.lats;
    var lots = that.data.lgts;
    var names = that.data.names;
    this.onQuery();
    wx.showLoading({
      title: '定位中...',
      mask: true
    })
   wx.getLocation({
  
   //   type: 'gcj02',
   //使用wgs84提高定位精度gps
        type: 'wgs84',
     
      success: function (res) {
        wx.hideLoading();
     
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度
        })
        if (22.132900 > latitude > 22.115000) {
          wx.showToast({
            title: '当前不在学校范围内',
            icon: 'none'
          })
          return;
        }
        wx.showToast({
          title: '定位成功',
          icon: 'none'
        })
        that.getMap();
      },
      fail: function () {
        wx.showToast({
          title: '定位失败',
          icon: 'none'
        })
      }
    })

  },

 



  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
     } else {
       that.setData({
      currentTab: e.target.dataset.current,
      })

    }
    var kind = e.target.id
    console.log(kind)
    var that = this;
    // const db = wx.cloud.database();
  
    

        //从数据库读取地图数据
        db.collection('map')
          .get({
            success: res => {
              //处理res数据字符串化

           
              var list = JSON.parse(JSON.stringify(res.data, null, 0));
              console.log("list===========", list)
              if (kind <= 1){
              var obj = list[0].msgssl;
              //默认全部，下次更新
                }
              if (kind==2) {
                var obj = list[0].msgjxq;
              } if (kind == 3) {
                var obj = list[0].msgkdd;
              }
               if(kind == 4) {
                 var obj = list[0].msgyzc;
               }
              if (kind == 5) {
                var obj = list[0].msgst;
              }
              if (kind == 6) {
                var obj = list[0].msgqt;
              }


              else{}


              that.setData({
                // imgList: imgList,
                dataObj: obj
              })
              var temp = new Array();
              //设置坐标
              for (var i = 0; i < obj.length; i++) {
                temp.push({
                  iconPath: "../images/zb.png",
                  id: obj[i].id,
                  latitude: obj[i].lats,
                  longitude: obj[i].lgts,
                  width: 30,
                  height: 30,
                  callout: {
                    content: obj[i].name,
                    color: '#000',
                    fontSize: 12,
                    display: 'ALWAYS'
                  }
                });
                that.setData({
                  markers: temp
                })
              }
            },
            fail: err => {
              wx.showToast({
                title: '设置坐标失败',
                icon: null
              })
            }
          })
        this.onShow();
  },

  onReady: function () {

    // 生命周期函数--监听页面初次渲染完成

  },

  onShow: function () {

    // 生命周期函数--监听页面显示

  },

  onHide: function () {

    // 生命周期函数--监听页面隐藏

  },

  onUnload: function () {

    // 生命周期函数--监听页面卸载

  },

  onPullDownRefresh: function () {

    // 页面相关事件处理函数--监听用户下拉动作

  },

  onReachBottom: function () {

    // 页面上拉触底事件的处理函数

  },

  onShareAppMessage: function () {

    // 用户点击右上角分享

    return {

      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径

    }

  },




//下面是地图引过来的js
  //广告弹窗
  toggleDialog: function () {
    if (!this.data.showDialog) {
      this.queryImg();
    }
    this.setData({
      showDialog: !this.data.showDialog
    })
  },
  //获取学校位置
  getSchool: function () {
    this.setData({
      longitude: 113.353608,
      latitude: 22.124665,
      scale: 16
    })
  },
  //获取当前位置
  getMap: function () {
    this.getlocation();
    this.mapCtx.moveToLocation();
    this.setData({
      scale: 18
    })
  },
  getlocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: latitude, //纬度 
          longitude: longitude, //经度 
        })
      }
    })
  },

  //导航方法
  gotohere: function (res) {
    var markerId = res.markerId; // 获取点击的markers  id
    var lat = this.data.dataObj[markerId].lats; // 获取点击的markers经纬度
    var lon = this.data.dataObj[markerId].lgts; // 获取点击的markers经纬度
    var name = this.data.dataObj[markerId].name; // 获取点击的markers名称
    wx.openLocation({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      name: name,
      success: function (res) {
        wx.showToast({
          title: '跳转成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '跳转失败',
          icon: none
        })
      }
    })
  },

  onQuery: function () {
  



    if (this.data.defaulteone==0){
    console.log("开始执行地图")
      var that = this;
      const db = wx.cloud.database();


      //从数据库读取地图数据
      db.collection('map')
        .get({
          success: res => {
            //处理res数据字符串化


            var list = JSON.parse(JSON.stringify(res.data, null, 0));
           
              var obj = list[0].msgssl;

            that.setData({
              // imgList: imgList,
              dataObj: obj
            })
            var temp = new Array();
            //设置坐标
            for (var i = 0; i < obj.length; i++) {
              temp.push({
                iconPath: "../images/zb.png",
                id: obj[i].id,
                latitude: obj[i].lats,
                longitude: obj[i].lgts,
                width: 30,
                height: 30,
                callout: {
                  content: obj[i].name,
                  color: '#000',
                  fontSize: 12,
                  display: 'ALWAYS'
                }
              });
              that.setData({
                markers: temp
              })
            }
          },
          fail: err => {
            wx.showToast({
              title: '设置坐标失败',
              icon: null
            })
          }
        
        })
      
      
      
    }else{

      console.log("条件不满足")

    }
    console.log( this.data.defaulteone)

  },

 

  gotoWeb: function (res) {
    var url = {
      url: res.currentTarget.dataset.url
    };
    wx.navigateTo({
      url: '../web/web?url=' + encodeURIComponent(JSON.stringify(url)) + '&name=' + res.currentTarget.dataset.name //使用decodeURIComponent编码
    })
  },
  //查询图片
  queryImg: function (res) {
    var that = this;
    const db = wx.cloud.database();
    //从数据库读取地图数据
    db.collection('imgList')
      .get({
        success: res => {
          //处理res数据字符串化
          var list = JSON.parse(JSON.stringify(res.data, null, 0));
          console.log("imglist===========",list)
          //获取广告图片地址
          var imgList = list[0].imgUrls;
          var imgUrls = new Array(); //图片集合
          for (var j = 0; j < imgList.length; j++) {
            imgUrls.push({
              img: imgList[j].img,
              url: imgList[j].url,
              id: imgList[j].id
            })
          }
          that.setData({
            imgList: imgList
          })
        
        }
      })
      
  },

  //gotoresult: function (e) {



   //   var kind = e.target.id



  //    console.log(kind);
  //  }

})
