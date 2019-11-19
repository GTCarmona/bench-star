const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const benchSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: String,
    location: { lat: String, lon: String },
    imageUrl: String,
    _createdBy: { type: ObjectId, ref: "User" },
    _visited: [{ type: ObjectId, ref: "User" }],
    reviews: [
      {
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        _reviewBy: { type: ObjectId, ref: "User" },
      },
    ],
    tags: {
      type: [String],
      enum: ["Comfy", "View", "Weird", "Sunset", "Boring", "Nature"],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
)

const Bench = mongoose.model("Bench", benchSchema)
module.exports = Bench
