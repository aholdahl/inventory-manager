const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//Gets all bin info and inventory contents then sends to binReducer via binSaga
router.get('/', (req, res) => {
    let queryText = `SELECT "bins"."bin_id","bin_name",json_agg("inventory") AS "inventory_contents" FROM "bins" LEFT JOIN (SELECT * FROM "inventory" JOIN "product" ON "inventory"."product_id" = "product"."product_id") AS "inventory" ON "bins"."bin_id" = "inventory"."bin_id" GROUP BY "bins"."bin_id";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//Posts new bin info then sends status code to binSaga
router.post('/', (req, res) => {
    let queryText = `INSERT INTO "bins" ("bin_name") VALUES ($1);`
    pool.query(queryText, [req.body.binName])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//Saves updated bin info then sends status code to binSaga
router.put('/', (req, res) => {
    let queryText = `UPDATE "bins" SET "bin_name" = $1 WHERE "bin_id" = $2;`
    pool.query(queryText, [req.body.binName, req.body.binId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

//Deletes bin info then sends status code to binSaga
router.delete('/:binId', (req, res) => {
    let queryText = `DELETE FROM "bins" WHERE "bin_id" = $1;`
    pool.query(queryText, [req.params.binId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
})

module.exports = router;