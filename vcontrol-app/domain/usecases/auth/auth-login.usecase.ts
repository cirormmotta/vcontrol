import { Observable } from 'rxjs';
import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';
import { AuthModel } from '../../models';

export class AuthLoginUseCase implements UseCase<AuthModel, Observable<string>> {

    constructor(private authRepository: AuthRepository) { }
    execute(
       params: AuthModel,
    ): Observable<string> {
        return this.authRepository.login(params);
    }
}