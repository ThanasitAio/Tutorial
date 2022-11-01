import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange =  e =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try{
     //const res = await axios.post("/auth/register", inputs)
      await axios.post("/auth/register", inputs)
      navigate('/login')
    }catch(err){
      setError(err.response.data)
    }
    
  }
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder='Username' name='username' onChange={handleChange}/>
        <input required type="email" placeholder='Email' name='email' onChange={handleChange}/>
        <input required type="password" placeholder='Password' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register