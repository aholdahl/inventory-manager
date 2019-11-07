const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//Gets all inventory info, product name and sku, and bin name then sends to inventoryReducer via inventorySaga
router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "inventory" JOIN "product" ON "inventory"."product_id" = "product"."product_id" JOIN "bins" ON "inventory"."bin_id" = "bins"."bin_id";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
        })
    })

//Posts new inventory info then sends status code to inventorySaga
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "inventory" ("product_id","bin_id","quantity") VALUES ($1,$2,$3);`
    pool.query(queryText, [req.body.selectedProduct, req.body.selectedBin, req.body.newQuantity])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//Saves updated inventory info then sends status code to inventorySaga
router.patch('/', (req, res) => {
    let queryText = `UPDATE "inventory" SET "quantity" = $1 WHERE "inventory"."inventory_id" = $2;`
    pool.query(queryText, [req.body.quantity, req.body.inventoryId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//Deletes inventory info then sends status code to inventorySaga
router.delete('/:inventoryId', (req, res) => {
    let queryText = `DELETE FROM "inventory" WHERE "inventory"."inventory_id" = $1;`
    pool.query(queryText, [req.params.inventoryId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;