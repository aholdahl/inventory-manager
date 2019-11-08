const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//Gets all order info and corresponding line items then sends to orderReducer via orderaga
router.get('/', (req, res) => {
    let queryText = `SELECT "order"."order_id","order_number","date_ordered","customer_name","customer_address",json_agg("order_lines") AS "order_lines" FROM "order" JOIN (SELECT * FROM "order_lines" JOIN "product" ON "order_lines"."product_id" = "product"."product_id" ORDER BY "product_description" ASC) AS "order_lines" ON "order"."order_id" = "order_lines"."order_id" GROUP BY "order"."order_id" ORDER BY "date_ordered" ASC;`
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//Posts new order info, then order lines, then sends status code to productSaga
router.post('/', async (req, res) => {
    let queryText = `INSERT INTO "order" ("order_number","date_ordered","customer_name","customer_address") VALUES ($1,$2,$3,$4) RETURNING "order_id";`
    const connection = await pool.connect();
    try {
        await connection.query('BEGIN;');
        let result = await connection.query(queryText, [req.body.orderNumber, req.body.dateOrdered, req.body.customerName, req.body.customerAddress]);
        let orderId = result.rows[0].order_id;
        for (let line of req.body.orderLines) {
            await connection.query(`INSERT INTO "order_lines" ("order_id","product_id","quantity") VALUES ($1,$2,$3);`, [orderId, line.product_id, line.quantity]);
        };
        await connection.query('COMMIT;');
        res.sendStatus(200);
    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log(error);
        res.sendStatus(500);
    } finally {
        connection.release();
    };
});

//Deletes order line item then sends status code to orderSaga
router.delete('/line/:orderLineId', (req, res) => {
    let queryText = `DELETE FROM "order_lines" WHERE "order_line_id" = $1;`
    pool.query(queryText, [req.params.orderLineId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//Deletes order then sends status code to orderSaga
//Remaining order line items are cared for automatically by ON CASCADE DELETE
router.delete('/:orderId', (req, res) => {
    let queryText = 'DELETE FROM "order" WHERE "order_id" = $1;'
    pool.query(queryText, [req.params.orderId])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

//// The below should be the correct syntax for deleting the order lines associated with the applicable order first, then the order.
//// It "appears" to be working on the DOM, but when the page refreshes, the order returns...
//// Updated database.sql for order_lines.order_id to be ON DELETE CASCADE instead.

// router.delete('/:orderId', async (req, res) => {
//     let orderId = req.params.orderId;
//     console.log(orderId);
//     let queryText = `DELETE FROM "order_lines" WHERE "order_id" = $1;`
//     const connection = await pool.connect();
//     try {
//         await connection.query('BEGIN;')
//         await connection.query(queryText, [orderId])
//         await connection.query(`DELETE FROM "order" WHERE "order_id" = $1;`, [orderId])
//         await res.sendStatus(200);
//     } catch (error) {
//         await connection.query('ROLLBACK;');
//         await console.log(error);
//         await res.sendStatus(500);
//     } finally {
//         await connection.release();
//     }
// })

module.exports = router;