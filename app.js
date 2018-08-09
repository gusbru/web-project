const express = require('express');
// import express from 'express';

const port = process.env.PORT || 3000;
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Listening on port ${port}...`));