import { UseCase } from '../../../base/use-case';
import { VisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultListResponseModel, VisitDefaultResponseModel, VisitModel } from '../../models';
export class FindVisitUseCase
  implements UseCase<number, Observable<VisitModel>>
{
  constructor(private visitorRepository: VisitRepository) {}

  execute(params: number): Observable<VisitModel> {
    return this.visitorRepository.find(params);
  }
}
