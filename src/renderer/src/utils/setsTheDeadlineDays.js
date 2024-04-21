import { stringToDate } from "./stringToDate"

export const setsTheDeadlineDays = (entryDate, returnDate) => {
    const entryDateInDateFormat = stringToDate(entryDate)
    const returnDateInDateFormat = stringToDate(returnDate)

    const differenceInMilliseconds = Math.abs(returnDateInDateFormat - entryDateInDateFormat)

    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))

    return differenceInDays
}