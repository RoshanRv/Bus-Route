const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const port = process.env.port || 9000;
const db = require("./config/db");
dotenv.config({
  path: "./.env",
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
const cors = require("cors");
app.use(cors());
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connect");
  }
});

app.get("/busdata", (req, res) => {
  const { startPlace, endPlace } = req.body;

  db.query(
    "select * from pointbus where stateTime>=timediff(current_time(),'00:10:00') and startPlace=? and endPlace=? limit 4",
    [startPlace, endPlace],
    (err, rows) => {
      if (err) {
        res.status(400).send(err);
      } else {
        console.log(rows);
        if (rows.length <= 0) {
          db.query(
            "select p.*,i.*,time_format(timediff(p.arrivalTime ,i.arrivalTime),'%i')*2 as price from interbus p , interbus i where p.arrivalPlace = ? and i.arrivalPlace = ? and p.busNo = i.busNo and p.arrivalTime >= timediff(current_date(),'00:10:00')",
            [startPlace, endPlace],
            (err, rows) => {
              if (err) {
                res.status(400).send(err);
              } else {
                res.status(200).send(rows);
              }
            }
          );
          return 0;
        }
        res.status(200).send(rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server Runs on Port ${port}`);
});
