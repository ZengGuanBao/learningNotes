/**
 * Created by zhouxin on 2018/11/27.
 */
//请求的业务域名地址，即H5的后端接口地址
var constants = function () {
};
/**
 * webview嵌入的页面路径
 * test1:https://m.s2btest.kstore.shop
 * test2:https://m.s2btest2.kstore.shop
 * test3:https://m.s2btest3.kstore.shop
 * online:https://m.s2b.wanmi.com
 */
constants.WebviewUrl = 'http://m.sbcmall.hzed.net';
/**   
 * h5后台bff接口host
 * test1:https://mbff.s2btest.kstore.shop
 * test2:https://mbff.s2btest2.kstore.shop
* test3:https://mbff.s2btest3.kstore.shop 
 * online:https://mbff.s2b.wanmi.com
 */
constants.InterfaceUrl = 'http://mbff.sbcmall.hzed.net';
/**
 * 测试环境：wx6497fa5d6beeb834
 * 线上环境：wxa92124c93695d93f
 * 此处修改不起作用，要在project.config.json里面做修改
 */
constants.appId = 'wx873cdb6f853ab44b'

module.exports = constants;