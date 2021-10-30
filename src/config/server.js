const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors())
app.set('port', 5000);
module.exports = app;