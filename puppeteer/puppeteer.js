const fs = require('fs')
const puppeteer = require('puppeteer')
/**
 * @pageUrl 要抓取的链接地址
 */
const loadPrivacyPolicy = (pageUrl) => {
	puppeteer
		.launch({
			ignoreHTTPSErrors: true,
			defaultViewport: { width: 1920, height: 1080 },
			args: ['--no-sandbox', '--start-maximized'],
			headless: false
		})
		.then(async (browser) => {
			const page = await browser.newPage()
			await page
				.goto(pageUrl, { waitUntil: ['networkidle0'] })
				.then(async () => {
					const divHandle = await page.$('#mw-content-text .mw-content-ltr')
					const h2Handles = await divHandle.$$('h2')
					const province = []
					for (const h2Handle of h2Handles) {
						const spanValues = await h2Handle.$$eval('.mw-headline', (spans) =>
							spans.map((span) => span.textContent.replace('Província do ', ''))
						)
						province.push(spanValues[0])
					}
					const capital = []
					const district = []
					const tableHandles = await divHandle.$$('.wikitable')
					for (let index = 0; index < tableHandles.length; index++) {
						const aValues = await tableHandles[index].$$eval('td:first-child a', (as) =>
							as.map((a) => a.textContent)
						)
						capital[index] = aValues
						district[index] = []
						const trHandles = await tableHandles[index].$$('tr')
						for (let trIdx = 0; trIdx < trHandles.length; trIdx++) {
							const districtValues = await trHandles[trIdx].$$eval('td:last-child a', (as) =>
								as.map((a) => a.textContent)
							)
							if (districtValues.length > 0) {
								district[index].push(districtValues)
							}
						}
					}
					await divHandle.dispose()
					let csvStr = `\ufeffProvince,City,District`
					capital.forEach((city, index) => {
						city.forEach((cityItem, cityIdx) => {
							if (district[index][cityIdx]) {
								district[index][cityIdx].forEach((disEle) => {
									csvStr += `\r\n${province[index]},${cityItem},${disEle}`
								})
							} else {
								csvStr += `\r\n${province[index]},${cityItem},${''}`
							}
						})
					})
					// 获取HTML结构
					// const html = await page.evaluate((body) => body.outerHTML, htmlHandle)
					await htmlHandle.dispose()
					await fs.writeFile(`./plugins/angola.csv`, csvStr, (err) => {
						if (!err) {
							console.log('写入成功')
						}
					})
				})
				.catch((err) => {
					console.log('网页出错:',err)
				})
			await browser.close()
			console.log('执行完成')
		})
}
// 修改执行参数后执行文件 loadPrivacyPolicy('链接')
loadPrivacyPolicy('https://pt.wikipedia.org/wiki/Comunas_de_Angola#Prov%C3%ADncia_do_Bengo')
