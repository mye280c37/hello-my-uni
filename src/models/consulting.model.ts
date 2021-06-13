export class Consulting {
  public key: string;
  public name: string;
  public age: number;
  public gender: string;
  public scores: {
    korean: number,
    english: number,
    math: number,
    society: number,
    science: number,
    history: number,
    choice: number
  };
  public average: number;
  public option: string;
  public application: string;
  public description: string;
  // tslint:disable-next-line:variable-name
  public application_reason: string;
  public hope: {
    1: {
      uni: string,
      major: string
    },
    2: {
      uni: string,
      major: string
    },
    3: {
      uni: string,
      major: string
    },
    4: {
      uni: string,
      major: string
    },
    5: {
      uni: string,
      major: string
    },
    6: {
      uni: string,
      major: string
    }
  };
  public note: string;
  // tslint:disable-next-line:variable-name
  public date_time: string;
  public check: number;
  public account: string;
  public comment: string;
  public payment: boolean;

  constructor(
    key: string, name: string, age: number, gender: string, scores: any, average: number, option: string, application: string,
    // tslint:disable-next-line:variable-name
    description: string, application_reason: string, hope: any, note: string, date_time: string, check: number,
    account: string, comment: string, payment: boolean
  ) {
    this.key = key;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.scores = scores;
    this.average = average;
    this.option = option;
    this.application = application;
    this.description = description;
    this.application_reason = application_reason;
    this.hope = hope;
    this.note = note;
    this.date_time = date_time;
    this.check = check;
    this.account = account;
    this.comment = comment;
    this.payment = payment;
  }
}
