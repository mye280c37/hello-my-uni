export class Comment {
  public id: string;
  public date: string;
  public contents: string;

  constructor(id: string, date: string, contents: string) {
    this.id = id;
    this.date = date;
    this.contents = contents;
  }

}

export class Consulting {
  public key: string;
  public name: string;
  public age: number;
  public gender: string;
  public phone: string;
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
  // tslint:disable-next-line:variable-name
  public hope_reason :string;
  public note: string;
  // tslint:disable-next-line:variable-name
  public check: number;
  public account: string;
  public comments: Comment[];

  constructor(
    key: string, name: string, age: number, gender: string, phone: string, scores: any, average: number, option: string, application: string,
    // tslint:disable-next-line:variable-name
    application_reason: string, hope: any, hope_reason: string, note: string, check: number,
    account: string, comments: Comment[]
  ) {
    this.key = key;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.phone = phone;
    this.scores = scores;
    this.average = average;
    this.option = option;
    this.application = application;
    this.application_reason = application_reason;
    this.hope = hope;
    this.hope_reason = hope_reason;
    this.note = note;
    this.check = check;
    this.account = account;
    this.comments = comments;
  }
}
