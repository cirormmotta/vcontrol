import { UseCase } from '../../../base/use-case';
import { UserTypeRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { UserTypeDefaultResponseModel } from '../../models';
export class DeleteUserTypeUseCase
  implements UseCase<number, Observable<UserTypeDefaultResponseModel>>
{
  constructor(private typeVisitRepository: UserTypeRepository) {}

  execute(params: number): Observable<UserTypeDefaultResponseModel> {
    return this.typeVisitRepository.delete(params);
  }
}
