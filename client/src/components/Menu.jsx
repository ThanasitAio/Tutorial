import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Menu({cat}) {
  const [posts ,setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
      
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[cat]);
    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit ament ",
    //       desc: "Lorem ipsum dolor sit ament Desc",
    //       img: "https://wallpapers.com/images/hd/mobile-suit-gundam-00-3fqkr8grbop4n2u4-3fqkr8grbop4n2u4.jpg", 
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit ament ",
    //       desc: "Lorem ipsum dolor sit ament Desc",
    //       img: "https://wallpapers.com/images/hd/mobile-suit-gundam-00-3fqkr8grbop4n2u4-3fqkr8grbop4n2u4.jpg", 
    //     },
    //   ]
  return (
    <div className='menu'>
        <h1>Other Posts you may Link</h1>
        {posts.map((post) => (
            <div className='post' key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu