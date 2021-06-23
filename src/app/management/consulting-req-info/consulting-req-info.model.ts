export class ConsultingTable {
  public id: number;
  public key: string;
  public result: any[];

  constructor(id: number, key: string, result: any[]) {
    this.id = id;
    this.key = key;
    this.result = result;
  }
}
