const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
const inventoryRouter = require('./routes/inventory.router.js');
app.use('/inventory', inventoryRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT, function () {
    console.log('Listening on port: ', PORT);
});