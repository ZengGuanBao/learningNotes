const generalMember = {
  list: [{
    pagePath: '/pages/index/index',
    iconPath: '../assets/images/tabBar/home_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/home_icon.png',
    text: '首页'
  }, {
    pagePath: '/pages/member/member',
    iconPath: '../assets/images/tabBar/member_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/member_on_icon.png',
    text: '会员'
  }, {
    pagePath: '/pages/personal/personal',
    iconPath: '../assets/images/tabBar/my_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/my_icon.png',
    text: '我的'
  }]
}

const superMember = {
  list: [{
    pagePath: '/pages/index/index',
    iconPath: '../assets/images/tabBar/home_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/home_icon.png',
    text: '首页'
  }, {
    pagePath: '/pages/superMemberCenter/superMemberCenter',
    iconPath: '../assets/images/tabBar/member_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/member_on_icon.png',
    text: '会员'
  }, {
    pagePath: '/pages/personal/personal',
    iconPath: '../assets/images/tabBar/my_no_icon.png',
    selectedIconPath: '../assets/images/tabBar/my_icon.png',
    text: '我的'
  }]
}

module.exports = {
  generalMemberData: generalMember,
  superMemberData: superMember
}
