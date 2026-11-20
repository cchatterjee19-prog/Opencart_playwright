import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import {ExcelHelper} from '../src/utils/ExcelHelper';
import {JsobHelper} from '../src/utils/JsonHelper';



test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();
   
});

test('Login page title test', async ({ loginPage }) => {
   const title = await loginPage.getLoginPageTitle();
    console.log(`Login page title is: ${title}`);
    expect(title).toBe('Account Login');

});

test('Forgot password link exist test', async ({ loginPage }) => {
   // let loginPage = new LoginPage(page);
   // await loginPage.goToLoginPage();
    expect(await loginPage.isForgotPasswordLinkExist()).toBe(true);
});

test('User is able to login to app test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.APP_USERNAME!,process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBe(true);
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});

//DD_1: sequential mode - 1 test is running with test data one by one using testdata from fixtures 
test('Login to app using wrong credential with datadriven approach', async ({ loginPage, testData }) => {
      for(let row of testData){
        await loginPage.doLogin(row.app_username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBe(true);
      }
})


//DD_2: without fixtures, parallel mode, read csv data directlyand loop the test menthod row wise
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`Invalid login test - ${row.app_username}-${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.app_username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBe(true);
    })
}

let testlogintData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx','login');
for (let row of testlogintData) {
    test(`Invalid login test with excel data - ${row.app_username}-${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.app_username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBe(true);
    })
}

let testloginjsontData = JsobHelper.readJson('src/data/loginData.json');
for (let row of testloginjsontData) {
    test(`Invalid login test wit JSON data- ${row.app_username}-${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.app_username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBe(true);
    })
}

test('company logo exist on product page',async({basePage})=>{
    expect(await basePage.isLogoVisible()).toBe(true);
})

test('footer exist on product page',async({basePage})=>{
    expect(await basePage.getPageFooterCount()).toBe(16);
})