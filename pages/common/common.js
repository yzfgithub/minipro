//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardH: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    // 获取header背景的高度
    var obj = wx.createSelectorQuery();
    obj.selectAll('.receive_card').boundingClientRect(function (rect) {
      that.setData({
        cardH: (rect[0].width) * 0.832 + 'px',
      });
      console.log(rect[0].height)
      console.log(rect[0].width)
    })
    obj.exec();

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
