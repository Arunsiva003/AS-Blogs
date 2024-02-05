import React from "react"
import "./blog.css"
import { blog } from "../../assets/data/data"
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai"
import { Link } from "react-router-dom"

export const Card = ({ posts }) => {

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {posts.map((item) => (
            <div className='box boxItems' key={item.id}>
              <div className='img'>{item.photo && (
              <img src={item.photo} alt=""
                onError={(e) => {
                  const randomImage = blog[Math.floor(Math.random() * 10)].cover;
                  e.target.src = randomImage;
                  e.onError=null;
                }}          
              />)}
              </div>
              <div className='details' key={item.id+1}>
                <div className='tag'>
                  <AiOutlineTags className='icon' />
                  {item.categories.map((c) => (
                    <a href='/'>#{c.name}</a>
                  ))}
                </div>
                <Link to={`/post/${item._id}`}>
                  <h3>{item.title}</h3>
                <p>{item.desc.slice(0, 180)}...</p>
                <div className='date'>
                  <AiOutlineClockCircle className='icon' /> <label htmlFor=''>{new Date(item.createdAt).toDateString()}</label>
                  <AiOutlineComment className='icon' /> <label htmlFor=''>27</label>
                  <AiOutlineShareAlt className='icon' /> <label htmlFor=''>SHARE</label>
                </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
