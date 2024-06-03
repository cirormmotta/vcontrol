import { UseCase } from '../../../base/use-case';
import { TypeVisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { TypeVisitDefaultResponseModel, TypeVisitModel } from '../../models';
export class CreateTypeVisitUseCase
  implements UseCase<TypeVisitModel, Observable<TypeVisitDefaultResponseModel>>
{
  constructor(private typeVisitRepository: TypeVisitRepository) {}

  execute(params: TypeVisitModel): Observable<TypeVisitDefaultResponseModel> {
    return this.typeVisitRepository.create(params);
  }
}
