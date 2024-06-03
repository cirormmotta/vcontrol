import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './routes/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from './security/interceptors/api.interceptor';
import * as factories from './di';
import { provideToastr } from 'ngx-toastr';
import { TOASTR_CONFIG } from './shared/services/toastr.service';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
  validation: false,
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Object.values(factories),
    provideAnimationsAsync(),
    provideToastr(TOASTR_CONFIG),
    provideEnvironmentNgxMask(),
  ],
};
