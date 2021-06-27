export class Essay {
  public universiy: string;
  public category: string;
  public author: string;
  public password: string;
  public complete: boolean;

  constructor(university: string, category: string, author: string, password: string, complete: boolean){
    this.universiy = university;
    this.category = category;
    this.author = author;
    this.password = password;
    this.complete = complete;
  }
}
