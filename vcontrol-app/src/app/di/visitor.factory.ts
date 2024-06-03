import * as domain from '../../../domain';
import * as data from '../../../data';
const listUseCaseFactory = (userRepo: domain.VisitorRepository) =>
  new domain.ListVisitorUseCase(userRepo);
const editUseCaseFactory = (userRepo: domain.VisitorRepository) =>
  new domain.EditVisitorUseCase(userRepo);
const createUseCaseFactory = (userRepo: domain.VisitorRepository) =>
  new domain.CreateVisitorUseCase(userRepo);
const deleteUseCaseFactory = (userRepo: domain.VisitorRepository) =>
  new domain.DeleteVisitorUseCase(userRepo);
export const uvisitorUseCaseProvider = [
  {
    provide: domain.ListVisitorUseCase,
    useFactory: listUseCaseFactory,
    deps: [domain.VisitorRepository],
  },
  {
    provide: domain.EditVisitorUseCase,
    useFactory: editUseCaseFactory,
    deps: [domain.VisitorRepository],
  },
  {
    provide: domain.CreateVisitorUseCase,
    useFactory: createUseCaseFactory,
    deps: [domain.VisitorRepository],
  },
  {
    provide: domain.DeleteVisitorUseCase,
    useFactory: deleteUseCaseFactory,
    deps: [domain.VisitorRepository],
  },
  {
    provide: domain.VisitorRepository,
    useClass: data.VisitorImplementationRepository,
  },
];
