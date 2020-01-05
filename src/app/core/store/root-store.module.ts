import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@env';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonStoreModule } from './common';


@NgModule({
  imports: [
    CommonStoreModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule {}
