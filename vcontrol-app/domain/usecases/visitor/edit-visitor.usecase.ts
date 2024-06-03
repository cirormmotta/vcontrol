import { UseCase } from '../../../base/use-case';
import { VisitorRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultVisitorResponseModel, VisitorModel } from '../../models';
export class EditVisitorUseCase
  implements UseCase<VisitorModel, Observable<DefaultVisitorResponseModel>>
{
  constructor(private visitorRepository: VisitorRepository) {}

  execute(params: VisitorModel): Observable<DefaultVisitorResponseModel> {
    return this.visitorRepository.update(params);
  }
}
