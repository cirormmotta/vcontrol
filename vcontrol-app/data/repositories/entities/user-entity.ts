import { UserTypeEntity } from "./user-type-entity";

export interface UserEntity {
  id?: string;
  name: string;
  user_type_id: number;
  email: string;
  user_type?: UserTypeEntity;
  password?: string;
  password_confirmation?: string;
}
