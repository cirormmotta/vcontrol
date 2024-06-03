export interface TypeVisitEntity {
  id?: number;
  name: string;
}
export interface TypeVisitResponseEntity {
  messages: string[];
  typeVisit: TypeVisitEntity;
}
