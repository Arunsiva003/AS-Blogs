import React, { useEffect } from "react"
import "./create.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import { useState } from "react"
import { useContext } from "react"
import { Context } from "../../context/Context"
import axios from "axios"
import { category } from "../../assets/data/data"

export const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [file, setFile] = useState(null)
  const { user } = useContext(Context)
  const [imageUrl,setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Life");

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(selectedCategory)
    const newPost = {
      username: user.username,
      title,
      desc,
      file,
      categories: [selectedCategory], 
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      data.append("upload_preset","pctll1ta");
      
      try {
        const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/dn5iikaas/image/upload", data);
        console.log(cloudinaryResponse.data.url);
        
        newPost.photo = cloudinaryResponse.data.url;
        setImageUrl(cloudinaryResponse.data.url);
        
        console.log("newpost photo: ", newPost.photo);
      } catch (error) {
        console.error(error);
      }
      
      try {
        const postResponse = await axios.post("https://as-mern-blog.onrender.com/posts", newPost);
        window.location.replace("/post/" + postResponse.data._id);
      } catch (error) {
        console.error(error);
      }
  }
}

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <div className='img '>{file && <img src={URL.createObjectURL(file)} alt='images' />}</div>
          <form onSubmit={handleSubmit}>
            <div className='inputfile flexCenter'>
              <label htmlFor='inputfile'>
                <IoIosAddCircleOutline />
              </label>
              <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <input type='text' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <textarea name='' id='' cols='30' rows='10' onChange={(e) => setDesc(e.target.value)}></textarea>
            
            {/* categories selection */}
            <select value={selectedCategory} name="category" onChange={(e) => setSelectedCategory(e.target.value)}>
              {category.map((item,ind)=>(
                <option key={ind} value={item.category}>{item.category}</option>
              ))}
            </select>
            
            <button className='button'>Create Post</button>
          </form>
        </div>
      </section>
    </>
  )
}
