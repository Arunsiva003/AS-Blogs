//---- step : 1.1
const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const multer = require("multer")
const path = require("path")
const cors = require('cors')
const authRoute = require("./routes/auth")
const authUser = require("./routes/user")
const authPost = require("./routes/posts")
const authCat = require("./routes/categories")

dotenv.config()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")))

//---- step : 1.3
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*  useCreateIndex: true,
    useFindAndModify: true,*/
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err))

//---- step : 3
const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images")
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name)
  },
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded")
})

//routes
app.use("/auth", authRoute)
app.use("/users", authUser)
app.use("/posts", authPost)
app.use("/category", authCat)
// app.use("/contact",authContact);


//contact mail

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asamarun2003@gmail.com", // replace with your email
      pass: "Arunsiva@2003", // replace with your email password
    },
  });

  // Setup email data
  const mailOptions = {
    from: "asamarun2003@gmail.com", // replace with your email
    to: "Arunsiva@2003@gmail.com", // replace with your email
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email", details: error.message });
  }
});


//server:
app.listen("5000", () => {
  console.log("backend running...")
})
