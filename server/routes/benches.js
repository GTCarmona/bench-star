const express = require("express")
const Bench = require("../models/Bench")

const router = express.Router()

// Route to get all Benches
router.get("/", (req, res, next) => {
  Bench.find()
    .then(benches => {
      res.json(benches)
    })
    .catch(err => next(err))
})

router.get("/my-benches", (req, res, next) => {
  const userId = req.user._id
  Bench.find({ _createdBy: userId })
    .populate("_visited")
    .populate("_createdBy")
    .populate("reviews._reviewBy")
    .then(bench => {
      res.json({
        success: true,
        bench,
      })
    })
    .catch(err => next(err))
})

// Route to add a Bench
router.post("/", (req, res, next) => {
  // const { title, description, location, tags, reviews, _createdBy } = req.body
  // console.log("REQ.BODY",title,imageUrl,description,location,tags,reviews,_createdBy)
  Bench.create({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    tags: req.body.tags,
    reviews: req.body.reviews,
    _createdBy: req.body._createdBy,
    imageUrl: req.file.url,
  })
    .then(bench => {
      res.json({
        success: true,
        bench,
      })
    })
    .catch(err => next(err))
})
// add tags
router.put("/:benchId", (req, res, next) => {
  // const { title, description, location, tags, reviews, _createdBy } = req.body
  // console.log("REQ.BODY",title,imageUrl,description,location,tags,reviews,_createdBy)
  Bench.findByIdAndUpdate(req.params.benchId, {
    tags: req.body.tags,
  })
    .then(bench => {
      res.json({
        success: true,
        bench,
      })
    })
    .catch(err => next(err))
})

module.exports = router
