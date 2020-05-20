import * as moment from 'moment';

export default function commentsDateFormat(
  date,
  yearMonthDay = 'MMMM D, YYYY',
  time = 'hh:mma'
) {
  return `${moment(date).format(yearMonthDay)} at ${moment(date).format(
    time
  )} CET`;
}
