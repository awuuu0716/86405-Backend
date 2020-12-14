# 八六蔬食吧-餐廳後端
八六蔬食吧是一間假想的蔬食主題餐廳，使用 React.js 搭配 Node.js 搭建的 SPA 網站，平台使用者主要是下列兩種身份，分別為一般消費者（Visitor）、商家管理員（Admin），一般消費者可以瀏覽菜單、註冊會員後可以直接在網站上訂位。商家管理員可以編輯菜單、管理訂位等等。
![](https://i.imgur.com/UqQe02e.jpg)
# Demo - 專案展示
[DEMO](https://awuuu0716.github.io/86408/#/)

歡迎使用管理員測試帳號登入使用，帳密如下(請不要隨意刪除菜單 QAQ，避免前台無菜單可看)：

帳號名稱：admin
密碼：admin

# Initial - 專案緣起
專案發想自 [MTR04-餐廳官網練習作業](https://github.com/Lidemy/mentor-program-4th-awuuu0716/tree/master/homeworks/week6)，在學習到 React 與後端 Node.js 後我決定試著從零開始打造一個前後端分離的 SPA 網站，讓使用者擁有像是 APP 般的使用體驗，輕鬆了解一家餐廳，並且能夠直接在網頁上訂位，無需浪費寶貴的電話費~

# Features - 專案功能
商品相關 API：
1. GET /products/:type，取得商品資料，接收 type 參數獲取特定種類餐點
2. POST /products，新增商品
3. DELETE /products/:id，帶入 id 刪除特定商品
4. PUT /products/:id，帶入 id 更新特定商品資訊（無需更新圖片）
5. PUT /products/reupload/:id，帶入 id 更新特定商品資訊（有更新圖片）

訂位相關 API：
1. GET /reserve/:date，帶入 date 取得特定日期訂位資訊，格式為:月份縮寫 日期 年份，ex:Dec 13 2020
2. GET /reserve/user/:username，帶入 username 取得特定使用者訂位資訊
3. POST /reserve，新增訂位

會員相關 API：
1. POST /signup，註冊新會員
2. POST /login，登入
3. GET /me，帶入 JWT 驗證使用者

# Technical Skills - 使用哪些技術實作專案
1. Node.js - 專案環境
2. Express - 輕量且方便的後端框架
3. axios - 串接第三方 API
4. mysql - 儲存菜單、會員、訂位的資料
5. sequelize - 利用 ORM 以操作 JavaScript 物件的方式操作資料庫
6. bcrypt - 密碼的 hash 與驗證
7. jsonwebtoken - 使用者身分驗證
8. multer - 解析前端傳來的圖片資料
9. body-parser - 解析前端傳來的 body 資訊

# Declaration - 聲明
本作品內圖片、內容等，純粹為個人練習前端使用，不做任何商業用途。

# Installing - 專案安裝流程
1. clone this repository
``` 
git clone https://github.com/awuuu0716/86408-Backend
```

2. 安裝套件
```
npm install
```

3. 在本地端開啟此專案
```
node index.js
```