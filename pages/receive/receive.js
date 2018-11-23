var network = require("../../utils/network.js")
const app = getApp()
// pages/receive/receive.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile:'',
    mobile_err:'',
    showVideo:false,
    movies:[
      {
        // url: '../../images/yiduiyi@2x.png',
        url:'http://d.www.kuaipeilian.com/img/yiduiyi.png',
        title: '在线一对一陪练',
        str_1: '确保高质量练琴效果',
        str_2: ''
      },
      {
        // url: '../../images/shujufenxi@2x.png',
        url:'http://d.www.kuaipeilian.com/img/shujufenxi.png',
        title: '大数据分析',
        str_1: '实时跟进练琴进度',
        str_2: '练习效果看得见'
      },
      {
        // url:'../../images/shizifengfu@2x.png',
        url: 'http://d.www.kuaipeilian.com/img/shizifengfu.png',
        title:'师资丰富',
        str_1:'体验来自专业音乐院校',
        str_2:'教师的1对1授课'
      },
      {
        // url:'../../images/jiaoxuefuwu@2x.png',
        url:'http://d.www.kuaipeilian.com/img/jiaoxuefuwu.png',
        title: '优质的教学服务',
        str_1: '课程顾问+班主任+教师',
        str_2: '3对1式服务'
      }
    ],
    animation1:'',
    animation2:'',
    animation3:'',
    animation4:'',
    animations: [],
    touchDot: '',
    done: false,
    time: 0,
    container: [], //记录当前5个位置为哪5个item，理解为5个容器
    curPos: 2, //记录当前显示位置是第几个容器（从0开始）
    zindex: [0, 10, 100, 10], //与container中的对应
    curIndex: 1,//从显示位置的item在clubs中的index
    postions: [0, 1, 2, 3],//container中4个容器所在位置
    opacities: [0, 0.8, 1, 0.8],
    imgWidth:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.promoter_id) {
      app.globalData.promoter_id = options.promoter_id
    }
    if (options.q) {
      var url = decodeURIComponent(options.q)
      var id = url.split('=');
      var promoter_id = id[1];
      app.globalData.promoter_id = promoter_id
    }

    var that = this
     // 获取header背景的高度
    var obj = wx.createSelectorQuery(); 
    obj.selectAll('.receive_card').boundingClientRect(function (rect) { 
        that.setData({
          cardH: (rect[0].width) * 0.832 + 'px',
          imgWidth: rect[0].width * 0.715 +'px'
        });
      })
    obj.exec();
  //test----------
  this.setPos(2,1)
    //初始化到正确的位置
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;

    this.animation1.translateX('0%').opacity(0).scale(0).step();
    this.animation2.translateX('-125%').opacity(0.4).scale(0.8).step();
    this.animation3.translateX('-200%').opacity(1).scale(1).step();
    this.animation4.translateX('-275%').opacity(0.4).scale(0.8).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
    })

  },
  setPos: function (pos, index) {
    // POS CONTAINER AREA;INDEX movies INDEX
    let container = [];
    let p2 = pos;
    let p1 = this.findPrePos(p2);
    let p0 = this.findPrePos(p1);
    let p3 = this.findNextPos(p2);
    let i2 = index;
    let i1 = this.findPreIndex(i2);
    let i0 = this.findPreIndex(i1);
    let i3 = this.findNextIndex(i2);
    
    container[p0] = this.data.movies[i0];
    container[p1] = this.data.movies[i1];
    container[p2] = this.data.movies[i2];
    container[p3] = this.data.movies[i3];
   
    this.setData({
      container: container
    })
  },
  /**
   * container中的位置
   */
  findNextPos: function (pos) {
    if (pos != 3) {
      return pos + 1;
    }
    return 0;

  },
  findPrePos: function (pos) {
    if (pos != 0) {
      return pos - 1;
    }
    return 3;
  },
  findNextIndex(index) {
    if (index != this.data.movies.length - 1) {
      return index + 1;
    }
    return 0;
  },
  findPreIndex(index) {
    if (index != 0) {
      return index - 1;
    }
    return this.data.movies.length - 1;
  },
  findNewDistance(newPos, index) {
    let newDistances = [];
    switch (newPos) {
      case 0:
        newDistances = [0 - 100 * index + '%', 0, 0];
        break;
      case 1:
        newDistances = [-25 - 100 * index + '%', 0.4, 0.8];
        break;
      case 2:
        newDistances = [0 - 100 * index + '%', 1, 1];
        break;
      case 3:
        newDistances = [25 - 100 * index + '%', 0.4, 0.8];
        break;
    }
    return newDistances;
  },
  setNewZindex(newPos) {
    let zindexes = [];
    zindexes[newPos] = 100;
    let nextPos = this.findNextPos(newPos);
    zindexes[nextPos] = 10;
    let nnextPos = this.findNextPos(nextPos);
    zindexes[nnextPos] = 0;
    let prePos = this.findPrePos(newPos);
    zindexes[prePos] = 10;
    let pprePos = this.findPrePos(prePos);
    zindexes[pprePos] = 0;
    this.setData({
      zindex: zindexes
    })
  },
  goPre:function(){
    let container = this.data.container;
    let oldPos = this.data.curPos;
    let newPos = oldPos == 0 ? 3 : oldPos - 1;
    let newIndex = this.findPreIndex(this.data.curIndex);
    //先滑动，再赋值
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;

    let distances = [];
    let newPostions = [];
    let newOpacities = [];
    //用新位置找位移量
    for (let i = 0; i < container.length; i++) {
      let newPos = this.findNextPos(this.data.postions[i]);
      let distance = this.findNewDistance(newPos, i);
      distances.push(distance);
      newPostions.push(newPos);
      newOpacities.push(distance[1]);
    }

    this.animation1.translateX(distances[0][0]).opacity(distances[0][1]).scale(distances[0][2]).step();
    this.animation2.translateX(distances[1][0]).opacity(distances[1][1]).scale(distances[1][2]).step();
    this.animation3.translateX(distances[2][0]).opacity(distances[2][1]).scale(distances[2][2]).step();
    this.animation4.translateX(distances[3][0]).opacity(distances[3][1]).scale(distances[3][2]).step();

    this.setData({
      opacities: newOpacities,
      postions: newPostions,
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
    })
    //赋值

    this.setPos(newPos, newIndex)
    this.setNewZindex(newPos)
    this.setData({
      curPos: newPos,
      curIndex: newIndex,
    })
  },
  goNext:function(){
    let container = this.data.container;
    let oldPos = this.data.curPos;
    let newPos = oldPos==3?0:oldPos+1;
    let newIndex = this.findNextIndex(this.data.curIndex);

    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;

    let distances = [];
    let newPostions = [];
    let newOpacities = [];
    //用新位置找位移量
    for (let i = 0; i < container.length; i++) {
      let newPos = this.findPrePos(this.data.postions[i]);
      let distance = this.findNewDistance(newPos, i);
      distances.push(distance);
      newPostions.push(newPos);
      newOpacities.push(distance[1]);
    }
    this.animation1.translateX(distances[0][0]).opacity(distances[0][1]).scale(distances[0][2]).step();
    this.animation2.translateX(distances[1][0]).opacity(distances[1][1]).scale(distances[1][2]).step();
    this.animation3.translateX(distances[2][0]).opacity(distances[2][1]).scale(distances[2][2]).step();
    this.animation4.translateX(distances[3][0]).opacity(distances[3][1]).scale(distances[3][2]).step();
    
    this.setData({
      opacities: newOpacities,
      postions: newPostions,
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
    })
    //赋值

    this.setPos(newPos, newIndex)
    this.setNewZindex(newPos)
    this.setData({
      curPos: newPos,
      curIndex: newIndex,
    })

  },
  //触摸开始事件
  touchstart: function (e) {
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function (e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;

    //向左滑动
    if (touchMove - touchDot <= -40 && time < 10 && !this.data.done) {
      this.data.done = true;
      this.goNext();
    }
    //向右滑动
    if (touchMove - touchDot >= 40 && time < 10 && !this.data.done) {
      this.data.done = true;
      this.goPre();
    }
  },
  //触摸结束事件
  touchend: function (e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  showPlay:function(){
    this.setData({
      showVideo:true
    })
  },
  mobileFocus:function(e){
    this.setData({
      mobile_err: ''
    })
  },
  mobileInput:function(e){
    // if(e.detail.value.length==11){
    //   this.setData({
    //     mobile_err: ''
    //   })
    // }
    this.setData({
      mobile:e.detail.value
    })
  },
  showDialogBtn:function(){
    console.log(app.globalData.type)
    let reg =/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

    if (!reg.test(this.data.mobile)){
        this.setData({
          mobile_err:'请输入有效的手机号'
        })
        return false;
    }
    let that = this;
    var params = new Object()
    params.mobile = that.data.mobile
    params.promoter_id = app.globalData.promoter_id
    params.type = app.globalData.type
    params.secret = app.globalData.secret
    console.log(params, app.globalData)
    network.POST({
      url: '/m/gift_login',
      params: params,
      success: function (res) {
        if (res.data.ret == true) {
          wx.navigateTo({
            url: '../result/result'
          })
        } else {
          that.setData({
            mobile_err: res.data.error,
          })
        }
      },
      fail: function () {
        //失败后的逻辑  
      },
    })


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})