import { AuthImplementationRepository } from '../../../data';
import * as domain from '../../../domain';

const authLoginUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.AuthLoginUseCase(userRepo);
const authProfileUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.AuthProfileUseCase(userRepo);
const authAuthenticatedUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.AuthAuthenticatedUseCase(userRepo);
const authLogoutUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.AuthLogoutUseCase(userRepo);
const recoverPasswordUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.RecoverPasswordUseCase(userRepo);
const newPasswordUseCaseFactory = (userRepo: domain.AuthRepository) =>
  new domain.NewPasswordUseCase(userRepo);
export const authLoginUseCaseProvider = [
  {
    provide: domain.AuthLoginUseCase,
    useFactory: authLoginUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  {
    provide: domain.AuthProfileUseCase,
    useFactory: authProfileUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  {
    provide: domain.AuthAuthenticatedUseCase,
    useFactory: authAuthenticatedUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  {
    provide: domain.AuthLogoutUseCase,
    useFactory: authLogoutUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  {
    provide: domain.RecoverPasswordUseCase,
    useFactory: recoverPasswordUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  {
    provide: domain.NewPasswordUseCase,
    useFactory: newPasswordUseCaseFactory,
    deps: [domain.AuthRepository],
  },
  { provide: domain.AuthRepository, useClass: AuthImplementationRepository },
];
