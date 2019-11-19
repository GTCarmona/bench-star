import React, { useState, Component } from "react"
import api from "../../services-api"
// {
//   title: { type: String, required: true, trim: true },
//   description: String,
//   location: { lat: String, lon: String },
//   imageUrl: String,
//   _createdBy: { type: ObjectId, ref: "User" },
//   _visited: [{ type: ObjectId, ref: "User" }],
//   reviews: [
//     {
//       rating: {
//         type: Number,
//         min: 1,
//         max: 5,
//       },
//       _reviewBy: { type: ObjectId, ref: "User" },
//     },
//   ],
//   tags: {
//     type: [String],
//     enum: ["Comfy", "View", "Weird", "Sunset", "Boring", "Nature"],
//   },
export default class AddBench extends React.Component {
  const [state, setState] = useState({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    _createdBy: "",
    _visited: "",
    reviews: "",
  })
  const [message, setMessage] = useState(null)

  console.log(state)

  function handleInputChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  function handleClick(e) {
    e.preventDefault()
    console.log(state.name, state.description)
    let data = {
      title: state.title,
      description: state.description,
      location: state.location,
      imageUrl: state.imageUrl,
      _createdBy: state._createdBy,
      _visited: state._visited,
      reviews: state.reviews,
    }
    api
      .addCountry(data)
      .then(result => {
        console.log("Bench created!")
        setState({
          name: "",
          capitals: "",
          area: "",
          description: "",
        })
        setMessage(`Your country '${state.name}' has been created`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(err => setState({ message: err.toString() }))
  }
  return (
    <div className="AddCountry">
      <h2>Add country</h2>
      <form>
        Name:{" "}
        <input
          type="text"
          value={state.name}
          name="name"
          onChange={handleInputChange}
        />{" "}
        <br />
        Capitals:{" "}
        <input
          type="text"
          value={state.capitals}
          name="capitals"
          onChange={handleInputChange}
        />{" "}
        <br />
        Area:{" "}
        <input
          type="number"
          value={state.area}
          name="area"
          onChange={handleInputChange}
        />{" "}
        <br />
        Description:{" "}
        <textarea
          value={state.description}
          name="description"
          cols="30"
          rows="10"
          onChange={handleInputChange}
        />{" "}
        <br />
        <button onClick={e => handleClick(e)}>Create country</button>
      </form>
      {message && <div className="info">{message}</div>}
    </div>
  )
}
