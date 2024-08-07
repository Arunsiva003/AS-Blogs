import React, { useContext, useEffect, useState } from "react"
import "./details.css"
import "../../components/header/header.css"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineDelete } from "react-icons/ai"
import { Context } from "../../context/Context"

export const DetailsPages = () => {
  const location = useLocation()
  console.log(location)
  const path = location.pathname.split("/")[2]

  // step 4 for update
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [update, setUpdate] = useState(false)
  const [commentText, setCommentText] = useState("");

  //setp 2
  const [post, setPost] = useState({})
  const getPost = async () => {
    try {
      const res = await axios.get("https://as-mern-blog.onrender.com/posts/" + path);
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost(); // Call the getPost function here
  }, [path]);
  // step 3
  // file create garne time add garne
  // const PublicFlo = "http://localhost:5000/images/"
  const { user } = useContext(Context)

  const handleDelete = async () => {
    try {
      await axios.delete(`https://as-mern-blog.onrender.com/posts/${post._id}`, { data: { username: user.username } })
      window.location.replace("/")
    } catch (error) {}
  }

  // setp 4
  const handleUpdate = async () => {
    try {
      await axios.put(`https://as-mern-blog.onrender.com/posts/${post._id}`, { username: user.username, title, desc })
      window.location.reload()
    } catch (error) {}
  }

  //comment update
  const handleComment = async () => {
    if (commentText.trim() !== "") {
      try {
        await axios.post(
          `https://as-mern-blog.onrender.com/posts/${post._id}/comments`,
          {
            text: commentText,
            username: user.username,
          }
        );
        // Clear the input field and refresh comments
        setCommentText("");
        getPost();
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <>
      <section className='singlePage'>
        <div className='container'>
          <div className='left'>{post.photo && <img src={post.photo} alt='' />}</div>
          <div className='right'>
            {post.username === user?.username && (
              <div className='buttons'>
                <button className='button' onClick={() => setUpdate(true)}>
                  <BsPencilSquare />
                </button>
                <button className='button' onClick={handleDelete}>
                  <AiOutlineDelete />
                </button>
                {update && (
                  <button className='button' onClick={handleUpdate}>
                    Update
                  </button>
                )}
              </div>
            )}

            {update ? <input type='text' value={title} className='updateInput' onChange={(e) => setTitle(e.target.value)} /> : <h1>{post.title}</h1>}
            {update ? (
              <textarea value={desc} cols='30' rows='10' className='updateInput' onChange={(e) => setDesc(e.target.value)}></textarea>
            ) : (
              // Map through desc paragraphs and render each in a separate <p> element
              <div>
                {desc.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}

            <p>
              Author: <Link to={`/?user=${post.username}`}>{post.username}</Link>
            </p>
          </div>
        </div>
        {post.comments ?
        <div className="comments">
          {/* <h3>Comments</h3> */}
          
          {user && (
            <div className="comment-form">
              <textarea className="comment-box"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <button className="add-button" onClick={handleComment}>Add</button>
            </div>
          )}
          {post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.text}</p>
              <span>By {comment.username}</span>
              <span>{comment.timestamps}</span>
            </div>
          ))}
        </div> : <p>No comments....</p>}

      </section>
    </>
  )
}
