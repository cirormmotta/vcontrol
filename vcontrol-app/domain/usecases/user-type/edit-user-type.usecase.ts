import { UseCase } from '../../../base/use-case';
import { UserTypeRepository } from '../../repositories';
import { Observable } from 'rxjs';
import { UserTypeDefaultResponseModel, UserTypeModel } from '../../models';
export class EditUserTypeUseCase
  implements UseCase<UserTypeModel, Observable<UserTypeDefaultResponseModel>>
{
  constructor(private typeVisitRepository: UserTypeRepository) {}

  execute(params: UserTypeModel): Observable<UserTypeDefaultResponseModel> {
    return this.typeVisitRepository.update(params);
  }
}
