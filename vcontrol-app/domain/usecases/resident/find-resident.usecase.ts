import { UseCase } from '../../../base/use-case';
import { ResidentRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { ResidentModel } from '../../models';
export class FindResidentUseCase
  implements UseCase<number, Observable<ResidentModel>>
{
  constructor(private residentRepository: ResidentRepository) {}
  execute(params: number): Observable<ResidentModel> {
    return this.residentRepository.find(params);
  }
}
