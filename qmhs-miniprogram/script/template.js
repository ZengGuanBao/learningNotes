/**
 * pages页面快速生成脚本
 * 用法：npm run tep `文件名`
 */

const fs = require('fs')

const dirName = process.argv[2]
if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：npm run tep test')
  process.exit(0)
}

// js模板
const jsTep = `import create from '../../store/create'
import store from '../../store/store'

create(store, {
  data: {
  }
})
`

// config模板
const configTep = `{
  "navigationBarTitleText": ""
}
`

// 页面模板
const pageTep = `<!--${dirName}.wxml-->
<view class="${dirName}-container">
</view>
`

// wxss文件模版
const wxssTep = `/**${dirName}.wxss**/`

fs.mkdirSync(`./pages/${dirName}`) // mkdir $1
process.chdir(`./pages/${dirName}`) // cd $1

fs.writeFileSync(`${dirName}.js`, jsTep) // js
fs.writeFileSync(`${dirName}.json`, configTep) // config
fs.writeFileSync(`${dirName}.wxml`, pageTep) // wxml
fs.writeFileSync(`${dirName}.wxss`, wxssTep) // wxss
process.exit(0)
