import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { handleResidents } from '../../untils/functions/resident/resident';
import { ResidenceEntity } from '../entities/residence-entity';

export class ResidenceImplementationRepositoryMapper extends Mapper<
  ResidenceEntity,
  domain.ResidenceModel
> {
  mapFrom(param: ResidenceEntity): domain.ResidenceModel {
    return {
      id: param.id,
      name: param.name,
      residents: handleResidents(param.residents),
    };
  }
  mapTo(param: domain.ResidenceModel): ResidenceEntity {
    return {
      id: param.id,
      name: param.name,
    };
  }
}
