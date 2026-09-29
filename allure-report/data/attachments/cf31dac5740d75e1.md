# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Client App login QWERTY
- Location: tests\example.spec.ts:7:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[routerlink*=\'cart\']')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e15]: 
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e17]: 
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e19]: 
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
            - generic [ref=e21]: 
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading "Practice Website for Rahul Shetty Academy Students" [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]: rahulshetty@gmail.com
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]: Iamking@00
          - button "Login" [active] [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e50]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e55]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e60]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e66]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e71]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | import {test, expect, Locator} from'@playwright/test'
  2  | import { Page } from 'playwright'
  3  | export class DashboardPage
  4  | {
  5  |     readonly page
  6  |       readonly products 
  7  |       readonly productsText
  8  |       readonly cart
  9  |       readonly orders
  10 |       
  11 | constructor(page:Page)
  12 | {
  13 |     this.page = page;
  14 |     this.products = page.locator(".card-body");
  15 |     this.productsText = page.locator(".card-body b");
  16 |     this.cart =  page.locator("[routerlink*='cart']");
  17 |     this.orders = page.locator("button[routerlink*='myorders']");
  18 | 
  19 | }
  20 | 
  21 | async searchProductAddCart(productName: string)
  22 | {
  23 |    
  24 |     const titles= await this.productsText.allTextContents();
  25 |     console.log(titles);
  26 |     const count = await this.products.count();
  27 |     console.log(count)
  28 |     for(let i =0; i < count; ++i)
  29 |     {
  30 |         console.log(await this.products.nth(i).locator("b").textContent())
  31 |     if(await this.products.nth(i).locator("b").textContent()== productName)
  32 |     {
  33 |         //add to cart
  34 |         await this.products.nth(i).locator("text= Add To Cart").click();
  35 |         console.log("Product added to cart")
  36 |         break;
  37 |      }
  38 |     }
  39 | }
  40 | 
  41 | async navigateToOrders()
  42 | {
  43 |     await this.orders.click();
  44 | }
  45 | 
  46 | 
  47 | async navigateToCart()
  48 | {
> 49 |     await this.cart.click();
     |                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  50 | }
  51 | 
  52 | }
  53 | 
```