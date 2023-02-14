const paintingRoute = require("./routes/paintingRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// database connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Successful DB Connection!"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/painting", paintingRoute);
app.use("/api/cart", cartRoutes);


try {
  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}!`);
  });
} catch (error) {
  console.log(error);
}