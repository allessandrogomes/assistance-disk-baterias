export const defineDaysOfDelay = (numberOfDaysPassed, deadlineDays) => {
    let daysOfDelay = numberOfDaysPassed - deadlineDays
    daysOfDelay < 0 ? daysOfDelay = 0 : ''
    return daysOfDelay
}