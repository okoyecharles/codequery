import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
    ),
    { 
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: { 
        ...new MatDialogConfig(), 
        closeOnNavigation: true, 
        // disableClose: true,
        width: '95%',
        maxWidth: '400px',
        minWidth: '300px',
      }
    },
  ]
};
