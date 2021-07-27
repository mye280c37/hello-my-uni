import {Consulting} from '../../../models/consulting.model';

export class ConsultingTableElement {
  public key: string;
  public name: string;
  public age: number;
  public gender: string;
  public phone: string;

  constructor(key: string, name: string, age: number, gender: string, phone: string) {
    this.key = key;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.phone = phone;
  }
}

export class ConsultingDetail {
  public id: string;
  public consulting: Consulting;

  constructor(id: string, consulting: Consulting) {
    this.id = id;
    this.consulting = consulting;
  }
}
