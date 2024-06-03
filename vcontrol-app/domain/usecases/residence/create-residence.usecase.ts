import { UseCase } from '../../../base/use-case';
import { ResidenceRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultResidenceResponseModel, ResidenceModel } from '../../models';
export class CreateResidenceUseCase
  implements UseCase<ResidenceModel, Observable<DefaultResidenceResponseModel>>
{
  constructor(private residenceRepository: ResidenceRepository) {}

  execute(params: ResidenceModel): Observable<DefaultResidenceResponseModel> {
    return this.residenceRepository.create(params);
  }
}
