import moment from "moment";
import 'moment/locale/de'
moment.locale('de')

export const formatDate = (date) => {
    if (date instanceof Date) {
        return moment(date).format('DD.MM.YYYY')
    } else {
        const ms = Math.round((date.seconds * Math.pow(10, 9) + date.nanoseconds) * Math.pow(10, -6))
        return moment(ms).format('DD.MM.YYYY')
    }
}