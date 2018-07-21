// pages/about/about.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose_skyblue: true,
    choose_deepblue: false,
    choose_diamondgreen: false,
    choose_springgreen: false,
    choose_watergreen: false,
  },
  onLoad: function(){
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },
  skyblue:function(){
    this.setData({
      choose_skyblue: true,
      hoose_deepblue: false,
      choose_diamondgreen: false,
      choose_springgreen: false,
      choose_watergreen: false,
    })
    app.globalData.backgroundcolor="#87cefa"
    wx.setStorage({
      key: 'backgroundcolor',
      data: "#87cefa"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },

  deepblue: function () {
    this.setData({
      choose_skyblue: false,
      hoose_deepblue: true,
      choose_diamondgreen: false,
      choose_springgreen: false,
      choose_watergreen: false,
    })
    app.globalData.backgroundcolor = "#00bfff"
    wx.setStorage({
      key: 'backgroundcolor',
      data: "#00bfff"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },

  diamondgreen: function () {
    this.setData({
      choose_skyblue: false,
      hoose_deepblue: false,
      choose_diamondgreen: true,
      choose_springgreen: false,
      choose_watergreen: false,
    })
    app.globalData.backgroundcolor = "#40e0d0"
    wx.setStorage({
      key: 'backgroundcolor',
      data: "#40e0d0"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },

  springgreen: function () {
    this.setData({
      choose_skyblue: false,
      hoose_deepblue: false,
      choose_diamondgreen: false,
      choose_springgreen: true,
      choose_watergreen: false,
    })
    app.globalData.backgroundcolor = "#00ff7f"
    wx.setStorage({
      key: 'backgroundcolor',
      data: "#00ff7f"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },

  watergreen: function () {
    this.setData({
      choose_skyblue: false,
      hoose_deepblue: false,
      choose_diamondgreen: false,
      choose_springgreen: false,
      choose_watergreen: true,
    })
    app.globalData.backgroundcolor = "#00FFFF"
    wx.setStorage({
      key: 'backgroundcolor',
      data: "#00ffff"
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  }

  
})