import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.ResidenceRepository) =>
  new domain.ListResidenceUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.ResidenceRepository) =>
  new domain.EditResidenceUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.ResidenceRepository) =>
  new domain.CreateResidenceUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.ResidenceRepository) =>
  new domain.DeleteResidenceUseCase(userRepo);
const findUseCaseFactory = (userRepo: domain.ResidenceRepository) =>
  new domain.FindResidenceUseCase(userRepo);
export const residenceUseCaseProvider = [
  {
    provide: domain.ListResidenceUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.ResidenceRepository],
  },
  {
    provide: domain.EditResidenceUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.ResidenceRepository],
  },
  {
    provide: domain.CreateResidenceUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.ResidenceRepository],
  },
  {
    provide: domain.DeleteResidenceUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.ResidenceRepository],
  },
  {
    provide: domain.FindResidenceUseCase,
    useFactory: findUseCaseFactory,
    deps: [domain.ResidenceRepository],
  },
  {
    provide: domain.ResidenceRepository,
    useClass: data.ResidenceImplementationRepository,
  },
];
