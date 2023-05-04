import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url=environment.apiBaseUrl
  constructor(private http:HttpClient) { }

  crear(category:any):Observable<any>{
    return this.http.post(`${this.url+'/api/categories'}`,category)
  }
  obtenerPorId(id:any): Observable<any> {
    return this.http.get(`${this.url+'/api/categories/'+id}`);
  }
  obtenerTodos():Observable<Category>{
    return this.http.get<Category>(`${this.url+'/api/categories'}`);
  }

  
}
