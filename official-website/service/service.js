const axios =require('axios')
const config = require('../config')

/** 获取文章详情 */
let getArticleDetail = (ctx, next) => {
    return axios.get(config.serverApiUrl + '/qmwallet-app/article/detail/' + ctx.params.id, {
        params: ctx.params
    })
}

module.exports = { getArticleDetail }
