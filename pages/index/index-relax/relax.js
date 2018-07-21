// pages/index/index-relax/relax.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    r: 11,
    disabled: false,
    flag:true,
    setInter:''
  },
  width: 0,
  height: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  a:0, 
  b:0,
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.showModal({
      title: '深呼吸是解压的良药',
      content: '请跟随着页面上的提示进行深呼吸吧~',
      showCancel: false
    })
    this.setData({
      flag: true
    })
    wx.createSelectorQuery().select('.view2').boundingClientRect(function (rect){
         this.width = rect.width;
         this.height = rect.height;
         //只画圆
         var ctx = wx.createCanvasContext('myCanvas')
         ctx.beginPath()
         ctx.arc((this.width) / 2, (this.height) / 2, 110, 0, 2 * Math.PI)
         ctx.stroke()

         ctx.draw()

    }).exec();
    /*    var ctx = wx.createCanvasContext('myCanvas')
        //画圆并填充颜色
        ctx.arc(130, 160, r, 0, 2 * Math.PI)
        ctx.setFillStyle('blue')
        ctx.fill()                      */

  },

  onReady: function () {
    /**
     * 生命周期函数--监听页面初次渲染完成
     */

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
    this.setData({
      flag:false
    })
    clearInterval(this.data.setInter)
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

  changeR: function (e) {
    clearInterval(this.data.setInter);
    var ctx1 = wx.createCanvasContext('myCanvas')
    ctx1.clearRect(0,0,10000,10000)
    //画圆并填充颜色
    let rr = this.data.r
    let i = 0;
    this.setData({
      disabled:true
    })
    var that=this
    setTimeout(function(){
      
    },120000)
    wx.createSelectorQuery().select('.view2').boundingClientRect(function (rect) {
      that.width = rect.width;
      that.height = rect.height;
      var that1=that;
      var time=121;
      var time1;
      if (that.data.flag == true) {
        that.data.setInter = setInterval(function () {
          //ctx1.arc(130, 160, rr, 0, 2 * Math.PI)
          //ctx.stroke
          //天蓝色


          //只画圆
          ctx1.arc((that1.width) / 2, (that1.height) / 2, rr, 0, 2 * Math.PI)
          ctx1.fill()
          

          ctx1.beginPath()
          ctx1.arc((that1.width) / 2, (that1.height) / 2, 110, 0, 2 * Math.PI)
          ctx1.stroke()

          if((i*20)%1000 == 0)
          {
            time=time-1;
            if(time>9){
              time1=''+time+'s';
            }
            if(time <= 9 && time > 0)
            {
              time1='0'+time+'s';
            }
            else if(time <= 0)
            {
              time1=''
            }
          }
          ctx1.setFillStyle('skyblue');
          ctx1.fillText(''+time1, (that1.width / 2) - 30, (that1.height / 2) - 120);
          //绘制被填充的文本
          //判断本次的半径与下一次半径的大小关系
          ctx1.draw()

          if (that1.data.flag == true) {
            i++
            //rr=rr+0.1
            if(i>=6000)
            {
              rr=0;
              ctx1.fillText('', (that1.width / 2) - 30, (that1.height / 2) + 140)
            }
            else
            {
              rr = 60 - 50 * Math.cos(i * Math.PI * 0.0053)
              if (rr < 11) {
                rr = 11
              }
              if ((60 - 50 * Math.cos(i * Math.PI * 0.0053)) < (60 - 50 * Math.cos((i + 1) * Math.PI * 0.0053))) {
                ctx1.setFontSize(30)
                ctx1.setFillStyle('skyblue')
                ctx1.fillText('吸气', (that1.width / 2) - 30, (that1.height / 2) + 140)             
              }
              else {
                ctx1.setFontSize(30)
                ctx1.setFillStyle('skyblue')
                ctx1.fillText('呼出', (that1.width / 2) - 30, (that1.height / 2) + 140)  
              }
            }
          }
        }, 20)
        setTimeout(function(){
          that1.setData({
            disabled: false
          })
        },120500) 
      }
    }).exec();
 
  },

  changeS:function(){
    clearInterval(this.data.setInter);
    this.setData({
      flag:true,
      disabled:false
    })
    wx.createSelectorQuery().select('.view2').boundingClientRect(function (rect) {
      this.width = rect.width;
      this.height = rect.height;
      //只画圆
      var ctx = wx.createCanvasContext('myCanvas')
      ctx.clearRect(0,0,10000,10000)
      ctx.beginPath()
      ctx.arc((this.width) / 2, (this.height) / 2, 110, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.draw()

    }).exec();
    
  }
})