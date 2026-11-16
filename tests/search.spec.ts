import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.APP_USERNAME!,process.env.PASSWORD!);
   
});
//Data Provider
const productdata=CsvHelper.readCsv('src/data/product.csv');
for(const row of productdata){
test(`verify search with count-${row.searchkey}-${row.productname}`, async ({ homePage,searchResultPage }) => {
   await homePage.doSearch(row.searchkey);
   expect(await searchResultPage.getProductSearchResultCount()).toBe(Number(row.resultcount));
  });
};

for(const row of productdata){
  test(`verify user is able to land on the product page ${row.searchkey}-${row.productname}`, async ({ page,homePage,searchResultPage }) => {
   await homePage.doSearch(row.searchkey);
   await searchResultPage.selectProduct(row.productname);
   expect(await page.title()).toBe(row.productname);
  });
  };

  test('company logo exist on product page',async({basePage})=>{
    expect(await basePage.isLogoVisible()).toBe(true);
})

test('footer exist on product page',async({basePage})=>{
    expect(await basePage.getPageFooterCount()).toBe(16);
})