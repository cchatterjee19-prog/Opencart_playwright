import { Locator ,Page} from "@playwright/test";
import { BasePage } from "./BasePage";


export class ProductInfoPage extends BasePage{

    private readonly header:Locator;
    private readonly productImage:Locator;
    private readonly productMeta:Locator;
    private readonly productPricing:Locator;
    private map:Map<string,string | number>;

    constructor(page:Page){
        super(page);
        this.header=page.getByRole('heading', { level: 1 })
        this.productImage=page.locator("div#content li img");
        this.productMeta=page.locator("div#content ul.list-unstyled:nth-of-type(1) li")
        this.productPricing=page.locator("div#content ul.list-unstyled:nth-of-type(2) li")
        this.map=new Map<string,string | number>();
    };  

    async getProductHeader():Promise<string>{
        return await this.header.innerText();
    }

    async getProductImagesCount():Promise<number>{
       // await this.page.waitForTimeout(4000);
        await this.productImage.first().waitFor({state:'visible'});
        return await this.productImage.count();
    }

    /**
     * 
     * @returns this method is returing the actual product data:header,image,metadata,pricing data
     */

    async getProductInfo():Promise<Map<string,string| number>>{
        this.map.set('ProductHeader',await this.getProductHeader());
        this.map.set('ProductImages',await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricing();
        return this.map;
    }
    
    private async getProductMetaData():Promise<void>{
        let metaData= await this.productMeta.allInnerTexts();
        for(let data of metaData){
            let meta=data.split(':');
            let metakey= meta[0].trim();
            let metaVal= meta[1].trim();
            this.map.set(metakey,metaVal);

        }
   }

   private async getProductPricing():Promise<void>{
        let priceData= await this.productPricing.allInnerTexts();
        let productPrice= priceData[0].trim();
        let exTaxPrice= priceData[1].split(':')[1].trim();
        this.map.set('productPrice',productPrice);
        this.map.set('ExtaxPrice',exTaxPrice);
        
   }

}
