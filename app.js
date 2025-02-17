const express = require("ecpress");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
dotenv.config();

//database connection

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies

app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup

//error handling

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
