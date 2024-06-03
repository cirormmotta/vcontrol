import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.VisitRepository) =>
  new domain.ListVisitUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.VisitRepository) =>
  new domain.EditVisitUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.VisitRepository) =>
  new domain.CreateVisitUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.VisitRepository) =>
  new domain.DeleteVisitUseCase(userRepo);
const findUseCaseFactory = (userRepo: domain.VisitRepository) =>
  new domain.FindVisitUseCase(userRepo);
export const visitUseCaseProvider = [
  {
    provide: domain.ListVisitUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.VisitRepository],
  },
  {
    provide: domain.EditVisitUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.VisitRepository],
  },
  {
    provide: domain.CreateVisitUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.VisitRepository],
  },
  {
    provide: domain.DeleteVisitUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.VisitRepository],
  },
  {
    provide: domain.FindVisitUseCase,
    useFactory: findUseCaseFactory,
    deps: [domain.VisitRepository],
  },
  {
    provide: domain.VisitRepository,
    useClass: data.VisitImplementationRepository,
  },
];
