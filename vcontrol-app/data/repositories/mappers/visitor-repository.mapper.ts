import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { VisitorEntity } from '../entities/visitor-entity';

export class VisitorImplementationRepositoryMapper extends Mapper<
  VisitorEntity,
  domain.VisitorModel
> {
  mapFrom(param: VisitorEntity): domain.VisitorModel {
    return {
      id: param.id,
      name: param.name,
      cpf: param.cpf,
      phone: param.phone,
      picture: param.picture,
    };
  }
  mapTo(param: domain.VisitorModel): VisitorEntity {
    return {
      id: param.id,
      name: param.name,
      cpf: param.cpf,
      phone: param.phone,
      picture: param.picture,
    };
  }
}
