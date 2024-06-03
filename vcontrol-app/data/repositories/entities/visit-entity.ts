import { ResidenceEntity } from './residence-entity';
import { ResidentEntity } from './resident-entity';
import { TypeVisitEntity } from './type-visit-entity';
import { VisitorEntity } from './visitor-entity';

export interface VisitEntity {
  id?: number;
  car_license_plate?: string;
  residences_id: number;
  residents_id: number;
  type_visits_id: number;
  visitors_id: number;
  residence?: ResidenceEntity;
  resident?: ResidentEntity;
  type_visit?: TypeVisitEntity;
  visitor?: VisitorEntity;
}
export interface VisitResponseEntity {
    messages: string[];
    visit: VisitEntity;
  }
  
