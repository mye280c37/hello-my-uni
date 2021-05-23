export class Review {
  public id: number;
  public title: string;
  public body: string;
  public author: string;
  public password: string;
  public time: string;

  constructor(id: number, title: string, body: string, author: string, password: string, time: string){
    this.id = id;
    this.title = title;
    this.body = body;
    this.author = author;
    this.password = password;
    this.time = time;
  }
}
