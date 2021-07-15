export class ConsultingDate {
  month: string;
  date: string;
  timeList: string[];

  constructor(month: string, date: string, timeList: string[]) {
    this.month = month;
    this.date = date;
    this.timeList = timeList;
  }
}
