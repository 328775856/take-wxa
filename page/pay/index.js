// page/pay/index.js
var app = getApp()
var api = require('../../library/api.js')('default', true)
var thisPage = {

  /**
   * 页面的初始数据
   */
  data: {
    active: true,
    fold: false,
    len: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var the = this
    this.setData({
      order_sn: options.order,
      tsn: options.tsn
    })
    api.GET('/api/order-inquiry.api', {
      sn: options.order
    }).then((res) => {
      console.log(res)
      if (res.error === '0') {
        the.setData(res.data)
        the.setData({ len: the.data.list.length })
      }
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  purchase: function () {
    if (this.data.surplus > 0) {
      this.weixinPay()
    } else {
      this.balancePay()
    }
  },
  balancePay: function () {
    var the = this
    api.POST('/api/order-purchase', { sn: this.data.order_sn })
      .then((res) => {
        wx.showToast({
          title: '支付成功',
        })
        the.redirect(the.data.tsn)
      }, (res) => {
        wx.showModal({
          title: '支付失败',
          content: res.message,
          showCancel: false
        })
      })
  },
  weixinPay: function () {
    var the = this
    api.POST('/api/order-prepay-wxa', { sn: this.data.order_sn })
      .then((res) => {
        res.data.success = (res) => {
          wx.showToast({
            title: '支付成功',
          })
          the.redirect(the.data.tsn)
        }
        res.data.fail = (res) => {
          if (res.errMsg === 'requestPayment:fail cancel') {
            wx.showToast({
              title: '取消支付',
            })
          } else {
            wx.showModal({
              title: '支付失败',
              content: res.errMsg,
              showCancel: false
            })
          }
        }
        wx.requestPayment(res.data)
      }, (res) => {
        wx.showModal({
          title: '下单失败',
          content: res.message,
          showCancel: false
        })
      })
  },
  redirect: function (tsn) {
    if (tsn.indexOf('L') === 0) {
      var target = encodeURIComponent(`${app.config.studentUrl}/lesson-auto?lesson_sn=${tsn}`)
      wx.redirectTo({
        url: `/page/web/view?target=${target}`,
      })
    } else if (tsn.indexOf('S') === 0) {
      var target = encodeURIComponent(`${app.config.studentUrl}/series-auto?series_sn=${tsn}`)
      wx.redirectTo({
        url: `/page/web/view?target=${target}`,
      })
    } else {
      wx.navigateBack({
      })
    }
  },
  active: function () {
    this.setData({
      active: !this.data.active,
      fold: !this.data.fold
    });
  },
  cancel: function () {
    wx.redirectTo({
      url: '../../page/web/view'
    })
  },

}
Page(thisPage)
