import { UseCase } from '../../../base/use-case';
import { VisitorRepository } from '../../repositories';
import { Observable } from 'rxjs';
import {
  PaginateModel,
  VisitorDefaultListResponseModel,
  VisitorListParams,
} from '../../models';
export class ListVisitorUseCase
  implements
    UseCase<VisitorListParams, Observable<VisitorDefaultListResponseModel>>
{
  constructor(private visitorRepository: VisitorRepository) {}

  execute(
    params: VisitorListParams
  ): Observable<VisitorDefaultListResponseModel> {
    return this.visitorRepository.list(params);
  }
}
