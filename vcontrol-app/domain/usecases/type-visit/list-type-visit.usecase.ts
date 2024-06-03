import { UseCase } from '../../../base/use-case';
import { TypeVisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { PaginateModel, TypeVisitModel } from '../../models';
export class ListTypeVisitUseCase
  implements UseCase<PaginateModel, Observable<TypeVisitModel[]>>
{
  constructor(private typeVisitRepository: TypeVisitRepository) {}

  execute(params: PaginateModel): Observable<TypeVisitModel[]> {
    return this.typeVisitRepository.list(params);
  }
}
