import { UserModel } from '../../models/user.model';
import { UseCase } from '../../../base/use-case';
import { UserRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultUserResponseModel } from '../../models';
export class EditUserUseCase
  implements UseCase<UserModel, Observable<DefaultUserResponseModel>>
{
  constructor(private userRepository: UserRepository) {}

  execute(params: UserModel): Observable<DefaultUserResponseModel> {
    return this.userRepository.update(params);
  }
}
