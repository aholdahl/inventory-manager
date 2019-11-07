const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "order";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
        })
})

router.get('/lines', (req, res) => {
    let queryText = `SELECT * FROM "order_lines";`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
        })
})

module.exports = router;