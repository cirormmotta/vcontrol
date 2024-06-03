import { UseCase } from '../../../base/use-case';
import { ResidenceRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { ResidenceModel } from '../../models';
export class FindResidenceUseCase
  implements UseCase<number, Observable<ResidenceModel>>
{
  constructor(private residenceRepository: ResidenceRepository) {}
  execute(params: number): Observable<ResidenceModel> {
    return this.residenceRepository.find(params);
  }
}
