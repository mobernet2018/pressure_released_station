// pages/index/index-pour/pour.js
var common = require('../../../utils/common.js')
var app = getApp()
var Bmob = require("../../../utils/bmob.js");
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    selected2: false,
    selected3: false,
    selected4: false,
    selected5: false,
    moodList: [],
    value:2,
    limit: 0,
    page: 3,//当前请求的页数
    currentPage: 0,//当前请求的页数
    isload: false,
    isEmpty: true,
    pageSize: 5,//每次加载多少条
    // limit: 2,//跟上面要一致
    loading: false,
    windowHeight1: 0,
    windowWidth1: 0,
    count: 0,
    scrollTop: {
      scroll_top1: 0,
      goTop_show: false
    },
    showModalState: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    if(this.data.showModalState==true)
    {
      wx.showModal({
        title: '这是一个全匿名的聊天平台',
        content: '请在这个平台内肆意的倾诉或吐槽吧',
        showCancel: false
      })
      this.setData({
        showModalState: false
      })
    }
    if (!t) {
      that = this;
      if(that.data.selected4==true||that.data.selected5==true){
        wx.getStorage({
          key: 'user_id',
          success: function (res) {
            getReturn(that, that.data.value, res.data);
          },
        })
      }else if(that.data.selected2==true||that.data.selected3==true){
        wx.getStorage({
          key: 'user_id',
          success: function (res) {
            getMylike(that, that.data.value, res.data);
          },
        })
      }
      else{
        getReturn(that,that.data.value)
      }
    }
  },
  //设置页面参数
  onSetData: function (data) {
    console.log(data.length);
    let page = this.data.currentPage = this.data.currentPage + 1;
    that=this;
    //设置数据
    data = data || [];

    that.setData({                   //显示倾诉或吐槽内容的具体信息
      moodList: page === 1 || page === undefined ? data : this.data.moodList.concat(data),
      isEmpty: data.length === 0 ? false : true,
      isload: true,
    });
    if(data.length===0){
      wx.showToast({
        title: '暂无最新数据',
        icon: 'success',
        duration: 2000
      })
    }
    console.log(this.data.moodList, page);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var molist = new Array();
    // var myInterval = setInterval(getReturn, 500);

    if (e) {
      that.setData({
        currentPage: 0,              //当前页数
        page: 3,					//每页显示的内容数量
      })
    }

    this.onLoad();

    wx.getSystemInfo({				//获取手机屏幕尺寸
      success: (res) => {
        that.setData({
          windowHeight1: res.windowHeight,
          windowWidth1: res.windowWidth
        })
      }
    })
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
    wx.stopPullDownRefresh();
    var limit = that.data.limit
    console.log("下拉刷新....." + that.data.limit)
    that.setData({
      limit: that.data.pageSize,

    })
    that.onShow(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.onShow();
  },

  scrollTopFun: function (e) {
    if (e.detail.scrollTop > 300) {
      this.setData({
        'scrollTop.goTop_show': true
      });
    } else {
      this.setData({
        'scrollTop.goTop_show': false
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //最新倾诉
  show_pour_latest: function (e) {
    this.setData({
      selected: true,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      moodList: [],
      value:2,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    getReturn(this, 2);
  },
  //最新吐槽
  show_tucao_latest: function(e){
    this.setData({
      selected: false,
      selected1: true,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: false,
      moodList: [],
      value:1,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    getReturn(this,1);
  },
  //关注倾诉
  show_pour_like:function(e){
    this.setData({
      selected: false,
      selected1: false,
      selected2: true,
      selected3: false,
      selected4: false,
      selected5: false,
      moodList: [],
      value: 2,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    that=this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        getMylike(that, 2, res.data);
      },
    })
  },
  //关注吐槽
  show_tucao_like: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: true,
      selected4: false,
      selected5: false,
      moodList: [],
      value: 1,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        getMylike(that, 1, res.data);
      },
    })
  },
  //我的倾诉
  show_pour_mine: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: true,
      selected5: false,
      moodList: [],
      value: 2,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    that = this;
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        getReturn(that, 2, res.data);
      },
    })
  },
  //我的吐槽
  show_tucao_mine: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      selected5: true,
      moodList: [],
      value:1,
      limit: 0,
      page: 3,//当前请求的页数
      currentPage: 0,//当前请求的页数
      isload: false,
      isEmpty: true,
      pageSize: 5,//每次加载多少条
      // limit: 2,//跟上面要一致
      loading: false,
      windowHeight1: 0,
      windowWidth1: 0,
      count: 0,
      scrollTop: {
        scroll_top1: 0,
        goTop_show: false
      }
    })
    that=this;
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        getReturn(that, 1, res.data);
      },
    })
  }
})
//从用户表获取关注信息
function getMylike(that,value,userid){
  if (that.data.isEmpty === false) {
    return;
  }
  that.setData({
    loading: false
  });
  var molist = new Array();
  var likeArray=new Array();
  var query=Bmob.Query('_User');
  query.get(userid).then(res=>{    //获取关注内容的ID
    if(value==1){
      likeArray=res.tucao_like;
    }else if(value==2){
      likeArray=res.pour_like;
    }
    var likequery = Bmob.Query('tucao');
    likequery.containedIn('objectId', likeArray);
    likequery.limit(that.data.page);
    likequery.skip(that.data.page * that.data.currentPage);
    likequery.order('-createdAt');
    likequery.find().then(results => {			//获取具体的关注内容
      for (var i = 0; i < results.length; i++) {
        var title = results[i].title;
        var content = results[i].content;
        var createdAt = results[i].createdAt;
        var id = results[i].objectId;
        var _url;
        var likeNum = results[i].likeNum;
        var commentNum = results[i].commentNum;
        var pic = results[i].picture;
        if (pic) {
          _url = results[i].picture;
        }
        else {
          _url = null;
        }
        var liker = results[i].liker;
        var isLike = 0;
        for (var j = 0; j < liker.length; j++) {
          if (liker[j] == userid) {
            isLike = 1;
            break;
          }
        }
        var jsonA;
        if (pic) {
          jsonA = {
            "listTitle": title || '',
            "id": id || '',
            "listContent": content || '',
            "publishTime": createdAt || '',
            "listPic": _url || '',
            "likes": likeNum,
            "comments": commentNum,
            "is_liked": isLike || '',
          }
        }
        else {
          jsonA = {
            "listTitle": title || '',
            "id": id || '',
            "listContent": content || '',
            "publishTime": createdAt || '',
            "listPic": _url || '',
            "likes": likeNum,
            "comments": commentNum,
            "is_liked": isLike || '',
          }
        }

        molist.push(jsonA)			//具体信息存入数组
      }
      that.onSetData(molist, that.data.currentPage);

    }).catch(error => {
      common.dataLoading(error, "loading");
      // that.setData({
      //   loading: true
      // })
      console.log(error)
    })
  });
 
}
//获取数据表信息
function getReturn(that, value, user) {
  if (that.data.isEmpty === false) {
    return;
  }
  var userid;
  that.setData({
    loading: false
  });
  var molist = new Array();
  wx.getStorage({     //从缓存中获取当前用户ID
    key: 'user_id',
    success: function (res) {
      userid = res.data;
    },
  })
  var query = Bmob.Query('tucao');
  if (user)
    query.equalTo("publisher", "==", user);
  //条件查询
  query.equalTo("type", "==", value);
  query.order("-createdAt");
  query.limit(that.data.page);			//设置获取数据的数量	
  query.skip(that.data.page * that.data.currentPage);	//跳过已显示的发布内容

  //query.include("publisher");
  // 查询数据，将其存入数组中，并在页面上显示
  query.find().then(results => {
    for (var i = 0; i < results.length; i++) {
      var title = results[i].title;			//标题
      var content = results[i].content;		//内容
      var createdAt = results[i].createdAt;	//发布时间	
      var id = results[i].objectId;		//内容ID
      var _url;
      var likeNum = results[i].likeNum;	//关注该内容的用户数量
      var commentNum = results[i].commentNum;		//评论数量
      var pic = results[i].picture;		//发布的图片
      if (pic) {
        _url = results[i].picture;
      }
      else {
        _url = null;
      }
      var liker = results[i].liker;		//关注该内容的用户列表
      var isLike = 0;
      for (var j = 0; j < liker.length; j++) {
        if (liker[j] == userid) {
          isLike = 1;
          break;
        }
      }
      var jsonA;
      if (pic) {
        jsonA = {
          "listTitle": title || '',
          "id": id || '',
          "listContent": content || '',
          "publishTime": createdAt || '',
          "listPic": _url || '',
          "likes": likeNum,
          "comments": commentNum,
          "is_liked": isLike || '',
        }
      }
      else {
        jsonA = {
          "listTitle": title || '',
          "id": id || '',
          "listContent": content || '',
          "publishTime": createdAt || '',
          "listPic": _url || '',
          "likes": likeNum,
          "comments": commentNum,
          "is_liked": isLike || '',
        }
      }

      molist.push(jsonA)
    }
    that.onSetData(molist, that.data.currentPage);//设置页面参数

  }).catch(error => {
    common.dataLoading(error, "loading");
    console.log(error)
  })
}
