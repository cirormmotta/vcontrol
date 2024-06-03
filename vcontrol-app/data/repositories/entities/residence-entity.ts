import { ResidentEntity } from './resident-entity';

export interface ResidenceEntity {
  id?: number;
  name: string;
  residents?: ResidentEntity[];
}
export interface ResidenceResponseEntity {
  messages: string[];
  residence: ResidenceEntity;
}
