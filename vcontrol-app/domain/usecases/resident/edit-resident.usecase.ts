import { UseCase } from '../../../base/use-case';
import { ResidentRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultResidentResponseModel, ResidentModel } from '../../models';
export class EditResidentUseCase
  implements UseCase<ResidentModel, Observable<DefaultResidentResponseModel>>
{
  constructor(private residentRepository: ResidentRepository) {}

  execute(params: ResidentModel): Observable<DefaultResidentResponseModel> {
    return this.residentRepository.update(params);
  }
}
