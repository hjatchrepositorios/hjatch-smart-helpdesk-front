import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { UserService } from './services/user.service';
import { User } from './models/user';
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
  constructor(private keycloakService: KeycloakService,
              private userService:UserService,
    ) {}
  ngOnInit() {
    this.keycloakService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      this.userProfile = userProfile;
      this.validarUsuarioKeycloak(userProfile.id,userProfile);
      this.name=userProfile.firstName?.split(' ')[0];
      this.surname=userProfile.lastName?.split(' ')[0]
    }).catch((error) => {
      console.error('Error al cargar el perfil del usuario:', error);
    });
    
  }
  logout() {
    this.keycloakService.logout();
  }
  validarUsuarioKeycloak(idKeycloak:any,up:KeycloakProfile){
    this.userService.obtenerPorIdKeycloak(idKeycloak).subscribe((data:any)=>{
        console.log("Bienvenido! Si logras visualizar esto significa que estas queriendo jugar, ¡No seas vivo!.")
    },
    (error:any)=>{

      if(error.status=='404'){
        let user:User={
          name:up.firstName,
          surname:up.lastName,
          idKeycloak:up.id
        }
        console.log(user)
        this.userService.crear(user).subscribe((data:any)=>{
          console.log(data)
        })
      }
    })
  }
}
