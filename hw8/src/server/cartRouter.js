const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

router.get('/', (req, res) => {
    console.log(__dirname);
    fs.readFile('dist/server/db/userCart.json', 'utf-8', (err, data) => {
        // console.log(err, data);
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
            // console.log('404');
        } else {
            res.send(data);
            // console.log('что-то фигня');
        }
    })
});
router.post('/', (req, res) => {
    console.log(__dirname);
    handler(req, res, 'add', 'dist/server/db/userCart.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'dist/server/db/userCart.json');
});
router.delete('/:id', (req, res) => {
    console.log('получена команда на удаление');
    handler(req, res, 'del', 'dist/server/db/userCart.json');
});

module.exports = router;