//index.js
//获取应用实例
const app = getApp()
var network = require("../../utils/network.js")
Page({
  data: {
    cardH: '',
    secret: '',
    textValue: '请输入兑换码',
    show: 'hidden',
  },
  //事件处理函数
  dhmInput: function (e) {
    this.setData({
      secret: e.detail.value
    })
    this.setData({
      show: 'hidden'
    })
  },
  focusInput: function () {
    this.setData({
      show: 'hidden'
    })
  },
  exchange: function () {
    var that = this
    if (that.data.secret == '') {
      that.setData({
        show: 'visible'
      })
    } else {
      var params = new Object()
      params.secret = that.data.secret
      network.POST({
        url: '/m/gift_card',
        params: params,
        success: function (res) {
          if (res.data.ret == true) {
            app.globalData.promoter_id = res.data.data.promoter_id;
            app.globalData.type = res.data.data.type;
            app.globalData.secret = res.data.data.secret

            wx.navigateTo({
              url: '../receive/receive'
            })
          } else {
            that.setData({
              textValue: res.data.error,
              show: 'visible'
            })
          }
        },
        fail: function () {
          //失败后的逻辑  
        },
      })
    }
  },
  onLoad: function () {
    var that = this
    // 获取header背景的高度
    var obj = wx.createSelectorQuery();
    obj.selectAll('.receive_card').boundingClientRect(function (rect) {
      that.setData({
        cardH: (rect[0].width) * 0.832 + 'px',
      });
    })
    obj.exec();
  }
})