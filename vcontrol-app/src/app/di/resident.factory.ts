import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.ResidentRepository) =>
  new domain.ListResidentUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.ResidentRepository) =>
  new domain.EditResidentUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.ResidentRepository) =>
  new domain.CreateResidentUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.ResidentRepository) =>
  new domain.DeleteResidentUseCase(userRepo);
const findUseCaseFactory = (userRepo: domain.ResidentRepository) =>
  new domain.FindResidentUseCase(userRepo);
export const residentUseCaseProvider = [
  {
    provide: domain.ListResidentUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.ResidentRepository],
  },
  {
    provide: domain.EditResidentUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.ResidentRepository],
  },
  {
    provide: domain.CreateResidentUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.ResidentRepository],
  },
  {
    provide: domain.DeleteResidentUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.ResidentRepository],
  },
  {
    provide: domain.FindResidentUseCase,
    useFactory: findUseCaseFactory,
    deps: [domain.ResidentRepository],
  },
  {
    provide: domain.ResidentRepository,
    useClass: data.ResidentImplementationRepository,
  },
];
