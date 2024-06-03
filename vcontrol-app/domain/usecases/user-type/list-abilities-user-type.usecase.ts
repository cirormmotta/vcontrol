import { UseCase } from '../../../base/use-case';
import { UserTypeRepository } from '../../repositories';
import { Observable, map } from 'rxjs';
import { AbilitieModel, PaginateModel } from '../../models';
export class ListAbilitiesUseCase
  implements UseCase<PaginateModel, Observable<AbilitieModel[]>>
{
  constructor(private typeVisitRepository: UserTypeRepository) {}

  execute(): Observable<AbilitieModel[]> {
    return this.typeVisitRepository.allAbilities();
  }
}
