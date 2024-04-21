export const definesNumberOfDaysPassed = (entryDate) => {
    const todayDate = new Date()

    const [day, month, year] = entryDate.split('/')
    const entryDateInDateFormat = new Date(year, month - 1, day, 0, 0, 0)

    const differenceInMilliseconds = Math.abs(todayDate - entryDateInDateFormat)

    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24))

    return differenceInDays - 1
}