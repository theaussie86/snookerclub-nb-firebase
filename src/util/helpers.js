import moment from "moment";
import 'moment/locale/de'
moment.locale('de')

export const formatDate = (date, pattern = 'DD.MM.YYYY') => {
    if (date instanceof Date) {
        return moment(date).format(pattern)
    } else {
        const ms = Math.round((date.seconds * Math.pow(10, 9) + date.nanoseconds) * Math.pow(10, -6))
        return moment(ms).format(pattern)
    }
}

export const formatTime = (date) => {
    if (date instanceof Date) {
        return moment(date).format('HH:mm')
    } else {
        const ms = Math.round((date.seconds * Math.pow(10, 9) + date.nanoseconds) * Math.pow(10, -6))
        return moment(ms).format('HH:mm')
    }
}

export const formatMoney = (num, decimals = 0) => {
    const options = {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: decimals
    }
    return num.toLocaleString('de-DE', options)
}

export const calcRentAsCents = (duration, onlyGuest) => {
    const factor = onlyGuest ? 2 : 1;
    return Math.ceil(Math.floor(duration / 1000) * 3.5 / 360) * factor * 10
}

export const formatDuration = (duration) => {
    const dur = moment.duration(duration)
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

    return str
}