import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url=environment.apiBaseUrl
  constructor(private http:HttpClient) { }

  crear(user:any):Observable<any>{
    return this.http.post(`${this.url+'/api/users'}`,user)
  }
  obtenerPorId(id:any): Observable<any> {
    return this.http.get(`${this.url+'/api/users/'+id}`);
  }
  obtenerTodos():Observable<any>{
    return this.http.get(`${this.url+'/api/users'}`);
  }
  obtenerPorIdKeycloak(id:any): Observable<any> {
    return this.http.get(`${this.url+'/api/users/idKeycloak/'+id}`);
  }
}
