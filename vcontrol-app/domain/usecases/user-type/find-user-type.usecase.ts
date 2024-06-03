import { UseCase } from '../../../base/use-case';
import { UserTypeRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { UserTypeModel } from '../../models';
export class FindUserTypeUseCase
  implements UseCase<number, Observable<UserTypeModel>>
{
  constructor(private typeVisitRepository: UserTypeRepository) {}

  execute(params: number): Observable<UserTypeModel> {
    return this.typeVisitRepository.find(params);
  }
}
