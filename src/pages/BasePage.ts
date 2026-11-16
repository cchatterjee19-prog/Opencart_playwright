

import {Locator,Page} from "@playwright/test";

export class BasePage{
   protected readonly page:Page // basepage is inherited by childclass so 
   // it can be protected so that child class can access it but not outside the class;
   //common locators acroos all pages:
   protected readonly logo:Locator;
   protected readonly searchBox:Locator;
   protected readonly searchIcon:Locator;
   protected readonly footerLinks:Locator;
   protected readonly currency:Locator;
   protected readonly cartButton:Locator;
   
   constructor(page:Page){
    this.page=page;
    this.logo= page.getByAltText('naveenopencart');
    this.searchBox=page.getByPlaceholder('Search');
    this.searchIcon=page.locator('div#Search button');
    this.currency=page.locator('#form-currency');
    this.footerLinks=page.locator('footer a');
    this.cartButton=page.locator('div#cart button');

   }

   //common locators/functionalities/actions

    async isLogoVisible():Promise<boolean>{
      return this.logo.isVisible();
    }

    async isSearchBoxVisible():Promise<boolean>{
      return this.searchBox.isVisible();
    }
 
   async getPageFooterCount():Promise<number>{
      return await this.footerLinks.count();
   }
    async getPageFooters():Promise<string[]>{
      return await this.footerLinks.allInnerTexts();
   }

   //page level generic methods

   async getPageTitle():Promise<string>{
      return await this.page.title();
   }
     getCurrentTitle():string{
      return this.page.url();
   }

   async waitForPageLoad(){
      await this.page.waitForLoadState('load');
   }

   async takeScreenshot(name:string){
      return await this.page.screenshot({
         fullPage:true,
         path:`reports/screenshot/${name}.png`
      });
   }

}