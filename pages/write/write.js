
//获取应用实例
var app = getApp()
var Bmob = require("../../utils/bmob.js");
var common = require('../listtemplate/getCode.js')
var that;
Page({
  onLoad: function (options) {
    that = this;
    that.setData({//初始化数据
      selected:true,
      selected1:false,
      src: "",
      isSrc: false,
      autoFocus: true,
      isLoading: false,
      loading: true,
      isdisabled: false,
      stype:2
    })
  },
  onReady: function () {
    wx.hideToast()
  },
  onShow: function () {
    var myInterval = setInterval(getReturn, 500);
    function getReturn() {
      wx.getStorage({
        key: 'user_openid',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            that.setData({
              loading: true
            })
          }
        }
      })
    }
  },
  uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc: true,
          src: tempFilePaths
        })
      }
    })
  },
  //选择主题
  release_pour:function(){
    this.setData({
      selected: true,
      selected1: false,
      stype:2
    })
  },
  release_tucao: function () {
    this.setData({
      selected: false,
      selected1: true,
      stype: 1
    })
  },
  clearPic: function () {//删除图片
    that.setData({
      isSrc: false,
      src: ""
    })
  },
  sendNewMood: function (e) {//上传
    //判断内容是否为空

    var content = e.detail.value.content;
    var title = e.detail.value.title;

    console.log(content)

    if (content == "") {
      common.dataLoading("内容不能为空", "loading");
    }
    else {
      that.setData({
        isLoading: true,
        isdisabled: true
      })
          var diary = Bmob.Query("tucao");
          var currentuser = Bmob.User.current();
          diary.set("publisher",currentuser.objectId);
          diary.set("type",that.data.stype);
          diary.set("title", title);
          diary.set("content", content);         
          diary.set("likeNum", 0);
          diary.set("commentNum", 0);
          diary.set("liker", []);
          if (that.data.isSrc == true) {
            var name = that.data.src[0];//上传的图片的别名
            var file = new Bmob.File('abc.jpg', that.data.src[0]);
            file.save().then(res=>{
              console.log(res);
              var text = res[0];
              var url = text.match("http.*jpg");  //利用正则表达式匹配http.*jpg获取图片在服务器端的绝对地址
              console.log(url);
              diary.set("picture", url[0]);
              diary.save().then(result=>{
                console.log(result)
                that.setData({
                  isLoading: false,
                  isdisabled: false
                })
              // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                common.dataLoading("发布成功", "success", function () {
                  wx.navigateBack({
                    delta: 1
                  })
                });
              }).catch( error=> {
              // 添加失败
                console.log(error)
                common.dataLoading("发布失败", "loading");
                that.setData({
                  isLoading: false,
                  isdisabled: false
                })
              }).catch(err3 => {
                  console.log(err3)
              })
            })
          }
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
