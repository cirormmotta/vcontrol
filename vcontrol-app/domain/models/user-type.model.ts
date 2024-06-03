import { DefaultResponseModel } from './default-response.model';

export interface UserTypeModel {
  id?: number;
  name: string;
  abilities: string[];
}
export interface UserTypeDefaultResponseModel extends DefaultResponseModel {
  userType: UserTypeModel;
}
export interface AbilitieModel {
  id: string;
  name: string;
}
