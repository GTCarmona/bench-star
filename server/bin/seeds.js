const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "../.env") })

// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const Bench = require("../models/Bench")

const bcryptSalt = 10

require("../configs/database")

// USER SEEDS
let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
  },
]

User.deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`)
    console.log(usersCreated.map(u => u._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })

//Bench Seeds
let benchSeeds = [
  {
    title: "Random Bench",
    description: "Very pretty",
    tags: ["Comfy", "View"],
    imageUrl:
      "https://images.unsplash.com/photo-1532989406390-73d07915b4f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
  },
  {
    title: "Mountain Bench",
    description: "Bring a jacket, very cold",
    tags: ["Nature", "Sunset"],
    imageUrl:
      "https://images.unsplash.com/photo-1529858483845-477149308bea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  },
]

Bench.deleteMany()
  .then(() => {
    return Bench.create(benchSeeds)
  })
  .then(benchesCreated => {
    console.log(
      `${benchesCreated.length} benches created with the following id:`
    )
    console.log(benchesCreated.map(u => u._id))
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect()
    throw err
  })
