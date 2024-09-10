import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {  provideClientHydration, withNoHttpTransferCache } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),InfiniteScrollDirective, provideClientHydration(withNoHttpTransferCache()),provideAnimations(),provideHttpClient(withFetch(),withInterceptors([headerInterceptor]))]
};
