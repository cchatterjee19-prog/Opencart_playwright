import { test, expect } from '../src/fixtures/pagefixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';



test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!,process.env.PASSWORD!);
   
});

test('company logo exist on product page',async({basePage})=>{
    expect(await basePage.isLogoVisible()).toBe(true);
})

test('footer exist on product page',async({basePage})=>{
    expect(await basePage.getPageFooterCount()).toBe(16);
})

test('verify product images count', async ({ homePage,searchResultPage,productinfoPage }) => {
   await homePage.doSearch('macBook');
   await searchResultPage.selectProduct('MacBook Pro');
   let imgCount=await productinfoPage.getProductImagesCount();
   console.log("total image",imgCount);
   expect(imgCount).toBe(4);
});

test('verify product information data', async ({ homePage,searchResultPage,productinfoPage }) => {
   await homePage.doSearch('macBook');
   await searchResultPage.selectProduct('MacBook Pro');
   let actualProductInfoMap = await productinfoPage.getProductInfo();
   console.log("Product info",actualProductInfoMap);
   expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
   expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
   expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
   expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
   expect.soft(actualProductInfoMap.get('ExtaxPrice')).toBe('$2,000.00');
   
   

});