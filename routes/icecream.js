const express = require('express');

const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res) => {
    queries.cities.getAll().then(cities => {
        res.json(cities);
    })
});

router.get('/:id', (req, res) => {
     queries.cities.getOne(req.params.id)
     .then(cities =>{
        res.json(cities);
     })
});

router.post('/', (req, res) => {
    console.log(`request body is ${req.body}`);
    queries.cities.create(req.body).then(result => {
        res.send(result[0]);
    })
})


module.exports = router;