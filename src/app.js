const express = require('express');

const app = express();
const port = 3113;

//middleware
app.use(express.json());

//route test
app.get('/', (req, res) => {
    res.send('hello world');
});

