import { ResidenceEntity } from './residence-entity';

export interface ResidentEntity {
  id?: number;
  residences_id: number;
  name: string;
  phone?: string;
  residence?: ResidenceEntity;
}
export interface ResidentResponseEntity {
  messages: string[];
  resident: ResidentEntity;
}
