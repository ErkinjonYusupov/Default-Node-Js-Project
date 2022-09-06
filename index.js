const express = require('express')
const app = express()
app.use(express.json())
const cors = require("cors");
app.use(cors());
require('dotenv').config()


//=====fayl uchun====
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

app.use(express.static(__dirname + "/uploads"));
app.use("/uploads", express.static("uploads"));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//======fayl yuklash end=====

// routes
const users=require('./routers/users')

 
// --------apilar---------
app.use('/users', users)


const { PORT, HOST } = process.env;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`);
})