import { UserModel } from '../../models';
import { UseCase } from '../../../base/use-case';
import { UserRepository } from '../../repositories';
import { Observable } from 'rxjs';

export class UserListUseCase implements UseCase<void, Observable<UserModel[]>> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<UserModel[]> {
    return this.userRepository.userList();
  }
}
