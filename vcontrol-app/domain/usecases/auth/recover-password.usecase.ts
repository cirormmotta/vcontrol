import { Observable } from 'rxjs';
import { AuthModel } from '../../models';
import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';
import { DefaultResponseModel } from '../../models';

export class RecoverPasswordUseCase
  implements UseCase<AuthModel, Observable<DefaultResponseModel>>
{
  constructor(private authRepository: AuthRepository) {}

  execute(params: AuthModel): Observable<DefaultResponseModel> {
    return this.authRepository.recoverPassword(params);
  }
}
