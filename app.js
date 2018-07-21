//app.js
var Bmob=require("utils/bmob.js");
var common=require("utils/common.js");
Bmob.initialize("", "");      //设置Application Id和Rest API Key
const app=getApp();
var bgc;
try{bgc = wx.getStorageSync("backgroundcolor")}
catch(e){bgc="#87cefa"}
App({
  globalData:{
    backgroundcolor: bgc
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: this.globalData.backgroundcolor
    })
    wx.setTabBarStyle({
      backgroundColor: this.globalData.backgroundcolor
    })
    var openid
    // 获取用户信息
    wx.login({
      success: function (res) {
        if(res.code){
          //console.log(res.code)
          Bmob.User.requestOpenId(res.code).then(result=>{
              openid=result.openid
              console.log(result.openid)
              Bmob.User.login(openid, openid).then(res=>{
                console.log(res)
                wx.setStorage({
                  key: 'user_id',
                  data: res.objectId
                })
              }).catch(err=>{
                console.log(err)
                if(err.code=='101'){
                  let params = {
                    username: openid,
                    password: openid,
                    email: openid+'@bmob.cn',
                    phone: '13711166567',
                  }
                  Bmob.User.register(params).then(res1=>{
                      console.log(res1)
                      Bmob.User.login(openid, openid).then(res => {
                        console.log(res)
                        wx.setStorage({
                          key: 'user_id',
                          data: res.objectId
                        })
                      })
                  }).catch(err2=>{
                      console.log(err2)
                  });
                }
             });
          }).catch(
            error => {
              // Show the errormessage somewhere
              console.log("Error:" + error.code + " " + error.message);
            }
            );
      } else {
          console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
  }
})