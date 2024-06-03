import { UseCase } from '../../../base/use-case';
import { VisitRepository } from '../../repositories';
import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  PaginateModel,
  VisitModel,
} from '../../models';
export class ListVisitUseCase
  implements
    UseCase<PaginateModel, Observable<DefaultListResponseModel<VisitModel>>>
{
  constructor(private visitorRepository: VisitRepository) {}

  execute(
    params: PaginateModel
  ): Observable<DefaultListResponseModel<VisitModel>> {
    return this.visitorRepository.list(params);
  }
}
