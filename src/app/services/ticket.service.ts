import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  url=environment.apiBaseUrl
  constructor(private http:HttpClient) { }

  crear(ticket:any):Observable<any>{
    return this.http.post(`${this.url+'/api/tickets'}`,ticket)
  }
  obtenerTickets(): Observable<any> {
    return this.http.get(`${this.url+'/api/tickets'}`);
  }
  getTicketsByDate(start: string, end: string, page: number, size: number) {
    const params = { start, end, page, size };
    return this.http.get(`${this.url+'/api/tickets'}`, { params });
  }
}
