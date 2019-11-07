const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    let queryText = `SELECT "product"."product_id", "sku", "product_description", SUM("inventory"."quantity") AS "inventory_quantity", SUM("order_lines"."quantity") AS "order_quantity" FROM "product" LEFT JOIN "inventory" ON "product"."product_id" = "inventory"."product_id" LEFT JOIN "order_lines" ON "product"."product_id" = "order_lines"."product_id" GROUP BY "product"."product_id";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res)=>{
    let queryText = `INSERT INTO "product" ("sku","product_description") VALUES ($1,$2);`
    pool.query(queryText,[req.body.newProductSku,req.body.newProductDescription])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;