import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { TypeVisitEntity } from '../entities';

export class TypeVisitImplementationRepositoryMapper extends Mapper<
  TypeVisitEntity,
  domain.TypeVisitModel
> {
  mapFrom(param: TypeVisitEntity): domain.TypeVisitModel {
    return {
      id: param.id,
      name: param.name,
    };
  }
  mapTo(param: domain.TypeVisitModel): TypeVisitEntity {
    return {
      id: param.id,
      name: param.name,
    };
  }
}
