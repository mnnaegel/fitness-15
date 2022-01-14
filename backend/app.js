const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();
const db = mongoose.connect(
  "mongodb+srv://nlai1328:password@cluster0.9vwtf.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("homepage");
});

app.listen(3000, () => console.log("Listening on port 3000"));

const userRouter = require("./routes/userRoute");
app.use("/users", userRouter);
