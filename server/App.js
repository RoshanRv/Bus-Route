const express = require("express")
const app = express()
const dotenv = require("dotenv")
const port = process.env.port || 9000
const cors = require("cors")
dotenv.config({
    path: "./.env",
})
const db = require("./config/db")

app.use(express.json())
app.use(cors())

db.connect((err) => {
    if (err) console.log(err.message)
    else console.log("connect")
})

app.get("/healthcheck", (req, res) => res.sendStatus(200))

app.post("/busdata", (req, res) => {
    console.log("hehe")
    const { startPlace, endPlace } = req.body

    db.query(
        "select * from pointbus where startTime<=timediff(current_time(),'00:10:00') and startPlace=? and endPlace=? limit 4",
        [startPlace, endPlace],
        (err, rows) => {
            if (err) res.status(400).send(err)
            else {
                const data1 = []
                if (rows.length > 0) {
                    data1.push(rows)
                    return res.status(200).send(data1)
                }
                if (rows.length == 0) {
                    db.query(
                        "select p.*,i.id as id1,i.busNo as busNo1, i.arrivalPlace as arrivalPlace1,i.arrivalTime as arrivalTime1,time_format(timediff(p.arrivalTime ,i.arrivalTime),'%i')*2 as price from interbus p , interbus i where p.arrivalPlace = ? and i.arrivalPlace = ? and p.busNo = i.busNo and p.arrivalTime <= timediff(current_date(),'00:10:00')",
                        [startPlace, endPlace],
                        (err, rows) => {
                            if (err) res.status(400).send(err)
                            else if (rows.length <= 0) {
                                let datas = []
                                db.query(
                                    "select p.busNo, p.endPlace as arrivalPlace1, p.startPlace as arrivalPlace, p.price , p.startTime as arrivalTime, p.endTime as arrivalTime1 from pointbus p,pointbus p2 where p.startPlace = ? and  p.endPlace=(select startPlace from pointbus where endPlace=?) and p2.startPlace = (select startPlace from pointbus where endPlace=?)",
                                    [startPlace, endPlace, endPlace],
                                    (err, rows) => {
                                        if (err)
                                            return res.status(400).send(rows)
                                        else {
                                            datas.push(rows[0])
                                            db.query(
                                                "select p2.busNo, p2.endPlace as arrivalPlace1, p2.startPlace as arrivalPlace, p2.price , p2.startTime as arrivalTime, p2.endTime as arrivalTime1 from pointbus p,pointbus p2 where p.startPlace = ? and  p.endPlace=(select startPlace from pointbus where endPlace=?) and p2.startPlace = (select startPlace from pointbus where endPlace=?)",
                                                [
                                                    startPlace,
                                                    endPlace,
                                                    endPlace,
                                                ],
                                                (err, rows) => {
                                                    if (err)
                                                        return res
                                                            .status(400)
                                                            .send(rows)
                                                    else {
                                                        datas.push(rows[0])
                                                        return res
                                                            .status(200)
                                                            .send([datas])
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            } else {
                                const data2 = []
                                data2.push(rows)
                                return res.status(200).send(data2)
                            }
                        }
                    )
                }
            }
        }
    )
})

app.post("/busdetails", (req, res) => {
    const { busNo } = req.body
    const details = {}
    db.query(
        "select * from  interbus where busNo = ? order by arrivalTime",
        [busNo],
        (err, result) => {
            if (err) res.status(404).send(err)
            else {
                details.busNo = busNo
                details.type = "normal"
                details.stops = []
                result.forEach((data) => {
                    details.stops.push(data.arrivalPlace)
                })
                const data = []
                data.push(result)
                res.status(200).send(details)
            }
        }
    )
})

app.listen(port, () => {
    console.log(`Server Runs on Port ${port}`)
})
