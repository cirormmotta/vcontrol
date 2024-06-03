export interface UserTypeEntity {
  id?: number;
  name: string;
  abilities: string[];
}
export interface UserTypeResponseEntity {
  messages: string[];
  userType: UserTypeEntity;
}
