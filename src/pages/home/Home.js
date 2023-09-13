import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <center>
        <br />
        Home page will be updated 
        <hr />
        pages availble <br />
        1. <Link to="/login">Login</Link> <br />
        1. <Link to="/register">Register</Link> <br />
    </center>
  )
}

export default Home