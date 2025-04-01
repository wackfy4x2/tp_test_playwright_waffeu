import { test, expect } from '@playwright/test';
import { Baseurl } from '../model/url';
import { users } from '../model/data';
import path from 'path';
const fs = require('fs');

let date = new Date();
let baseurl: string = Baseurl
const dataPath = path.resolve(__dirname, '../model/data.ts');

test.describe.serial('inscripton', () => {
    test('Inscription_normal', async ({ page }) => {
        await page.goto(`${baseurl}/home`);
        await page.locator("#style_avatar_wrapper__pEGIQ").click();
        await page.getByText('Inscription').click();
        await page.fill("#email_register", `wil${date.getTime()}@gmail.com`);
        await page.fill("#password_register", "Demo_1234");
        await page.fill("#confirm_password_register", "Demo_1234");
        await page.locator("#btn_register").click();
        let texte = await page.locator('#style_avatar_wrapper__pEGIQ .MuiTypography-root').innerText()
        console.log(texte);
        if(texte === `wil${date.getTime()}@gmail.com`) {
            users.email = `wil${date.getTime()}@gmail.com`;
            const updatedContent = `export let users = ${JSON.stringify(users, null, 2)};`;
            fs.writeFileSync(dataPath, updatedContent, 'utf8');
            console.log(`compte creer: wil${date.getTime()}@gmail.com`);
        }
    });
    
    test('inscription_alternatif', async({ page }) => { // inscription d'un deuxieme utilisateur avec le meme email
        await page.goto(`${baseurl}/home`); // chargement de la page
        await page.locator("#style_avatar_wrapper__pEGIQ").click();
        await page.getByText('Inscription').click();
        await page.fill("#email_register", `wil${date.getTime()}@gmail.com`); //remplissage du formulaire 
        await page.fill("#password_register", "Demo_1234");
        await page.fill("#confirm_password_register", "Demo_1234");
        await page.locator("#btn_register").click();
        await expect(page.locator('p.style_messageError__mbzDa')).toBeVisible();
    });


})