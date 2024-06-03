import { UseCase } from '../../../base/use-case';
import { VisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { VisitDefaultResponseModel } from '../../models';
export class DeleteVisitUseCase
  implements UseCase<number, Observable<VisitDefaultResponseModel>>
{
  constructor(private visitorRepository: VisitRepository) {}

  execute(params: number): Observable<VisitDefaultResponseModel> {
    return this.visitorRepository.delete(params);
  }
}
