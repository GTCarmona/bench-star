const express = require('express')
const Bench = require('../models/Bench')

const router = express.Router()

// Route to get all Benches
router.get('/', (req, res, next) => {
  Bench.find()
    .then(benches => {
      res.json(benches)
    })
    .catch(err => next(err))
})

// Route to add a Bench
router.post('/', (req, res, next) => {
  const { title, description, location, tags } = req.body
  Bench.create({ title, description, location, tags })
    .then(bench => {
      res.json({
        success: true,
        bench,
      })
    })
    .catch(err => next(err))
})

module.exports = router
