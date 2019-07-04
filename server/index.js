const express = require('express');
const Promise = require('bluebird');
const app = express();
const PORT = 3000;

app.use(express.static('./client/dist'));
app.use(express.json());

app.listen(PORT, () => `Listening on port ${3000}!`);