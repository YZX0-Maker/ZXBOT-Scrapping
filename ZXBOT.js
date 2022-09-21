/******
 * 
 * BOT WEBSCRAPPING & RANDOM PROXY LIST
 * BY https://www.twitter.com/@Yeanlond
 */

const puppeteer = require('puppeteer');

/****** PROXY */
const proxys = ["http=45.42.177.50:3128", "https=64.235.204.107:3128"];

/****** DATA */
var name = 'NAME EXAMPLE'
var doc = 'Y09392-0'
var year = '1994'
var country = 'CA'
var searchs = 1000
var proxy_enable = false;

/****** FUNCTIONS */
function aleat(prox) {
    return prox.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 1)
}
/****** PUBLIC */
var proxs = String(aleat(proxys));
console.log('El proxy asignado ' + proxs);
/****** WEBSCRAPPING WITH PUPPETER */
(async () => {
    for (let i = 0; i < searchs; i++) {
        if (proxy_enable === true) {
            var browser = await puppeteer.launch({ headless: false, args: [`--proxy-server=${proxs}`] });
        } else {
            var browser = await puppeteer.launch({ headless: false });
        }
        const page = await browser.newPage();
        await page.goto('https://127.0.0.1/')
        //START BOT
        var status = await page.$eval("h1", element => element.textContent)
        if (status === 'Too Many Requests') {
            console.log('ExampleBot esta dormido, esperando para iniciar denuevo, en ' + (180000 / 1000 / 60) + ' Minutos');
            await page.waitForTimeout(180000)
            await browser.close()
        } else {
            await page.select('[id="select"]', '2')
            //wait selector of others
            await page.waitForSelector('[class="selectExample"]').then(async () => {
                await page.waitForTimeout(5000) //time off for chargue select options
                await page.select('[class="selectExample"]', 'codeSelect')
                await page.waitForTimeout(3000)
                await page.click('[id="btnAceptar"]')
                //session 2
                await page.waitForSelector('[id="btnEntrar"]').then(async () => {
                    await page.click('[id="btnEntrar"]');
                    //session 3
                    //Check the form and inputs site
                    await page.waitForSelector('[id="checkForm"]').then(async () => {
                        await page.click('[id="checkForm"]')
                        await page.waitForTimeout(4000)
                        await page.type('[id="formExample"]', doc)
                        await page.type('[id="formExample"]', name)
                        await page.type('[id="formExample"]', year)
                        await page.select('[id="formExample"]', country)
                        await page.click('[id="btnEnviar"]')
                        //session 4
                        await page.waitForSelector('[id="btnEnviar"]').then(async () => {
                            await page.click('[id="btnEnviar"]')
                            await page.waitForTimeout(3000)
                            //Class for check de site
                            var info = await page.$eval("exampleClass", element => element.textContent)
                            //This line is for check a response msn for the website
                            if (info === ''/*<===data*/) {
                                await page.waitForTimeout(60000)
                                await browser.close()
                                console.log('ExampleBot ha concluido la busqueda. ' + ' ' + '#' + i);
                            } else {
                                //FOUND
                                console.log('ExampleBot ha encontrado lo buscado, por favor verifique')
                                const page_finale = await browser.newPage();
                                //await page_finale.goto('https://firebasestorage.googleapis.com/v0/b/coinworld-co.appspot.com/o/data%2Fnotificacion.mp3?alt=media&token=4e5d52f3-d916-4574-ab09-fbd2ffdfd6f8')
                            }
                        }).catch(async () => {
                            console.log('ExampleBot esta dormido, esperando para iniciar denuevo, en ' + (30000 / 1000 / 60) + ' Minutos');
                            await page.waitForTimeout(30000);
                            await browser.close();
                        })
                    }).catch(async () => {
                        console.log('ExampleBot esta dormido, esperando para iniciar denuevo, en ' + (30000 / 1000 / 60) + ' Minutos');
                        await page.waitForTimeout(30000);
                        await browser.close();
                    })
                }).catch(async () => {
                    console.log('ExampleBot esta dormido, esperando para iniciar denuevo, en ' + (30000 / 1000 / 60) + ' Minutos');
                    await page.waitForTimeout(30000);
                    await browser.close();
                })
            }).catch(async () => {
                console.log('ExampleBot esta dormido, esperando para iniciar denuevo, en ' + (30000 / 1000 / 60) + ' Minutos');
                await page.waitForTimeout(30000)
                await browser.close()
            })

        }
    }
})();

