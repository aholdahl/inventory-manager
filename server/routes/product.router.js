const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "product";`
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
    pool.query(queryText,[req.body.sku,req.body.product_description])
    .then((result)=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    })
})

module.exports = router;