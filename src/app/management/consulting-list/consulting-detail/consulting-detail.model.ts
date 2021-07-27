import {Consulting} from '../../../../models/consulting.model';

export class ConsultingDetail {
  public id: string;
  public consulting: Consulting;

  constructor(id: string, consulting: Consulting) {
    this.id = id;
    this.consulting = consulting;
  }
}
