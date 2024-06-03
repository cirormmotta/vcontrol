import { UserTypeModel } from "./user-type.model";

export interface UserModel {
  id?: string;
  name: string;
  email: string;
  userTypeId: number;
  userType?: UserTypeModel;
  password?: string;
  passwordConfirmation?: string;
}