import { UserModel } from '../../models/user.model';
import { UseCase } from '../../../base/use-case';
import { UserRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultUserResponseModel } from '../../models';
export class DeleteUserUseCase
  implements UseCase<number, Observable<DefaultUserResponseModel>>
{
  constructor(private userRepository: UserRepository) {}

  execute(userId: number): Observable<DefaultUserResponseModel> {
    return this.userRepository.delete(userId);
  }
}
