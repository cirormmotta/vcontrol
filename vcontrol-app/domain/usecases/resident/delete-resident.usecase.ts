import { UseCase } from '../../../base/use-case';
import { ResidentRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { DefaultResidentResponseModel } from '../../models';
export class DeleteResidentUseCase
  implements UseCase<number, Observable<DefaultResidentResponseModel>>
{
  constructor(private residentRepository: ResidentRepository) {}
  execute(params: number): Observable<DefaultResidentResponseModel> {
    return this.residentRepository.delete(params);
  }
}
