import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories/auth.repository';

export class AuthProfileUseCase implements UseCase<void, Observable<UserModel>> {

    constructor(private userRepository: AuthRepository) { }

    execute(): Observable<UserModel> {
        return this.userRepository.getUserProfile();
    }
}