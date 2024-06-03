import { UseCase } from '../../../base/use-case';
import { VisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { VisitDefaultResponseModel, VisitModel } from '../../models';
export class CreateVisitUseCase
  implements UseCase<VisitModel, Observable<VisitDefaultResponseModel>>
{
  constructor(private visitorRepository: VisitRepository) {}

  execute(params: VisitModel): Observable<VisitDefaultResponseModel> {
    return this.visitorRepository.create(params);
  }
}
