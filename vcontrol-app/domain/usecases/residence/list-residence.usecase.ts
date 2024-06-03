import { UseCase } from '../../../base/use-case';
import { ResidenceRepository } from '../../repositories';
import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  PaginateModel,
  ResidenceModel,
} from '../../models';
export class ListResidenceUseCase
  implements
    UseCase<
      PaginateModel,
      Observable<DefaultListResponseModel<ResidenceModel>>
    >
{
  constructor(private residenceRepository: ResidenceRepository) {}

  execute(
    params: PaginateModel
  ): Observable<DefaultListResponseModel<ResidenceModel>> {
    return this.residenceRepository.list(params);
  }
}
