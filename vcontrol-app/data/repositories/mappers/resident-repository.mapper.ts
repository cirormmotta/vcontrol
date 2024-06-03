import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { ResidenceEntity } from '../entities/residence-entity';
import { ResidentEntity } from '../entities/resident-entity';
import { ResidenceImplementationRepositoryMapper } from './residence-repository.mapper';

export class ResidentImplementationRepositoryMapper extends Mapper<
  ResidentEntity,
  domain.ResidentModel
> {
  mapFrom(param: ResidentEntity): domain.ResidentModel {
    return {
      id: param.id,
      name: param.name,
      phone: param.phone,
      residencesId: param.residences_id,
      residence: this.handleResidence(param.residence),
    };
  }
  handleResidence(residence?: ResidenceEntity) {
    if (!residence) return undefined;
    const residenceMapper = new ResidenceImplementationRepositoryMapper();
    return residenceMapper.mapFrom(residence);
  }
  mapTo(param: domain.ResidentModel): ResidentEntity {
    return {
      id: param.id,
      name: param.name,
      phone: param.phone,
      residences_id: param.residencesId,
    };
  }
}
