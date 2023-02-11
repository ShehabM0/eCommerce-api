const authRoute = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(express.json());

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Successful DB Connection!"))
  .catch((err) => {
    console.log(err);
  });



app.use("/api/auth", authRoute);


try {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}!`);
  });
} catch (error) {
  console.log(error);
}