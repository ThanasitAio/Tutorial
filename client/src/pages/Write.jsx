import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';

function Write() {
  const state = useLocation()
  const [value, setValue] = useState(state.state?.title || '');
  const [title, setTitle] = useState(state.state?.descs || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state.state?.cat ||'');

  const upload = async () => {
    try{
      const ForData = new FormData()
      ForData.append("file", file)
      const res = await axios.post("/upload", ForData)
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  const handleClick = async e =>{
    e.preventDefault()
    const imgUrl = await upload()
    console.log(moment(Date.now()).format("YYYY-MM-DD"))
    try{
      state.state 
        ? await axios.put(`/posts/${state.state.id}`, {
          title,
          descs:value,
          cat,
          img:file ? imgUrl : "",
        })
        : await axios.post(`/posts/`, {
          title,
          descs:value,
          cat,
          img:file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD"),//HH:mm:ss

        })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='write'>
      <div className='content'>
        <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
        <div className='editorContainer'>
         <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input style={{display:'none'}} type="file" name="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor='file'>Upload Image</label>
          <div className='buttons'>
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className='item'>
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "art"} value="art" id="art"  onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='art'>Art</label>
          </div>
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "science"} value="science" id="science" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='science'>Science</label>
          </div>
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "technology"} value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='technology'>Technology</label>
          </div> 
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "cinema"} value="cinema" id="cinema" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='cinema'>Cinema</label>
          </div> 
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "design"} value="design" id="design" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "food"} value="food" id="food" onChange={e=>setCat(e.target.value)}/>
            <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write