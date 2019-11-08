const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//Gets all product info, total inventory quantity, and total order quantity then sends to productReducer via productSaga
router.get('/', (req, res) => {
    let queryText = `SELECT "product"."product_id", "sku", "product_description", SUM("inventory"."quantity") AS "inventory_quantity", SUM("order_lines"."quantity") AS "order_quantity" FROM "product" LEFT JOIN "inventory" ON "product"."product_id" = "inventory"."product_id" LEFT JOIN "order_lines" ON "product"."product_id" = "order_lines"."product_id" GROUP BY "product"."product_id" ORDER BY "product_description" ASC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//Posts new product info then sends status code to productSaga
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "product" ("sku","product_description") VALUES ($1,$2);`
    pool.query(queryText, [req.body.newProductSku, req.body.newProductDescription])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//Saves updated product info then sends status code to productSaga
router.put('/', (req, res) => {
    let queryText = `UPDATE "product" SET "sku" = $1, "product_description" = $2 WHERE "product_id" = $3;`
    pool.query(queryText, [req.body.sku, req.body.productDescription, req.body.productId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//Deletes product info then sends status code to productSaga
router.delete('/:productId', (req, res) => {
    let queryText = `DELETE FROM "product" WHERE "product_id" = $1;`
    pool.query(queryText, [req.params.productId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;