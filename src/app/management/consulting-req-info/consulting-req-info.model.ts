import { Consulting } from '../../../models/consulting.model';

export class ConsultingTable {
  public id: number;
  public result: Consulting[];

  constructor(id: number, result: Consulting[]) {
    this.id = id;
    this.result = result;
  }
}
