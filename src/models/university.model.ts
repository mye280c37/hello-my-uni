export class University {
  public university: string;
  public area: string;
  public type: number;
  public weight: number[];
  public standard: number[];
  public result: number[];
  public func: any;
  public link: string;

  constructor(uni: string, area: string, type: number, weight: number[], standard: number[], result: number[], func: any, link: string) {
    this.university = uni;
    this.area = area;
    this.type = type;
    this.weight = weight;
    this.standard = standard;
    this.result = result;
    this.func = func;
    this.link = link;
  }
}
