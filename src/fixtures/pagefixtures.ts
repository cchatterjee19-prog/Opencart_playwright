import {test as baseTest} from '@playwright/test';
import {BasePage} from '../pages/BasePage';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {CsvHelper} from '../utils/CsvHelper';
import { SearchResultPage } from '../pages/SearchResultPage';
import {ProductInfoPage} from '../pages/ProductInfoPage';

//define types for page fixtures
type pageFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    searchResultPage:SearchResultPage;
    basePage:BasePage;
    productinfoPage:ProductInfoPage;
    testData: Record<string,string>[];
}

//extend playwright base test with page fixtures
export let test = baseTest.extend<pageFixtures>({
    loginPage: async ({ page }, use) => {
        let loginPage= new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        let homePage= new HomePage(page);
        await use(homePage);
    },
   searchResultPage: async ({ page }, use) => {
        let searchResultPage= new SearchResultPage(page);
        await use(searchResultPage);
    },
     productinfoPage: async ({ page }, use) => {
        let productinfoPage= new ProductInfoPage(page);
        await use(productinfoPage);
    },
      basePage: async ({ page }, use) => {
        let basePage= new BasePage(page);
        await use(basePage);
    },
    testData: async ({}, use) => {
        let testData= CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }

});


export {expect} from '@playwright/test';