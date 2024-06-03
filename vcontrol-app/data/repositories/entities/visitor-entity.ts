export interface VisitorEntity {
  id?: number;
  name: string;
  cpf: string;
  picture?: string;
  phone: string;
}
export interface VisitorResponseEntity {
  messages: string[];
  visitor: VisitorEntity;
}
