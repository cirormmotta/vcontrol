import { Observable } from 'rxjs';
import { AuthModel, DefaultResponseModel, UserModel } from '../models';
import { AuthNewPasswordParam } from '../usecases/auth/new-password.usecase';

export abstract class AuthRepository {
  abstract login(params: AuthModel): Observable<string>;
  abstract logout(): Observable<DefaultResponseModel>;
  abstract storeToken(token: string): void;
  abstract isAuthenticated(): string;
  abstract getUserProfile(): Observable<UserModel>;
  abstract recoverPassword(params: { email: string }): Observable<DefaultResponseModel>;
  abstract newPassword(params: AuthNewPasswordParam): Observable<DefaultResponseModel>;
}
