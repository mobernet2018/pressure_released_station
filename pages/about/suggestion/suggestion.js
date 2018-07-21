var Bmob = require('../../../utils/Bmob-1.6.1.min.js');
Bmob.initialize("", "");      //设置Application Id和Rest API Key
const app=getApp();
// pages/about/suggestion/suggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhutitext:"",
    contenttext:""
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
  
  },
  zhuti:function(e){
    this.setData({
      zhutitext:e.detail.value
    })
  },
  content:function(e){
    this.setData({
      contenttext:e.detail.value
    })
  },
  upload:function(){
    const query = Bmob.Query('suggestion');
    let current = Bmob.User.current();
    query.set("publisher",current.objectId);
    query.set("zhuti",this.data.zhutitext);
    query.set("content",this.data.contenttext);
    query.save().then(res => {
      console.log(res)
      wx.showToast({
        title: '提交成功',
      })
    }).catch(err => {
      console.log(err)
    })
  }
})