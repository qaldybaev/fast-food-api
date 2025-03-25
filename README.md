# Fast-food restorani uchun BackEnd API🍔

## Loyhaning maqsadi:🎯
Biror bir fast-food restorani uchun menyularni ko'rish va ovqatlarga
buyurtma berish imkoniyatini beruvchi layhaning BackEnd API

## Funksional talablar:
- Barcha taomlar category'lari bolishi kerak. Misol: burgerlar,pitsalar va hkz.
- Har bir taom biror categoryga mansub bolishi kerak.
- Taomning rasmi,nomi,narxi,description bo'lishi kerak
- Foydalanuvchi ro'yhattan otmagan holatda ham category va taomlarni ko'rishi kerak
- Foydalanuvchi email va name bilan ro'yhattan o'tadi
- Profilga kirish email orqali boladi
- Foydalanuvchi savatga mahsulotlar qosha olishi kerak
- Foydalanuvchi bir nechta mahsulotni zakaz qilia olishi kerak
- Foydalanuvchi profilga o'z zakazlari tarixini kora olishi kerak
- Foydalanuvchi profilini yangilay olishi kerak

## Nofunksianal talablar:
- Tezlik
- Xavsizlik
- Kengaya oladigan bo'lishi kerak

## Database models:

1. Category:
    - id
    - name
    - createdAt
    - updateAt

2. Food:
    - id
    - name
    - price
    - description
    - imageUrl
    - categoryId (FK)
    - createdAt
    - updateAt

3. User:
    - id
    - name
    - email
    - imageUrl
    - createdAt
    - updateAt

4. Order:🛒
    - id
    - createdAt
    - total_price
    - userId (FK)

5. OrderItem:
    - count
    - orderId (FK)
    - foodId (FK)
    