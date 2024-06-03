import { UseCase } from '../../../base/use-case';
import { ResidenceRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultResidenceResponseModel } from '../../models';
export class DeleteResidenceUseCase
  implements UseCase<number, Observable<DefaultResidenceResponseModel>>
{
  constructor(private residenceRepository: ResidenceRepository) {}
  execute(params: number): Observable<DefaultResidenceResponseModel> {
    return this.residenceRepository.delete(params);
  }
}
