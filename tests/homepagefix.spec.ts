import { test, expect } from '../src/fixtures/pagefixtures';



test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com','pw123');
   
   

});

test('home page title test', async ({ homePage }) => {
    //let homePage = new HomePage(page);
    //await homePage.goToHomePage();
    const title = await homePage.getPageTitle();
    console.log(`Home page title is: ${title}`);
    expect(title).toBe('My Account');

});

test('Logout link exist test', async ({ homePage }) => {
   // let homePage = new HomePage(page);
   // await homePage.goToHomePage();
    expect(await homePage.isLogoutLinkExist()).toBe(true);
});

test('home page header exists',async({homePage})=>{
  let allHeaders= await homePage.getHomePageHeader();
  console.log(`All headers are: ${allHeaders}`);
  expect(allHeaders).toHaveLength(4);
  expect(allHeaders).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account', 
    'Newsletter'
  ])

});
