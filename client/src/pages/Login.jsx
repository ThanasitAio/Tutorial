import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [err, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange =  e =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try{
     //const res = await axios.post("/auth/register", inputs)
    //await axios.post("/auth/login", inputs)
    await login(inputs)
      navigate('/')
    }catch(err){
      setError(err.response.data)
    }
    
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form>
        <input required type="text" placeholder='Username' name='username' onChange={handleChange} />
        <input required type="password" placeholder='Password'  name='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login