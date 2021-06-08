export class GedConversionResult {
  public university: string;
  public area: string;
  public converted: any;
  public link: any;

  constructor(university: string, area: string, converted: any, link: any) {
    this.university = university;
    this.area = area;
    this.converted = converted;
    this.link = link;
  }
}

export class GedConversionTable {
  public id: number;
  public result: GedConversionResult[];

  constructor(id: number, result: GedConversionResult[]) {
    this.id = id;
    this.result = result;
  }
}
