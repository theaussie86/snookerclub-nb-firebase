import { Timestamp } from "firebase/firestore";
import moment from "moment";
import 'moment/locale/de'
moment.locale('de')

export const formatDate = (date, pattern = 'DD.MM.YYYY') => {
    if (date instanceof Date) {
        return moment(date).format(pattern)
    } else {
        const ms = Math.round((date._seconds * Math.pow(10, 9) + date._nanoseconds) * Math.pow(10, -6))
        return moment(ms).format(pattern)
    }
}

export const convertTimestampToMoment = (ts) => {
    if (ts instanceof Timestamp) {
        return moment(ts.toDate())
    } else {
        const mills = Math.floor(Math.pow(10, 3) * ts._seconds + Math.pow(10, -6) * ts._nanoseconds)
        return moment(mills)
    }
}

export const setDate = (ts, unix = false) => {
    const date = unix ? moment.unix(ts) : moment(ts)
    return date.hour(12).toDate()
}

export const formatTime = (date) => {
    if (date instanceof Date) {
        return moment(date).format('HH:mm')
    } else {
        const ms = Math.round((date.seconds * Math.pow(10, 9) + date.nanoseconds) * Math.pow(10, -6))
        return moment(ms).format('HH:mm')
    }
}

export const getBillDate = (date) => {
    return moment(date).endOf('month').hour(12).toDate()
}

export const getBillDateStart = (date) => {
    return moment(date).endOf('month').startOf('day').toDate()
}

export const getBillDateEnd = (date) => {
    return moment(date).endOf('month').endOf('day').toDate()
}


export const formatMoney = (num, decimals = 0, isCents = false) => {
    if (isCents) num = num / 100
    const options = {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: decimals
    }
    return num.toLocaleString('de-DE', options)
}

export const calcRentAsCents = (duration, onlyGuest, timeUnit = null) => {
    if (timeUnit === 'seconds') duration = duration * 1000
    const factor = onlyGuest ? 2 : 1;
    return Math.ceil(Math.floor(duration / 1000) * 3.5 / 360) * factor * 10
}

export const formatDuration = (duration, unit = null, isShort = false) => {
    const dur = moment.duration(duration, unit)
    const s = dur.get('seconds')
    let m = s > 30 ? dur.get('minutes') + 1 : dur.get('minutes')

    let temp = 0
    if (m > 59) {
        temp++
        m -= 60
    }
    const h = dur.get('hours') + temp

    let str = h > 0 ? `${h} ${h === 1 ? 'Stunde' : 'Stunden'}` : ''
    str += m > 0 ? ` und ${m} ${m === 1 ? 'Minute' : 'Minuten'}` : ''

    return isShort ? `${h > 0 && h + 'h'}${m > 0 && ' ' + m + 'min'}` : str
}

export const getDueDate = (billDate, pattern = 'DD.MM.YYYY') => {
    const date = convertTimestampToMoment(billDate)
    return date.add(1, 'month').endOf('month').hour(12).format(pattern)
}