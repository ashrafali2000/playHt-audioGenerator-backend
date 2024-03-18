const express = require("express");
const bodyParser = require("body-parser");
const speechRoutes = require("./routes/speech.js");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

app.use("/speech", speechRoutes);

app.get("/", (req, res) => {
  res.status(200).json("Welcome, your app is working well");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
