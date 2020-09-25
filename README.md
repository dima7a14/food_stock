# food_stock
Simple app to manage my food stock


## TODO:
 - Create server (Feathers.js)
 - Create client (Web client with Vue.js or Discord bot)
 
## Schemas:
 - Stock
   - id (number)
   - createdAt (date)
   - updatedAt (date)
   - products (array of Product)
 - Product
   - id (number)
   - title (string)
   - createdAt (date)
   - updatedAt (data)
   - amount (string)
 - Operation
   - id (number)
   - createdAt (date)
   - updatedAt (date)
   - committedBy (User)
   - products (array of Product)
   - intoStock (Boolean)
 - User
   - id (number)
   - fullName (string)
   - email (string)
   - password (string)
   - stockId (Stock id)
