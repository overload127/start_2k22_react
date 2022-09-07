export const INTERVAL_TYPE_MINUTES = 'M';
export const INTERVAL_TYPE_HOURS = 'H';
export const INTERVAL_TYPE_DAYS = 'D';


const SECOND_1 = 1 * 1000;
const MINUTE_1 = SECOND_1 * 60;
const MINUTE_15 = MINUTE_1 * 15;
const HOUR_1 = MINUTE_15 * 4;
const DAY_1 = HOUR_1 * 24;
const DAY_4 = DAY_1 * 4;


export function getDiscreteTimeMinutes(datetime, interval) {
  const discreteDatetime = new Date(datetime);
  let currentMinutes = discreteDatetime.getMinutes();
  if(currentMinutes % interval) {
    currentMinutes = currentMinutes + interval - currentMinutes % interval;
  }
  discreteDatetime.setMinutes(currentMinutes, 0, 0);
  return discreteDatetime;
}


export function getDiscreteTimeHours(datetime, interval) {
  const discreteDatetime = new Date(datetime);
  let currentHours = discreteDatetime.getHours();
  if(currentHours % interval) {
    currentHours = currentHours + interval - currentHours % interval;
  }
  discreteDatetime.setHours(currentHours, 0, 0, 0);
  return discreteDatetime;
}


export function getDiscreteTimeDays(datetime, interval) {
  const discreteDatetime = new Date(datetime);
  let currentDate = discreteDatetime.getDate();
  if(currentDate % interval) {
    currentDate = currentDate + interval - currentDate % interval;
  }
  discreteDatetime.setDate(currentDate);
  discreteDatetime.setHours(0, 0, 0, 0);
  return discreteDatetime;
}


export default function getDiscreteTime(datetime, interval, typeInterval = INTERVAL_TYPE_MINUTES) {
  switch (typeInterval) {
    case INTERVAL_TYPE_MINUTES:
      return getDiscreteTimeMinutes(datetime, interval);
    case INTERVAL_TYPE_HOURS:
      return getDiscreteTimeHours(datetime, interval);
    case INTERVAL_TYPE_DAYS:
      return getDiscreteTimeDays(datetime, interval);
    default:
      console.error('Указан неправильный тип периода.');
      return datetime;
  }
}


export function getPeriodSO(startDateTime, endDateTime) {
  const periodData = endDateTime - startDateTime;

  let period = MINUTE_15;
  if (periodData > DAY_1 && periodData <= DAY_4) {
    period = HOUR_1;
  } else if (periodData > DAY_4) {
    period = DAY_1;
  }
  return period;
}


export function getPeriodKTS(startDateTime, endDateTime) {
  const periodData = endDateTime - startDateTime;

  let period = MINUTE_15;
  if (periodData <= DAY_4) {
    period = HOUR_1;
  } else if (periodData > DAY_4) {
    period = DAY_1;
  }
  return period;
}