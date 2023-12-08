import { test, expect, Page } from '@playwright/test';
import Selectors from '../pageElements/selectors';

export default class LoginSteps {
    constructor(private page: Page) {}

    public async login(uname: string, pwd: string){
        await test.step(`Login to application using username "${uname}" & password "${pwd}"`, async () => {
            await this.page.locator(Selectors.FIELD_UNAME).fill(uname);
            await this.page.locator(Selectors.FIELD_PWD).fill(pwd);
            await this. page.locator(Selectors.BTN_LOGIN).click();
        });
    }

    public async confirmLoginError(){
        await test.step(`Confirm login error`, async () => {
            await expect(this.page.locator(Selectors.ELEM_MESSAGE)).toHaveText('Wrong Email or password');
        });
    }
}