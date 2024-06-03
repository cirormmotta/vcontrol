import { UseCase } from '../../../base/use-case';
import { VisitorRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultVisitorResponseModel } from '../../models';
export class DeleteVisitorUseCase
  implements UseCase<number, Observable<DefaultVisitorResponseModel>>
{
  constructor(private visitorRepository: VisitorRepository) {}

  execute(params: number): Observable<DefaultVisitorResponseModel> {
    return this.visitorRepository.delete(params);
  }
}
