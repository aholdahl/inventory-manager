const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
const binRouter = require('./routes/bin.router.js');
const inventoryRouter = require('./routes/inventory.router.js');
const orderRouter = require('./routes/order.router.js');
const productRouter = require('./routes/product.router.js');
app.use('/bins', binRouter);
app.use('/inventory', inventoryRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT, function () {
    console.log('Listening on port: ', PORT);
});