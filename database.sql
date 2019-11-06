--DATABASE NAME inventory_manager

--A Product record is the basic information about the Product that a seller carries.
CREATE TABLE "product" (
	"product_id" SERIAL PRIMARY KEY,
	"sku" VARCHAR(255) UNIQUE NOT NULL,
	"product_description" VARCHAR(255) NOT NULL
);

--Orders are placed by a customer for one or more products
CREATE TABLE "order" (
	"order_id" SERIAL PRIMARY KEY,
	"order_number" VARCHAR(255) UNIQUE NOT NULL,
	"date_ordered" TIMESTAMP DEFAULT NOW(),
	"customer_name" VARCHAR(255) NOT NULL,
	"customer_address" VARCHAR(255) NOT NULL
	--what about fulfillment status? Does line get deleted upon fulfillment?
);

--Order lines are related to an Order, and specify which Products have been ordered, and how many. 
--An Order can contain more than one Order Line
CREATE TABLE "order_lines" (
	"order_line_id" SERIAL PRIMARY KEY,
	"order_id" INT REFERENCES "order"("order_id") NOT NULL,
	"product_id" INT REFERENCES "product"("product_id") NOT NULL,
	"quantity" INT DEFAULT 1 --CONSTRAINT "quantity_positive" CHECK ("quantity" > 0)
);

--Bins are the individual shelves, pallets, or other areas in the warehouse where inventory is located
CREATE TABLE "bins" (
	"bin_id" SERIAL PRIMARY KEY,
	"bin_name" VARCHAR(255) UNIQUE NOT NULL
);

--Inventory records point to the Product in inventory, and the Bin that it is stored in. 
--There should not be multiple rows for the same Product and Bin.
--Quantities of zero do not need to be stored.
CREATE TABLE "inventory" (
	"inventory_id" SERIAL PRIMARY KEY,
	"product_id" INT REFERENCES "product"("product_id") NOT NULL,
	"bin_id" INT REFERENCES "bins"("bin_id") NOT NULL,
	"quantity" INT DEFAULT 1 --CONSTRAINT "quantity_positive" CHECK ("quantity" > 0)
);