import { UseCase } from '../../../base/use-case';
import { ResidentRepository } from '../../repositories';
import { Observable } from 'rxjs';
import {
  DefaultListResponseModel,
  PaginateModel,
  ResidentModel,
} from '../../models';
export class ListResidentUseCase
  implements
    UseCase<PaginateModel, Observable<DefaultListResponseModel<ResidentModel>>>
{
  constructor(private residentRepository: ResidentRepository) {}

  execute(
    params: PaginateModel
  ): Observable<DefaultListResponseModel<ResidentModel>> {
    return this.residentRepository.list(params);
  }
}
