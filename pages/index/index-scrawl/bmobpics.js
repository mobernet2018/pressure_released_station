var Bmob = require('../../../utils/Bmob-1.6.1.min.js');
Bmob.initialize("", "");      //设置Application Id和Rest API Key
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
    const query = Bmob.Query('pic');
    query.find().then(res => {
      console.log(res)
      for (var i = 0; i < res.length; i++)
      {
        this.setData({
          ["pics["+ (res.length-1-i)+"]"]:res[i].pic    //将表中pic列的内容赋给pics数组用以在页面中进行展示
        }) 
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