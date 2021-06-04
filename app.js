const mongoose = require("mongoose");

const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

mongoose
  .connect("mongodb://localhost:27017/nuxt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//routes

app.use(authRoutes);

//port
const port = 9000;

//start server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
