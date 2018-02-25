import moment from 'moment'
export default (date, format = 'MMM Do, YYYY') => moment(date).format(`${format} H:m`)
