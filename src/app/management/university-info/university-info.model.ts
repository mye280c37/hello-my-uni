import { University } from '../../../models/university.model';

export class UniversityInfoTable {
  public id: number;
  public uniInfo: [string, University][];

  constructor(id: number, uniInfo: [string, University][]) {
    this.id = id;
    this.uniInfo = uniInfo;
  }
}
