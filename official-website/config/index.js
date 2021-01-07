const development_env = require('./dev')
const test_env = require('./test')
const production_env = require('./prod')

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development_env,
    test: test_env,
    production: production_env
}[process.env.NODE_ENV || 'development']
