import { UseCase } from '../../../base/use-case';
import { AuthRepository } from '../../repositories';

export class AuthAuthenticatedUseCase implements UseCase<void, string> {
  constructor(private userRepository: AuthRepository) {}

  execute(): string {
    return this.userRepository.isAuthenticated();
  }
}
