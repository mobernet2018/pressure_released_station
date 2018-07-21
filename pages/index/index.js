//index.js
//获取应用实例
const app = getApp()

Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    circular: true,
    vertical: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    mongji: "4种方法助你快速解压！",
    relaxMongji: "放松解压",
    violenceMongji: "暴力解压",
    pourMongji: "倾诉&吐槽解压",
    scrawlMongji: "涂鸦解压",
    array: [{
      background: "../../utils/image/introduce.jpg",
      desti_url: "../active/announcement/announcement"
     },
     {
       background: '../../utils/image/explainpage.jpg',
       desti_url: "../about/explain/explain"
      },
      {
        background: '../../utils/image/suggestion.jpg',
        desti_url: "../about/suggestion/suggestion"
      }],
    relax: "../../utils/icon/relax.png",
    violence: "../../utils/icon/violence.png",
    pour: "../../utils/icon/pour.png",
    scrawl: "../../utils/icon/scrawl.png"
  },
  onLoad:function(){
    try {
      wx.getStorage({
        key: 'backgroundcolor',
        success: function (res) {
          console.log(res.data)
          app.globalData.backgroundcolor = res.data
        },
        error: function(res){
          app.globalData.backgroundcolor = "#87cefa"
        }
      })
      console.log("error??");
    }catch(e){
      app.globalData.backgroundcolor="#87cefa"
    }
    
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },
  onShow:function(){
    wx.getStorage({
      key: 'backgroundcolor',
      success: function (res) {
        console.log(res.data)
        app.globalData.backgroundcolor = res.data
      }
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
  },
  clickswiper: function(event){
    var desti_url = event.currentTarget.dataset.url;
    if(desti_url != "")
    {
      wx.navigateTo({
        url: desti_url
      })
    }
  },
  relaxpage: function(event){
    wx.navigateTo({
      url: './index-relax/relax'
    })
  },
  violencepage: function (event) {
    wx.navigateTo({
      url: './index-violence/violence'
    })
  },
  pourpage: function (event) {
    wx.navigateTo({
      url: './index-pour/pour'
    })
  },
  scrawlpage: function (event) {
    wx.navigateTo({
      url: './index-scrawl/scrawl'
    })
  }
})