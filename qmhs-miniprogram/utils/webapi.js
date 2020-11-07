const http = require('./http')

module.exports = {
  // 登录
  login: (params) => http.post('/third/wechat/mini/login', params),
  // 获取sessionKey
  getSessionKey: (params) => http.get('/third/wechat/getSessionKey/' + params.code),
  // 小程序短信验证码登录
  smsLoginWithRegister: (params) => http.post('/mini/sms/loginWithRegister', params),
  // 查询手机号关联微信状态信息
  getRelatedStatusByPhone: (params) => http.post('/third/wechat/getRelatedStatusByPhone', params),
  // 小程序微信登录
  quickWxLogin: (params) => http.post('/third/wechat/mini/quickLogin', params),
  // 短信验证码登录
  quickSmsLogin: (params) => http.post('/mini/sms/quicklyLogin', params),
  // 小程序微信登录
  wxLoginWithRegister: (params) => http.post('/third/wechat/mini/loginWithRegister', params),
  // 发送短信登录验证码
  sendSmsLoginVerifyCode: (params) => http.post('/sms/loginByPhone/sendSmsVerifyCode', params),
  // 发送短信绑定手机号验证码
  sendSmsBindVerifyCode: (params) => http.post('/sms/loginByWechat/sendSmsVerifyCode', params),
  // 根据customerId获取从小程序端登录的登录
  getUserInfo: () => http.get('/third/getCurrentLoginInfo'),
  // 根据邀请码获得邀请人基本信息
  getInviterInfo: (params) => http.post('/third/getInviteInfo', params),
  // 广告位信息查询
  getAdvertsList: (params) => http.post('/homepage/adverts/list', params),
  // 10个icon导航栏信息查询
  getNavigationList: (params) => http.get('/homepage/navigation/list', params),
  // 主题信息 1.获取主题ID列表 2.获取主题下商品列表
  getThemeIdDefault: (params) => http.get('/homepage/theme/default', params),
  getThemeId: (params) => http.post('/homepage/theme/getById', params),
  getThemeGoodsPage: (params) => http.post('/homepage/theme/goods/page', params),
  // 京东精选商品 eliteId:1-好券商品,2-超级大卖场,10-9.9专区,22-热销爆品,23-为你推荐,24-数码家电,25-超市,26-母婴玩具,27-家具日用,28-美妆穿搭,29-医药保健,30-图书文具,31-今日必推,32-品牌好货,33-秒杀商品,34-拼购商品,109-新品首发,110-自营,125-首购商品,129-高佣榜单,130-视频商品
  getJingFanGoods: (params) => http.post('/thridgoods/getJingFanGoods', params),
  // 拼多多精选商品
  getPDDRecommendGoods: (params) => http.post('/thridgoods/getPDDRecommendGoods', params),
  // 第三方商品分页查询
  getPage: (params) => http.post('/thridgoods/page', params),
  // 第三方商品详情
  getDetail: (params) => http.post('/thridgoods/detail', params),
  // 分享商品，生成小程序码,获取分享商品进来小程序码参数
  getShareGoodsCode: (params) => http.post('/thridgoods/shareGoods', params),
  getShareGoodsParameters: (params) => http.post('/thridgoods/getShareGoodsParameters', params),
  // 生成邀请注册小程序码
  getInviteWxaCode: (params) => http.post('/member/getInviteWxaCode', params),
  getGoodsByThirdShare: (params) => http.get('/thridgoods/getGoodsByThirdShareIdInMiniProgram', params),
  // 获取巨划算商品 1.列表 2.详情
  getJhsGoodsPage: (params) => http.post('/goods/page', params),
  getJhsGoodsDetail: (params) => http.post('/goods/detail', params),
  // 发圈必推 1.查询素材类型和小编信息 2.发圈必推分页查询
  getMustpushInfo: (params) => http.get('/mustpush/queryMateriaAndEditor', params),
  getMustpushPage: (params) => http.post('/mustpush/page', params),
  // 优惠券信息 1.优惠券分页查询 2.优惠券详情
  getCouponPage: (params) => http.post('/coupon/page', params),
  getCouponDetail: (params) => http.post('/coupon/detail', params),
  // 获取推广链接
  getCustomerPromotionUrl: (params) => http.post('/customer/customerPromotionUrl', params),
  // 全民大学
  getUniversityPage: (params) => http.post('/national/university/page', params),
  // 兑换码控制层
  getWriteOffRedemptionCode: (params) => http.post('/customer/writeOffRedemptionCode', params),
  // 获取巨划算订单列表
  getJhsGoodsList: (params) => http.post('/goods/page', params),
  // 查询客户默认收货地址
  getAddressInfo: () => http.get('/customer/addressinfo'),
  // 查询第三方或巨划算订单列表
  getOrderList: (params) => http.post('/order/page', params),
  // 查询巨划算订单详情
  getOrderDetail: (params) => http.post('/jhs/order/detail', params),
  // 提交订单
  commitOrder: (params) => http.post('/jhs/order/commit', params),
  // 小程序内JSApi支付统一下单接口
  wxPayCheckOrder: (params) => http.post('/wxPayUnifiedorderForLittleProgram', params),
  // 确认收货
  confirmReceipt: (params) => http.post('/jhs/order/confirmReceipt', params),
  // 物流查询
  getDeliveryInfos: (params) => http.post('/deliveryInfos ', params),
  // 根据地址id查询客户收货地址详情
  getAddressInfoById: (params) => http.get('/customer/address/' + params.id),
  // 修改客户收货地址
  modifyAddress: (params) => http.put('/customer/addressInfo', params),
  // 保存客户收货地址
  saveAddress: (params) => http.post('/customer/saveAddress', params),
  // 获取提现和收益明细
  getWithdrawAndIncomeDetail: () => http.get('/member/withdrawAndIncomeDetail'),
  // 获取活跃任务信息
  getActiveTaskDetail: () => http.get('/member/getActiveTaskDetail'),
  // 获取花粉会员信息
  getFansAndMemberDetail: () => http.get('/member/getFansAndMemberDetail'),
  // 获取直邀的花粉会员信息列表(directCustomerType会员类型)
  getDirectCustomerList: (params) => http.post('/member/getDirectCustomerList', params),
  // 用户提现相关信息
  getWithdrawInfo: () => http.get('/withdrawRecord/detail'),
  // 奖励列表(rewardType奖励类型，0-推广收入，1-平台奖励)
  getIncomeRecord: (params) => http.post('/bonus/list', params),
  // 提现记录列表
  getWithdrawRecord: (params) => http.get('/withdrawRecord/list', params),
  // 提现发送短信验证码
  sendSmsVerifyCode: () => http.post('/withdrawRecord/sendSmsVerifyCode'),
  // 收入明细列表(rewardType奖励类型，0-推广收入，1-平台奖励)
  incomeDetailList: (params) => http.post('/bonus/incomeDetailList', params),
  // 获取最近六个月日期列表
  getMonthList: () => http.post('/bonus/getMonthList'),
  // 统计会员推广收益
  statisticsPopularize: () => http.post('/bonus/statisticsPopularize'),
  // 根据月份统计已经结算的平台奖励
  statisticsIsSettlement: (params) => http.post('/bonus/statisticsIsSettlement', params),
  // 根据月份统计销售数据
  statisticsSaleByMonth: (params) => http.post('/bonus/statisticsSaleByMonth', params),
  // 申请提现
  applyWithdraw: (params) => http.post('/withdrawRecord/applyWithdraw', params),
  // 更新用户实名信息
  authentication: (params) => http.post('/member/updateCustomerAuthentication', params),
  // 根据用户id查找银行卡信息
  findByCustomerId: () => http.post('/bankcard/findByCustomerId'),
  // 校验银行卡号并返回银行名称
  checkCardNo: (params) => http.post('/bankcard/checkCardNo', params),
  // 保存或更新用户银行卡信息
  bankSaveOrUpdate: (params) => http.post('/bankcard/saveOrUpdate', params),
  // 获取是否实名认证状态
  getAuthenticationStatus: () => http.get('/member/getAuthenticationStatus'),
}
