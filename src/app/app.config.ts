import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),provideRouter(
      routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'top', // <-- Esto fuerza a subir arriba del todo en cada navegación
      })
    ) ]
  
  
};
