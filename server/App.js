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
    console.log("hehehehehheheehh")
    const { startPlace, endPlace } = req.body

    console.log(startPlace, endPlace)

    db.query(
        "select busNo, endPlace as arrivalPlace1, startPlace as arrivalPlace, startTime as arrivalTime,endTime as arrivalTime1, freeBus , type, price from pointbus where  startPlace=? and endPlace=? limit 4",
        [startPlace, endPlace],
        (err, rows) => {
            if (err) {
                console.log(err)
                res.status(400).send(err)
            } else {
                const data1 = []
                if (rows.length > 0) {
                    data1.push(rows)
                    return res.status(200).send(data1)
                }
                if (rows.length == 0) {
                    db.query(
                        "select p.*,i.id as id1,i.busNo as busNo1, i.arrivalPlace as arrivalPlace1,i.arrivalTime as arrivalTime1,time_format(timediff(p.arrivalTime ,i.arrivalTime),'%i')*2 as price from interbus p , interbus i where p.arrivalPlace = ? and i.arrivalPlace = ? and p.busNo = i.busNo and p.arrivalTime <= timediff(current_date(),'00:10:00') and p.busNo=(select busNo from breakbus where p.busNo=busNo and isBreakDown=0) and i.busNo=(select busNo from breakbus where busNo=i.busNo and isBreakDown=0)",
                        [startPlace, endPlace],
                        (err, rows) => {
                            if (err) res.status(400).send(err)
                            else if (rows.length <= 0) {
                                let datas = []
                                db.query(
                                    "select p1.busNo, p1.endPlace as arrivalPlace1, p1.startPlace as arrivalPlace, p1.price , p1.startTime as arrivalTime, p1.endTime as arrivalTime1,p1.freeBus as isfreeBus from pointbus p1,pointbus p2 where p1.startPlace=? and p2.endPlace=(select endPlace from pointbus where endPlace=? limit 1) and p2.endPlace=? and p1.endPlace=p2.startPlace and p1.busNo=(select busNo from breakbus where p1.busNo=busNo and isBreakDown=0) and p2.busNo=(select busNo from breakbus where busNo=p2.busNo and isBreakDown=0)",
                                    [startPlace, endPlace, endPlace],
                                    (err, rows) => {
                                        if (err) {
                                            console.log(err)
                                            return res.status(400).send(rows)
                                        } else {
                                            datas.push([rows[0]])
                                            if (rows[1] != null) {
                                                datas.push([rows[1]])
                                            }
                                            db.query(
                                                "select p2.busNo, p2.endPlace as arrivalPlace1, p2.startPlace as arrivalPlace, p2.price , p2.startTime as arrivalTime, p2.endTime as arrivalTime1,p2.freeBus as isfreeBus  from pointbus p1,pointbus p2 where p1.startPlace=? and p2.endPlace=(select endPlace from pointbus where endPlace=? limit 1) and p2.endPlace=? and p1.endPlace=p2.startPlace and p1.busNo=(select busNo from breakbus where p1.busNo=busNo and isBreakDown=0) and p2.busNo=(select busNo from breakbus where busNo=p2.busNo and isBreakDown=0)",
                                                [
                                                    startPlace,
                                                    endPlace,
                                                    endPlace,
                                                ],
                                                (err, rows) => {
                                                    if (err) {
                                                        console.log(err)
                                                        return res
                                                            .status(400)
                                                            .send(rows)
                                                    } else {
                                                        datas[0].push(rows[0])
                                                        if (rows[1] != null) {
                                                            datas[1].push(
                                                                rows[1]
                                                            )
                                                        }
                                                        console.log(datas)
                                                        return res
                                                            .status(200)
                                                            .send(datas)
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            } else {
                                const data2 = []
                                data2.push(rows)
                                console.log(data2)
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
        "select * from  interbus i inner join pointbus p  on i.busNo = p.busNo  where i.busNo = ? order by arrivalTime",
        [busNo],
        (err, result) => {
            if (err) res.status(404).send(err)
            else {
                details.busNo = busNo
                details.type = result[0].type
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

app.get("/breakdown", (req, res) => {
    db.query("select * from breakbus where isBreakdown = 1;", (err, result) => {
        if (err) console.log(err)
        else {
            res.status(200).send(result)
        }
    })
})

app.listen(port, () => {
    console.log(`Server Runs on Port ${port}`)
})
