import { UseCase } from '../../../base/use-case';
import { UserRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultUserResponseModel } from '../../models';
export interface ChangePasswordParam {
  password: string;
  password_confirmation: string;
  id: number;
}
export class ChangePasswordUseCase
  implements UseCase<ChangePasswordParam, Observable<DefaultUserResponseModel>>
{
  constructor(private userRepository: UserRepository) {}

  execute(params: ChangePasswordParam): Observable<DefaultUserResponseModel> {
    return this.userRepository.changePassword(params);
  }
}
