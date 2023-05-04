import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TablesComponent } from './components/tables/tables.component';
function initializeKeycloack(keycloak:KeycloakService){
  return () =>
    keycloak.init({
      config: {
        url:'http://192.168.0.13:9999/auth',
        realm: 'hjatch',
        clientId: 'smarthelpdesk'
      },
      initOptions:{
        onLoad: 'login-required',
        flow: 'standard'
      }
    })
}
@NgModule({
  declarations: [AppComponent, MainComponent, TablesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloack,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
