import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  userProfile: KeycloakProfile | null = null;
  constructor(private keycloakService: KeycloakService) {}
  ngOnInit() {
    this.keycloakService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      this.userProfile = userProfile;
    }).catch((error) => {
      console.error('Error al cargar el perfil del usuario:', error);
    });

  }
  logout() {
    this.keycloakService.logout();
  }
}
