// pages/index/index-violence/violence.js
var Bmob = require('../../../utils/Bmob-1.6.1.min.js');
Bmob.initialize("d5b6918de7b37d417da1f195417ac00d", "3b9770913d04b70d8b3a2c2c92d00641");
const app=getApp();
var num=0;
var xiaojie=0;
var counter=0;
var animation = wx.createAnimation({})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    donghua: true,
    left: [],
    setInter: "",
    setTime: "",
    musicUrl:"",
    score:0,
    gamestate:false
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
    wx.showModal({
      title: '密集恐惧症患者慎入哦',
      content: '这个"打狗"游戏可是连获得300分都很难的哦（建议手机配置CPU频率高于2.2Ghz）',
      showCancel: false
    })
    //定义64个节奏点图形的初始设置
    for (var i = 0; i < 64; i++) {
      this.setData({
        ["left[" + i + "].class"]: "ani",
        ["left[" + i + "].id"]:i,
        ["left[" + i + "].distance"]: -34,
        ["left[" + i + "].playstate"]:"paused",
      })
    }
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
    wx.stopBackgroundAudio()
    clearInterval(this.data.setInter)
    num = 0;
    xiaojie = 0;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.stopBackgroundAudio()
    clearInterval(this.data.setInter)
    num=0;
    xiaojie=0;
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

  startgame: function () {
    counter=0;
    if (this.data.disabled == false) {
      this.setData({
        disabled: true,
        score:counter,
        gamestate: true
      })
    }
    const query = Bmob.Query('backgroundmusic');
    query.find(query.find().then(res => {
      console.log(res)
      this.setData({
        musicUrl:res[0].music
      })
      console.log(this.data.musicUrl)
      wx.playBackgroundAudio({
        dataUrl: this.data.musicUrl,
        title: 'Cubana --- Maksim Mrvica',
        coverImgUrl: ''
      })
    }))
    //cubana乐曲的节奏点数组
    var cubana_theme = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //startgame方法
    //用延时跳过音乐的前奏
    this.data.setTime=setTimeout(function () {
      if(this.data.gamestate==true){    //如果游戏没有终止，则执行下方代码
        this.data.setInter = setInterval(function () {
          this.setData({        //分值赋值
            score: counter
          })
          num = num + 1;
          xiaojie = xiaojie + Math.floor(num / 64);
          num = num % 64;
          //console.log(xiaojie*64+num);
          if ((xiaojie * 64 + num) < cubana_theme.length) {
            console.log(xiaojie * 64 + num)
            if (cubana_theme[xiaojie * 64 + num] == 1) {
              //cubana的节奏点数组中对应节奏点若为1，则触发一次气球
              this.test(num);
            }
          }
          //当所有的节奏点都完成动画后，游戏结束
          else if ((xiaojie * 64 + num) == cubana_theme.length) {
            setTimeout(function () {
              this.bgmstop();
            }.bind(this), 1000)
          }
        }.bind(this), 109.050)
      }
    }.bind(this), 23290)
  },

  //决定当前节奏点图形出现的位置方法，在上方的startgame方法中被调用
  test: function (num) {
    var numselect = Math.floor(Math.random() * 6) //在0~5的整数中中生成随机数
    var left        //left为待决定的位置
    switch (numselect) {
      case 0:
        left = -31.09
        break;
      case 1:
        left = 74.75
        break;
      case 2:
        left = 179.58
        break;
      case 3:
        left = 286.42
        break;
      case 4:
        left = 292.25
        break;
      case 5:
        left = 398.08
        break;
    }
    this.donghua(num, left);
  },

  //设置图形的动画状态方法
  donghua: function (num,left) {
    this.setData({
      ["left[" + num + "].distance"]: left,
    })
    this.setData({
      ["left[" + num + "].playstate"]:"running"
    })
  },

  //一次动画结束后控制动画重复执行的方法
  end: function (event) {
    this.setData({
      ["left[" + event.currentTarget.id + "].class"]: "anime",
      ["left[" + event.currentTarget.id + "].playstate"]:"paused"
    })
    setTimeout(function () {
      this.setData({
        ["left[" + event.currentTarget.id + "].class"]: "ani",
      })
    }.bind(this), 600)
  },

  doge:function(event){
    counter++;
  },

  //结束游戏按键对应的方法
  endgame: function(){
    wx.stopBackgroundAudio()
    clearTimeout(this.data.setTime)
    clearInterval(this.data.setInter)
    num = 0;
    xiaojie = 0;
    this.setData({
      disabled: false,
      gamestate: false
    })
    for (var i = 0; i < 64; i++) {
      this.setData({
        ["left[" + i + "].distance"]: -34,
      })
    }
  },

  //当游戏结束的时候调用的方法，用以将该功能的各项设置回归初始状态，并关掉音乐
  bgmstop: function(){
    clearInterval(this.data.setInter);
    num=0;
    xiaojie=0;
    this.setData({
        disabled: false,
        gamestate: false
    })
    wx.stopBackgroundAudio();
    console.log("over")
    for (var i = 0; i < 64; i++) {
      this.setData({
        ["left[" + i + "].class"]: "ani",
        ["left[" + i + "].id"]: i,
        ["left[" + i + "].distance"]: -34,
        ["left[" + i + "].playstate"]: "paused",
      })
    }
  }  
})

