export class Review {
  public title: string;
  public body: string;
  public author: string;
  public password: string;
  public consultingTime: string;

  constructor(title: string, body: string, author: string, password: string, consultingTime: string){
    this.title = title;
    this.body = body;
    this.author = author;
    this.password = password;
    this.consultingTime = consultingTime;
  }
}
