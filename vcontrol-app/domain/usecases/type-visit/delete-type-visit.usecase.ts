import { UseCase } from '../../../base/use-case';
import { TypeVisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { TypeVisitDefaultResponseModel } from '../../models';
export class DeleteTypeVisitUseCase
  implements UseCase<number, Observable<TypeVisitDefaultResponseModel>>
{
  constructor(private typeVisitRepository: TypeVisitRepository) {}

  execute(params: number): Observable<TypeVisitDefaultResponseModel> {
    return this.typeVisitRepository.delete(params);
  }
}
