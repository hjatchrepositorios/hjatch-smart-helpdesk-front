import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmartFront';
  anioActual: number = new Date().getFullYear();
  userProfile: KeycloakProfile | null = null;
  name:any;
  surname:any;
  constructor(private keycloakService: KeycloakService) {}
  ngOnInit() {
    this.keycloakService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      this.userProfile = userProfile;
      this.name=userProfile.firstName?.split(' ')[0];
      this.surname=userProfile.lastName?.split(' ')[0]
    }).catch((error) => {
      console.error('Error al cargar el perfil del usuario:', error);
    });

  }
  logout() {
    this.keycloakService.logout();
  }
}
