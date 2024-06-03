import { UseCase } from '../../../base/use-case';
import { UserTypeRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { PaginateModel, UserTypeModel } from '../../models';
export class ListUserTypeUseCase
  implements UseCase<PaginateModel, Observable<UserTypeModel[]>>
{
  constructor(private typeVisitRepository: UserTypeRepository) {}

  execute(params: PaginateModel): Observable<UserTypeModel[]> {
    return this.typeVisitRepository.list(params);
  }
}
