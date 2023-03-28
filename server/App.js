const express = require("express");
const app = express();
const port = process.env.port || 9000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = require("./config/db");

db.connect((err) => {
  if (err) console.log(err);
  else console.log("works");
});

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Nice");
});

app.listen(port, () => {
  console.log(`Server runs on ${port}`);
});
