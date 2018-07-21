var Bmob = require('../../../utils/Bmob-1.6.1.min.js');
Bmob.initialize("", "");      //设置Application Id和Rest API Key
const app=getApp();
Page({
  data: {
    pencil: [{
      selected: "../../../utils/icon/pencil_selected.png",
      noselected: "../../../utils/icon/pencil.png"
    }],
    item: [{
      thiki: "../../../utils/icon/thiki.png",
      thiki_selected: "../../../utils/icon/thiki_selected.png"
    }],
    eraser: [{
      selected: "../../../utils/icon/eraser_selected.png",
      noselected: "../../../utils/icon/eraser.png"
    }],
    pen: 3, //画笔粗细默认值
    r: 33,
    g: 33,
    b: 33,
    drawjustice: true,
    scroll: false,
    eraserjustice: false,
    bmobpic: "",
    showModalStatus:false
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存Y坐标轴变量
  isClear: false, //是否启用橡皮擦标记

  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: app.globalData.backgroundcolor
    })
    wx.showModal({
      title: '涂鸦的上传是匿名的哦~',
      content: '没人知道哪个涂鸦是你画的，所以请肆意涂鸦吧！',
      showCancel: false,
    })
    let ctx = wx.createCanvasContext('mycanvas');
    ctx.rect(0, 0, 10000, 10000);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    ctx.draw();
  },

  //手指触摸动作开始
  touchStart: function (e) {
    //得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()

    if (this.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.setStrokeStyle('#FFFFFF') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
      this.context.setLineCap('round') //设置线条端点的样式
      this.context.setLineJoin('round') //设置两线相交处的样式
      this.context.setLineWidth(20) //设置线条宽度
      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() //开始一个路径 
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
      this.context.fill();  //对当前路径进行填充
      this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(`rgb(${this.data.r},${this.data.g},${this.data.b})`)
      this.context.setLineWidth(this.data.pen)
      this.context.setLineCap('round') // 让线条圆润 
      this.context.beginPath()

    }
  },
  //手指触摸后移动
  touchMove: function (e) {

    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    if (this.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke();  //对当前路径进行描边
      this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;

    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()

      this.startX = startX1;
      this.startY = startY1;

    }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'mycanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
  },
  //手指触摸动作结束
  touchEnd: function () {

  },
  //启动画笔
  pencil: function () {
    this.isClear = false;
    this.setData({
      drawjustice: true,
      eraserjustice: false
    })
  },
  //启动橡皮擦方法
  eraser: function () {
    this.isClear = true;
    this.setData({
      drawjustice: false,
      eraserjustice: true
    })
  },
  //清除涂鸦
  throwaway: function () {
    const ctx = wx.createCanvasContext("mycanvas");
    ctx.clearRect(0, 0, 10000, 10000);
    ctx.rect(0, 0, 10000, 10000);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    ctx.draw();
  },

  upload: function (res) {
    this.context.draw(false,
      wx.canvasToTempFilePath({   //将画布上的内容转化为png图片的网络临时地址
        canvasId: 'mycanvas',
        success: function (res) {
          //上传到Bmob数据库
          console.log(res);
          var tempFilePath = res.tempFilePath;  //将临时地址赋给tempFilePath
          const query = Bmob.Query('pic');
          //用Bmob官方文档中“上传文件”的方法将图片转化成文件上传到Bmob服务器
          var file = Bmob.File('abc.jpg', tempFilePath)
          file.save().then(res => {
            console.log(res.length);
            console.log(res[0]);              //res[0]是包含绝对地址的一个很长的字符串，包含图片在Bmob服务器中的绝对地址
            var text = res[0];
            var url = text.match("http.*jpg");  //利用正则表达式匹配http.*jpg获取图片在服务器端的绝对地址
            console.log(url);
            query.set("pic", url[0]);          //得到的url[0]即是绝对地址
            query.save().then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
            });
            wx.showToast({
              title: '上传成功',
            })
          })
        }
      }, this)
    )
  },

  save:function(){
    this.context.draw(false,
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          //上传到Bmob数据库
          console.log(res);
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function(res){
              wx.showToast({
                title: '保存成功',
              })
            }
          })
        }
      })
    )
  },

  view: function () {
    wx.navigateTo({
      url: './bmobpics'
    })
  },
  //调节线条粗细
  thikichange: function (e) {
    this.setData({
      pen: e.detail.value
    })
  },
  redchange: function (e) {
    this.setData({
      r: e.detail.value
    })
  },
  greenchange: function (e) {
    this.setData({
      g: e.detail.value
    })
  },
  bluechange: function (e) {
    this.setData({
      b: e.detail.value
    })
  },
  redchanging: function (e) {
    this.setData({
      r: e.detail.value
    })
  },
  greenchanging: function (e) {
    this.setData({
      g: e.detail.value
    })
  },
  bluechanging: function (e) {
    this.setData({
      b: e.detail.value
    })
  },
  thiki: function (e) {
    if (this.data.scroll == false) {
      wx.createSelectorQuery().select('#container').boundingClientRect(function (rect) {
        // 使页面滚动到底部
        wx.pageScrollTo({
          scrollTop: rect.bottom,
          duration: 300
        })
      }).exec()
      this.setData({
        scroll: true,
        showModalStatus:true
      })
    }
    else {
      wx.createSelectorQuery().select('#container').boundingClientRect(function (rect) {
        // 使页面滚动到顶部
        wx.pageScrollTo({
          scrollTop: rect.top,
          duration: 300
        })
      }).exec()
      this.setData({
        scroll: false,
        showModalStatus: false
      })
    }
  }
})
