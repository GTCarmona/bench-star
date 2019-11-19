import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="Home">
      <h2>BENCH-STAR</h2>
      <p>I will rule all the benches</p>
      <div className="container">
        <li>
          <Link to="/signup">Sign-up</Link>
        </li>
        <li>
          <Link to="/add-bench">Add a bench</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    </div>
  )
}
