import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';
import { DefaultResponseModel } from '../../models';
export interface AuthNewPasswordParam {
  token: string;
  password: string;
  confirm_password: string;
  email: string;
}
export class NewPasswordUseCase
  implements UseCase<AuthNewPasswordParam, Observable<DefaultResponseModel>>
{
  constructor(private authRepository: AuthRepository) {}

  execute(params: AuthNewPasswordParam): Observable<DefaultResponseModel> {
    return this.authRepository.newPassword(params);
  }
}
