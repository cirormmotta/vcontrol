import { Mapper } from '../../../base/mapper';
import * as domain from '../../../domain';
import { handleResident } from '../../untils/functions/resident/resident';
import { ResidentEntity, VisitEntity } from '../entities';
import { ResidenceImplementationRepositoryMapper } from './residence-repository.mapper';
import { ResidentImplementationRepositoryMapper } from './resident-repository.mapper';

export class VisitImplementationRepositoryMapper extends Mapper<
  VisitEntity,
  domain.VisitModel
> {
  mapFrom(param: VisitEntity): domain.VisitModel {
    return {
      id: param.id,
      residencesId: param.residences_id,
      residentId: param.residents_id,
      typeVisitId: param.type_visits_id,
      visitorId: param.visitors_id,
      carLicensePlate: param.car_license_plate,
      residence: new ResidentImplementationRepositoryMapper().handleResidence(
        param.residence
      ),
      resident: this.handleResident(param.resident),
      typeVisit: param.type_visit,
      visitor: param.visitor,
    };
  }
  handleResident(resident?: ResidentEntity): undefined | domain.ResidentModel {
    if (!resident) return undefined;
    return handleResident(resident)
  }
  mapTo(param: domain.VisitModel): VisitEntity {
    const resident = param.resident
      ? new ResidentImplementationRepositoryMapper().mapTo(param.resident)
      : undefined;
    const residence = param.residence
      ? new ResidenceImplementationRepositoryMapper().mapTo(param.residence)
      : undefined;
    return {
      id: param.id,
      residences_id: param.residencesId,
      residents_id: param.residentId,
      type_visits_id: param.typeVisitId,
      visitors_id: param.visitorId,
      car_license_plate: param.carLicensePlate,
      resident,
      residence,
      type_visit: param.typeVisit,
      visitor: param.visitor,
    };
  }
}
