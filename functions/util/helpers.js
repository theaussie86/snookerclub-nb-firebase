const moment = require('moment')
require('moment/locale/de')

moment.locale('de')

const convertTimestampToMoment = (ts) => {
    const mills = Math.floor(Math.pow(10, 3) * ts._seconds + Math.pow(10, -6) * ts._nanoseconds)
    return moment(mills)
}
exports.convertTimestampToMoment = convertTimestampToMoment

exports.calcRentAsCents = (end, start, onlyGuest) => {
    const duration = end.seconds - start.seconds
    const factor = onlyGuest ? 2 : 1;
    const price = Math.ceil(Math.floor(duration) * 3.5 / 360) * factor * 10
    return price
}

exports.getMembershipFeeOfFollowingMembership = (end, mems) => {
    const startNextMembership = convertTimestampToMoment(end).add(2, 'weeks').startOf('month').hour(12)
    const nextMembership = mems.filter(mem => startNextMembership.isSame(convertTimestampToMoment(mem.start), 'day'))
    return nextMembership.length === 1 ? nextMembership[0].fee : 0;
}

exports.formatBillDate = (date, pattern = 'MMMM YYYY') => {
    const d = moment(date)
    return d.format(pattern)
}