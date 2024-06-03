import * as domain from '../../../domain';
import * as data from '../../../data';
const userPermissionUseCaseFactory = () => new domain.UserPermissionUseCase();
const userListUseCaseFactory = (userRepo: domain.UserRepository) =>
  new domain.UserListUseCase(userRepo);
const userEditUseCaseFactory = (userRepo: domain.UserRepository) =>
  new domain.EditUserUseCase(userRepo);
const userCreateUseCaseFactory = (userRepo: domain.UserRepository) =>
  new domain.CreateUserUseCase(userRepo);
const userDeleteUseCaseFactory = (userRepo: domain.UserRepository) =>
  new domain.DeleteUserUseCase(userRepo);
const userFindUseCaseFactory = (userRepo: domain.UserRepository) =>
  new domain.FindUserUseCase(userRepo);
export const userUseCaseProvider = [
  {
    provide: domain.UserPermissionUseCase,
    useFactory: userPermissionUseCaseFactory,
    deps: [],
  },
  {
    provide: domain.UserListUseCase,
    useFactory: userListUseCaseFactory,
    deps: [domain.UserRepository],
  },
  {
    provide: domain.EditUserUseCase,
    useFactory: userEditUseCaseFactory,
    deps: [domain.UserRepository],
  },
  {
    provide: domain.CreateUserUseCase,
    useFactory: userCreateUseCaseFactory,
    deps: [domain.UserRepository],
  },
  {
    provide: domain.DeleteUserUseCase,
    useFactory: userDeleteUseCaseFactory,
    deps: [domain.UserRepository],
  },
  {
    provide: domain.FindUserUseCase,
    useFactory: userFindUseCaseFactory,
    deps: [domain.UserRepository],
  },
  {
    provide: domain.UserRepository,
    useClass: data.UserImplementationRepository,
  },
];
