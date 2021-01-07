module.exports = function errorHandler () {
    return async (ctx, next) => {
        await next()
        if(parseInt(ctx.status) === 404 ){
            await ctx.render('error/404')
        } else if (parseInt(ctx.status) === 500) {
            await ctx.render('error/500')
        }
    }
}
