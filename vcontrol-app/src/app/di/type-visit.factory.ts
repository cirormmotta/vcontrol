import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.TypeVisitRepository) =>
  new domain.ListTypeVisitUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.TypeVisitRepository) =>
  new domain.EditTypeVisitUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.TypeVisitRepository) =>
  new domain.CreateTypeVisitUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.TypeVisitRepository) =>
  new domain.DeleteTypeVisitUseCase(userRepo);
export const typeVisitUseCaseProvider = [
  {
    provide: domain.ListTypeVisitUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.TypeVisitRepository],
  },
  {
    provide: domain.EditTypeVisitUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.TypeVisitRepository],
  },
  {
    provide: domain.CreateTypeVisitUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.TypeVisitRepository],
  },
  {
    provide: domain.DeleteTypeVisitUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.TypeVisitRepository],
  },
  {
    provide: domain.TypeVisitRepository,
    useClass: data.TypeVisitImplementationRepository,
  },
];
