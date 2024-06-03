import { UserModel } from '../../models/user.model';
import { UseCase } from '../../../base/use-case';
import { UserRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultUserResponseModel } from '../../models';
export class FindUserUseCase
  implements UseCase<number, Observable<UserModel>>
{
  constructor(private userRepository: UserRepository) {}

  execute(id: number): Observable<UserModel> {
    return this.userRepository.find(id);
  }
}
