const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const DBconnect = require("./database/mongoDB");
DBconnect();

const router = require("./routes/router");
app.use("/api/v1", router);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello  welcome to backend   ');
  });
  
  