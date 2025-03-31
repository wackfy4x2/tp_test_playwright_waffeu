import { test, expect } from '@playwright/test';
import { Baseurl } from '../model/url';
import { users } from '../model/data';


test('connexion', async({page}) => {
    await page.goto(`${Baseurl}/home`);
    await page.locator("#style_avatar_wrapper__pEGIQ").click();
    await page.fill('#email_login', users.email);
    await page.fill('#password_login', users.password);
    await page.locator('#btn_login').click();
    await expect(page.locator('#style_avatar_wrapper__pEGIQ .MuiTypography-root')).toHaveText(users.email);
})