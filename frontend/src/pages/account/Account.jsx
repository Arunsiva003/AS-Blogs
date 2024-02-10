import React, { useContext, useState } from "react"
import { Context } from "../../context/Context"
import "./account.css"
import { IoIosAddCircleOutline } from "react-icons/io"
import axios from "axios"

export const Account = () => {
  const { user, dispatch } = useContext(Context)

  // same from create file
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [succ, setSucc] = useState(false)
  const PublicFlo = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {


    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    const updateUser = {
      userId: user._id,
      username,
      profilePic:profilePicUrl,
      email,
      password,
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("name", filename)
      data.append("file", file)
      data.append("upload_preset","pctll1ta");

      
      try {
        const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/dn5iikaas/image/upload", data)
        console.log("in acc pic:",cloudinaryResponse.data.url)
        setProfilePicUrl(cloudinaryResponse.data.url);
      } catch (error) {
        console.log(error)
      }
    }
    try {
      updateUser.profilePic = profilePicUrl;
      const res = await axios.put("https://as-mern-blog.onrender.com/users/" + user._id, updateUser)
      setSucc(true)
      dispatch({ type: "UPDATE_SUCC", payload: res.data })
      window.location.reload()
    } catch (error) {
      dispatch({ type: "UPDATE_FAILED" })
    }
  }
  return (
    <>
      <section className='accountInfo'>
        <div className='container boxItems'>
          <h1>Account Information</h1>
          <div className='content'>
            <div className='left'>
              <div className='img flexCenter'>
                <img src={file ? URL.createObjectURL(file) : PublicFlo + user.profilePic} alt='' />
                <label htmlFor='inputfile'>
                  <IoIosAddCircleOutline className='icon' />
                </label>
                <input type='file' id='inputfile' style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <form className='right' onSubmit={handleSubmit}>
              <label htmlFor=''>Username</label>
              <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
              <label htmlFor=''>Email</label>
              <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor=''>Password</label>
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
              <button className='button' type='submit'>
                Update
              </button>
              {succ && <span>Profile is Updated</span>}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
