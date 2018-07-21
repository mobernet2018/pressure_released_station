
//获取应用实例
var app = getApp()
var that;
var optionId;
var common = require('../listtemplate/getCode.js')
var Bmob = require("../../utils/bmob.js");
var commentlist;
Page({
  data: {
    limit: 5,
    showImage: false,      //是否有图片
    loading: false,
    isdisabled: false,
    commentLoading: false,    //评论显示
    isdisabled1: false,
    //recommentLoading: false,
    commentList: [],
    agree: 0
  },

  onLoad: function (options) {
    that = this;
    optionId = options.moodId;

  },
  onReady: function () {
    wx.hideToast()

  },
  onShow: function () {
    var myInterval = setInterval(getReturn, 500);
    function getReturn() {     //获取数据库里数据
      wx.getStorage({
        key: 'user_id',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            var query = Bmob.Query('tucao');
            query.equalTo("objectId","==", optionId);
            query.find().then(result=>{
                var title = result[0].title;
                var content = result[0].content;
                var agreeNum = result[0].likeNum;
                var commentNum = result[0].commentNum;
                var liker = result[0].liker;
                var objectIds = result[0].publisher;
                var url;
                if (result[0].picture) {
                  url = result[0].picture;
                }
                else {
                  url = null;
                }
                that.setData({
                  listTitle: title,
                  listContent: content,
                  listPic: url,
                  agreeNum: agreeNum,
                  commNum: commentNum,
                  objectIds: objectIds,
                  loading: true
                })
                for (var i = 0; i < liker.length; i++) {
                  var isLike = 0;
                  if (liker[i] == ress.data) {
                    isLike = 1;
                    that.setData({
                      agree: isLike
                    })
                    break;
                  }

                }
                that.commentQuery(result[0]);

              }).catch(error=> {
                that.setData({
                  loading: true
                })
                console.log(error)
              })
            }
          }
      })

    }

  },
  commentQuery: function (mood) {
    // 查询评论
    commentlist = new Array();
    var queryComment = Bmob.Query('Comments');
    queryComment.equalTo("tucao",'==', mood.objectId);
    //queryComment.include("publisher");
    queryComment.order("createdAt");
    queryComment.find().then(result=> {
        for (var i = 0; i < result.length; i++) {
          var id = result[i].objectId;
          var pid = result[i].olderComment;
          var uid = result[i].publisher;
          var content = result[i].content;
          var created_at = result[i].createdAt;
          var cnumber=result[i].cnumber;
          var oldercnumber;
          var olderUserName;
          if (pid) {
            pid = pid.id;
            olderUserName = result[i].olderUserName;
            oldercnumber=result[i].oldercnumber;
          }
          else {
            pid = 0;
            olderUserName = "";
          }
          var jsonA;
          jsonA = '{"id":"' + id + '","content":"' + content + '","pid":"' + pid + '","uid":"' + uid + '","created_at":"' + created_at + '","pusername":"' + olderUserName + '","cnumber":"' + cnumber + '","oldercnumber":"' + oldercnumber +'"}';
          var jsonB = JSON.parse(jsonA);
          commentlist.push(jsonB)
          that.setData({
            commentList: commentlist,
            loading: true
          })
        }
    }).catch(error=>{
      common.dataLoading(error, "loading");
      console.log(error)
    })
  },
  onShareAppMessage: function () {

  },
  changeLike: function (event) {        //改变关注状态
    var isLike = that.data.agree
    var likeNum = parseInt(this.data.agreeNum)
    if (isLike == "0") {
      likeNum = likeNum + 1;
      that.setData({
        agree: 1,
        agreeNum: likeNum
      })

    }
    else if (isLike == "1") {
      likeNum = likeNum - 1;
      that.setData({
        agree: 0,
        agreeNum: likeNum
      })
    }
    wx.getStorage({      //查询当前用户是否关注该内容
      key: 'user_id',
      success: function (ress) {
        var queryLike = Bmob.Query('tucao');
        queryLike.equalTo("objectId",'==', optionId);
        queryLike.find().then(result=>{			//查询关注该内容的用户
            var likerArray = result[0].liker;
            var stype=result[0].type;
            var isLiked = false;
            if (likerArray.length > 0) {
              for (var i = 0; i < likerArray.length; i++) {	//查看当前用户是否在关注该内容的用户列表中
                if (likerArray[i] == ress.data) {
                  likerArray.splice(i, 1);
                  isLiked = true;
                  queryLike.get(optionId).then(res => {
                    console.log(res)
                    res.set('likeNum', result[0].likeNum - 1)
                    res.set('liker', likerArray)
                    res.save()
                  }).catch(err => {
                    console.log(err)
                  })
                  var query=Bmob.Query('_User');
                  query.get(ress.data).then(res=>{
                    if(stype==1){
                      res.remove('tucao_like',[optionId])
                    }else if(stype==2){
                      res.remove('pour_like',[optionId])
                    }
                    res.save();
                  })
                  break;
                }
              }
              if (isLiked == false) {

                likerArray.push(ress.data);
                queryLike.get(optionId).then(res => {
                  console.log(res)
                  res.set('likeNum', result[0].likeNum + 1)
                  res.set('liker',likerArray)
                  res.save()
                }).catch(err => {
                  console.log(err)
                })
                var query = Bmob.Query('_User');
                query.get(ress.data).then(res => {
                  if(stype==1){
                    res.addUnique('tucao_like', [optionId])
                  }else if(stype==2){
                    res.addUnique('pour_like',[optionId])
                  }
                  res.save();
                })
              }
            }
            else {
              likerArray.push(ress.data);
              queryLike.get(optionId).then(res => {
                console.log(res)
                res.set('likeNum', result[0].likeNum + 1)
                res.set('liker', likerArray)
                res.save()
              }).catch(err => {
                console.log(err)
              })
              var query = Bmob.Query('_User');
              query.get(ress.data).then(res => {
                if (stype == 1) {
                  res.addUnique('tucao_like', [optionId])
                } else if (stype == 2) {
                  res.addUnique('pour_like', [optionId])
                }
                res.save();
              })
            }
        }).catch(error=>{
            console.log(error)
        })
      }
    })
  },
  changeComment: function () {
    that.setData({
      autoFo: true
    })
  },
  changeFocus: function () {
    that.setData({
      autoFo: true
    })
  },
  toResponse: function (event) {//去回复
    var commentId = event.target.dataset.id;
    var userId = event.target.dataset.uid;
    var name = event.currentTarget.dataset.cnumber;
    if (!name) {
      name = "";
    }
    if (userId == wx.getStorageSync('user_id')) {
      common.dataLoading("不能对自己的评论进行回复", "loading");
    }
    else {
      var toggleResponse;
      if (that.data.isToResponse == "true") {
        toggleResponse = false;
      }
      else {
        toggleResponse = true;
      }
      that.setData({
        pid: commentId,
        isToResponse: toggleResponse,
        plaContent: "回复" + name + "楼:",
        responseName: userId,
        oldercnumber:name
      })
    }

  },
  hiddenResponse: function () {
    this.setData({
      isToResponse: false
    })
  },
 
  publishComment: function (e) {//评论
    if (e.detail.value.commContent == "") {
      common.dataLoading("评论内容不能为空", "loading");
    }
    else {
      that.setData({
        isdisabled: true,
        commentLoading: true
      })


      wx.getStorage({     //获取评论内容
        key: 'user_id',
        success: function (ress) {
          that.setData({
            commentLoading: false
          })
          // 查询成功，调用get方法获取对应属性的值
          var comment = Bmob.Query("Comments");
          comment.set("publisher", ress.data);
          comment.set("tucao", optionId);
          comment.set("content", e.detail.value.commContent);
          comment.set("cnumber",commentlist.length+1);
          if (that.data.isToResponse) {
            var olderName = that.data.responseName;
            comment.set("olderUserName", olderName);
            comment.set("olderComment", that.data.pid);
            comment.set("oldercnumber",parseInt(that.data.oldercnumber))
          }
          //添加数据，第一个入口参数是null
          comment.save().then(res => {
            that.onShow();
            that.setData({
              publishContent: "",
              isToResponse: false,
              responeContent: "",
              isdisabled: false,
              commentLoading: false
            })
            var query=Bmob.Query('tucao');
            query.get(optionId).then(res=>{
              res.set('commentNum', commentlist.length + 1)
              res.save()
            })
          }).catch(err=>{
            that.setData({
              publishContent: "",
              isToResponse: false,
              responeContent: "",
              isdisabled: false,
              commentLoading: false
            })
          })
        },
          error: function (gameScore, error) {
            common.dataLoading(error, "loading");
              that.setData({
                publishContent: "",
                isToResponse: false,
                responeContent: "",
                isdisabled: false,
                commentLoading: false
              })
          }
        })
      }
  },
  bindKeyInput: function (e) {
    this.setData({
      publishContent: e.detail.value
    })
  },
  onHide: function () {
    // Do something when hide.
  },
  onUnload: function (event) {

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  seeBig: function (e) {     //点击看大图
    wx.previewImage({
      current: that.data.listPic, // 当前显示图片的http链接
      urls: [that.data.listPic] // 需要预览的图片http链接列表
    })
  }
})
