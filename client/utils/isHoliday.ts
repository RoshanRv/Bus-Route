import { HolidayProps } from "../store/useLocation"

const isHoliday = (holidays: HolidayProps["items"]) => {
    let flag = 0
    holidays.forEach((holiday) => {
        if (holiday.start.date == new Date().toISOString().split("T")[0])
            flag = 1
    })
    return flag === 1 ? "Yes" : "No"
}

export default isHoliday
