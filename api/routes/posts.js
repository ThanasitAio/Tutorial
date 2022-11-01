import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js"
//import { addPost } from "../controllers/post.js"

const router = express.Router()

// router.get("/test", (req,res) => {
//     res.json('this')
// })

//router.get("/test", addPost)

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)

export default router