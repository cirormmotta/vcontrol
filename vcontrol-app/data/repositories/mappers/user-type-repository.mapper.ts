import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { UserTypeEntity } from '../entities';

export class UserTypeImplementationRepositoryMapper extends Mapper<
  UserTypeEntity,
  domain.UserTypeModel
> {
  mapFrom(param: UserTypeEntity): domain.UserTypeModel {
    return {
      id: param.id,
      name: param.name,
      abilities: param.abilities,
    };
  }
  mapTo(param: domain.UserTypeModel): UserTypeEntity {
    return {
      id: param.id,
      name: param.name,
      abilities: param.abilities,
    };
  }
}
