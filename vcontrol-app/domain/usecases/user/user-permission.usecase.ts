import { UserModel } from '../../models';
import { UseCase } from '../../../base/use-case';

export class UserPermissionUseCase
  implements UseCase<{ user: UserModel; abilitie: string }, boolean>
{
  constructor() {}

  execute({ user, abilitie }: { user: UserModel; abilitie: string }): boolean {
    if (!user?.userType) return false;
    const { userType } = user;
    return !!this.findPermission(userType.abilities, abilitie);
  }
  private findPermission(
    abilities: string[],
    abilitie: string
  ): string | undefined {
    return abilities.find((abilitieItem) => abilitieItem === abilitie);
  }
}
