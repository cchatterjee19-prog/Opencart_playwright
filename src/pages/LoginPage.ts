import { Locator ,Page} from "@playwright/test";
import { BasePage } from "./BasePage";



export class LoginPage extends BasePage{

    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly loginButton:Locator;
    private readonly forgetPasswordLink:Locator;
   readonly logo:Locator;
    private readonly loginErrorMsg:Locator;
    

// const--- of the class: init the lcoators in the constructor
    constructor(page:Page){
        super(page);
        this.emailId =page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password =page.getByRole('textbox', { name: 'Password' });
        this.loginButton =page.getByRole('button', { name: 'Login' });
        this.forgetPasswordLink =page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo=page.getByAltText('naveenopencart');
        this.loginErrorMsg=page.locator('div.alert.alert-danger.alert-dismissible');
    };

    // public page actions: methods to perform actions on the page
    async goToLoginPage(){
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle():Promise<string>{
       return await this.page.title();
    }

     async isForgotPasswordLinkExist():Promise<boolean>{
        return await this.forgetPasswordLink.isVisible();
     }

    async doLogin(app_username:string, password:string):Promise<void> {
       console.log(`Login with username: ${app_username} and password: ${password}`);
       await this.emailId.fill(app_username);
       await this.password.fill(password);
       await this.loginButton.click();
    }
     async isInvalidLoginErrorDisplayed():Promise<boolean>{
        return await this.loginErrorMsg.isVisible();
     }



};

