import {expect, test} from '@playwright/test'

test(`Popup and Froward Bakc validations`, async ({page})=>{
const textforDialogPlaceholder = "Aviral"

let dialogMessage = ""

page.on('dialog', (dialog)=>{
    dialogMessage = dialog.message()
    expect (dialogMessage).toEqual(`Hello ${textforDialogPlaceholder}, Are you sure you want to confirm?`)
    
    dialog.accept()
}
)

await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
// await page.goto("https://www.google.com")
// await page.goBack()
// await page.goForward()
// await page.goBack()

await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
await page.getByRole("button", {name:"Hide"}).click()

await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()
await page.getByRole("button", {name:"Show"}).click()
await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible()
await page.getByPlaceholder('Hide/Show Example').screenshot({path:"screenshot.png"})
await page.getByPlaceholder('Enter Your Name').fill(textforDialogPlaceholder)
await page.locator('#confirmbtn').click()
console.log(dialogMessage)

const framesPage = page.frameLocator('#courses-iframe')
await framesPage.getByRole('link',{name:"All Access plan"}).click()




})