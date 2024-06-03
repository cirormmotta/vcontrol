import { ResidentEntity, ResidentImplementationRepositoryMapper } from '../../../repositories';
import * as domain from '../../../../domain';
export function handleResident(resident: ResidentEntity): domain.ResidentModel {
  const residenceMapper = new ResidentImplementationRepositoryMapper();
  return residenceMapper.mapFrom(resident);
}
export function handleResidents(
  residents?: ResidentEntity[]
): domain.ResidentModel[] {
  if (!residents) return [];
  return residents.map((resident) => handleResident(resident));
}
