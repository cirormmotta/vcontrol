import { Mapper } from '../../../base/mapper';
import { UserModel } from '../../../domain/models/user.model';
import { UserEntity } from '../entities/user-entity';

export class UserImplementationRepositoryMapper extends Mapper<
  UserEntity,
  UserModel
> {
  mapFrom(param: UserEntity): UserModel {
    return {
      id: param.id,
      name: param.name,
      email: param.email,
      userType: param.user_type,
      userTypeId: param.user_type_id,
      password: param?.password,
      passwordConfirmation: param?.password_confirmation,
    };
  }
  mapTo(param: UserModel): UserEntity {
    return {
      id: param.id,
      name: param.name,
      user_type_id: param.userTypeId,
      user_type: param.userType,
      email: param.email,
      password: param?.password,
      password_confirmation: param?.passwordConfirmation,
    };
  }
}
