import React, { useState, useEffect, useContext } from 'react'
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu';
import axios from 'axios'
import Moment  from 'react-moment';
import { AuthContext } from '../context/authContext';

function Single() {
  const [post ,setPost] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split("/")[2]
  const {currentUser} = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
        
      }catch(err){
        console.log(err)
      }
      
    }
    fetchData()
  },[postId]);

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt=''/> 
        <div className='user'>
          {post.userImg && <img src={post.userImg} alt='' />}
          <div className='info'>
            <span>{post.username}</span>

            <p>Posted <Moment toNow>{post.date}</Moment></p>
          </div>
          {currentUser.username === post.username && (<div className='edit'>
            <Link to={`/write?edit=2`} state={post}>
              <AiTwotoneEdit/>
            </Link>
           
           <AiFillDelete onClick={handleDelete} />
          </div>)}
        </div>
        <h1>{post.title}</h1>
        <p>{post.descs}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single