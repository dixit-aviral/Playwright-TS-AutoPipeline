# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Client App login ZARA COAT 3
- Location: tests\example.spec.ts:7:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | import {test, expect, Locator} from'@playwright/test'
  2  | import { Page } from 'playwright'
  3  | export class CartPage
  4  | {
  5  | readonly page
  6  |   readonly cartProducts: Locator
  7  |   readonly productsText
  8  |   readonly cart
  9  |   readonly orders
  10 |   readonly checkout
  11 | 
  12 | constructor(page: Page)
  13 | {
  14 |     this.page = page;
  15 |     this.cartProducts = page.locator("div li").first();
  16 |     this.productsText = page.locator(".card-body b");
  17 |     this.cart =  page.locator("[routerlink*='cart']");
  18 |     this.orders = page.locator("button[routerlink*='myorders']");
  19 |     this.checkout = page.locator("text=Checkout");
  20 | 
  21 | }
  22 | 
  23 | async VerifyProductIsDisplayed(productName: string)
  24 | {
  25 |    
> 26 |     await this.cartProducts.waitFor();
     |                             ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  27 |     const bool =await this.getProductLocator(productName).isVisible();
  28 |     expect(bool).toBeTruthy();
  29 | 
  30 | }
  31 | 
  32 | async Checkout()
  33 | {
  34 |     await this.checkout.click();
  35 | }
  36 | 
  37 |  getProductLocator(productName:string)
  38 | {
  39 |     return  this.page.locator("h3:has-text('"+productName+"')");
  40 | }
  41 | 
  42 | }
  43 | 
```