const router = require('koa-router')()
const apiService = require('../service/service')

router.get(['/', '/index.html'], async (ctx, next) => {
  await ctx.render('index')
})

router.get('/aboutUs.html', async (ctx, next) => {
    await ctx.render('aboutUs')
})

router.get('/productIntroduction.html', async (ctx, next) => {
    await ctx.render('productIntroduction')
})

router.get('/companyDynamics/index.html', async (ctx, next) => {
    await ctx.render('companyDynamics/index')
})

router.get(['/companyDynamics/detail/:type/:id.html', '/companyDynamics/detail/:id.html'], async (ctx, next) => {
    ctx.params.type = ctx.params.type ? ctx.params.type : ''
    try {
        const res = await apiService.getArticleDetail(ctx, next)
        if (res.data && res.data.code === 0 && res.data.data) {
            let preArticleUrl,nextArticleUrl

            if (ctx.params.type) {
                preArticleUrl = res.data.data.preArticle ? '../../detail/' + ctx.params.type +'/' + res.data.data.preArticle.id + '.html' : null
                nextArticleUrl = res.data.data.nextArticle ? '../../detail/' +  ctx.params.type +'/' + res.data.data.nextArticle.id + '.html' : null
            } else {
                preArticleUrl = res.data.data.preArticle ? '../detail/' + res.data.data.preArticle.id + '.html': null
                nextArticleUrl = res.data.data.nextArticle ? '../detail/' + res.data.data.nextArticle.id + '.html' : null
            }
            await ctx.render('companyDynamics/detail', {
                articleDetail: res.data.data,
                preArticleUrl,
                nextArticleUrl
            })
        } else {
            await ctx.render('error/404')
        }
    } catch (e) {
        await ctx.render('error/500')
    }

})

router.get('/404.html', async (ctx, next) => {
    await ctx.render('error/404')
})

router.get('/500.html', async (ctx, next) => {
    await ctx.render('error/500')
})

module.exports = router
