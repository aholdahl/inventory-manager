# Inventory Management Application

## Objective

An online seller fulfills customer orders placed on the seller’s website, and maintains stock of multiple products in their warehouse. The online seller uses inventory management software to accomplish these needs.

The warehouse is divided into multiple bins (shelves or areas of the warehouse) to hold inventory. A bin can contain multiple different products, and a product can have inventory in multiple different bins.

Your task is to develop a web application, using your language and frameworks of choice, that will allow warehouse staff to view, create, edit, and delete: Products, Bins, Inventory Levels, and Orders. Data should be stored in a SQL database of your choice.

Your project delivery should include all source code, and a copy of your database files, as either an .MDF file, a. .BAK file, or one or more .SQL files.

While we encourage using C# and Microsoft SQL Server, please use whatever language and SQL database you are most comfortable with.

![Working Image](/ERD.png)


# User Documentation

### Table of Contents

This application consists of five modules:

 - Bin Management
 - Product Management
 - Inventory Management
 - Order Management
 - New Order

## Bin Management

The Bins page reflects all storage locations managed by the company.

 - The user may view all bins sorted by name, along with a snapshot of each bin's contents.
 - The user may edit an existing bin by clicking the Edit Bin button, updating the Bin Name, then clicking Save Changes.
 - If an existing bin is empty, the user may delete the empty bin by clicking the Delete Bin button.
 - The user may add a new bin by entering the Bin Name then clicking the Add Bin button.

## Product Management

The Products page reflects all products offered by the company.

 - The user may view all products and applicable SKU sorted by description, along with a snapshot of the total currently in stock, and the total ordered.
 - The user may edit an existing product by clicking the Edit Product button, updating the Product Description and/or SKU, then clicking Save Changes.
 - If an existing product is out of stock, the user may delete the unstocked product by clicking the Delete Product button.
 - The user may add a new product by entering the Product Description and SKU then clicking the Add Product button.

## Inventory Management

The Inventory page reflects all products in stock at the company.

 - The user may view all products, applicable SKU, bin, and quantity within that bin.
 - The user may edit an existing inventory by clicking the Edit Inventory button, updating the Quantity, then clicking Save Changes.
 - The user may delete an inventory by clicking the Delete Inventory button.
 - The user may add a new inventory by selecting the Product and Bin, then entering the quantity and clicking the Add Inventory button.

 ## Order Management

The Orders page reflects all orders placed with the company.

 - The user may view all orders, including customer name and address, order number and date, and product information and quantity ordered.
 - The user may edit an existing order details by clicking Edit Order, updating the customer information, then clicking Save Changes.
 - The user may edit an existing order item by clicking Delete Order Item.
 - The user may delete an order by clicking the Delete Order button.

 ## New Order

The New Order page reflects a form where the user may add a new order.

- Enter Customer name, address, order number and date.
- Select Product, Enter Quantity, then click Add to Cart. Repeat as needed.
- When customer information is completed and all items are added to the cart, click Submit Order.
- The user may clear the order form by clicking the Cancel Order button.

# Next Steps / Version 2.0 Wishlist

- Product price?
- Edit bin# location on Inventory page?
- Automatic product stacking when same product-bin combination is attempted to add to inventory.
- Location hints on Orders page?
- Edit Order Item Quantity on Orders page (OrderLines and Cart)?
- Add Order Item on Orders page?
- Automatic order stacking when same product is added to cart.
- Order fulfillment status?

- Detailed error messages
    - Reset input focus to error location
- "No items to show" placeholder message when array is empty

# Attribution

Created by Allyson Holdahl

# Deployment Information

 The live production build can be found at http://inventory-manager.herokuapp.com/ 

 # List of Technologies

This application was built using the following technologies:

React.js
Redux
Redux-Sagas
Axios
Node.js
PostgreSQL
SweetAlert2

MacOS Mojave
Visual Studio Code
Node Package Manager
HomeBrew
Postico
Google Chrome

# System Prerequisites

This project was developed using the above technologies. If you are attempting to use different programs, you may need to download additional dependencies and modify the code accordingly.

# Installation

Click Clone or Download, then click Download ZIP Unzip the file.
Create the database and table(s) in Postico using the SQL provided in database.sql.
In Terminal, run the following commands:

    npm install
    npm build
    npm start