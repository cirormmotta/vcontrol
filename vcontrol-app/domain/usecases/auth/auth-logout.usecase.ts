import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';
import { DefaultResponseModel } from '../../models';

export class AuthLogoutUseCase
  implements UseCase<void, Observable<DefaultResponseModel>>
{
  constructor(private authRepository: AuthRepository) {}
  execute(): Observable<DefaultResponseModel> {
    return this.authRepository.logout();
  }
}
