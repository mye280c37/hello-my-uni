export class DateTimeInfo {
  date: string;
  timeList: string[];

  constructor(date: string, timeList: string[]) {
    this.date = date;
    this.timeList = timeList;
  }
}

export class MonDateTimeInfo {
  month: string;
  dateTimeList: DateTimeInfo[];

  constructor(month: string, dateTimeList: DateTimeInfo[]) {
    this.month = month;
    this.dateTimeList = dateTimeList;
  }
}
