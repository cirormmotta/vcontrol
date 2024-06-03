import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.ListUserTypeUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.EditUserTypeUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.CreateUserTypeUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.DeleteUserTypeUseCase(userRepo);
const findUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.FindUserTypeUseCase(userRepo);
const listAbilitiesUseCaseFactory = (userRepo: domain.UserTypeRepository) =>
  new domain.ListAbilitiesUseCase(userRepo);
export const userTypeUseCaseProvider = [
  {
    provide: domain.ListUserTypeUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.EditUserTypeUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.CreateUserTypeUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.DeleteUserTypeUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.FindUserTypeUseCase,
    useFactory: findUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.ListAbilitiesUseCase,
    useFactory: listAbilitiesUseCaseFactory,
    deps: [domain.UserTypeRepository],
  },
  {
    provide: domain.UserTypeRepository,
    useClass: data.UserTypeImplementationRepository,
  },
];
