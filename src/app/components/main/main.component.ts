import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { TicketService } from 'src/app/services/ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from 'src/app/models/category';
import { Ticket } from 'src/app/models/ticket';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  userProfile: KeycloakProfile | null = null;
  formulario!: FormGroup;
  tickets$!: any;
  lastPage: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedDate: any;
  today: Date = new Date();
  startDate:any;
  endDate:any;
  categorias!:Category[];
  usuarios!:any;
  @ViewChild('ticketModal') ticketModal: any;
  constructor(private keycloakService: KeycloakService,
    private ticketService: TicketService,
    private categoryService:CategoryService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.keycloakService.loadUserProfile().then((userProfile: KeycloakProfile) => {
      this.userProfile = userProfile;
    }).catch((error) => {
      console.error('Error al cargar el perfil del usuario:', error);
    });
    this.formulario = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      priority: [],
      category: [],
      assignedTo:[],
    });
    this.getTodayFormatted();
    this.obtenerTickets();
    this.obtenerCategorias();
    this.obtenerUsuarios();
  }
  logout() {
    this.keycloakService.logout();
  }

  crear(ticket: any) {
    this.ticketService.crear(ticket).subscribe(
      (data: any) => {
        this.obtenerTickets();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  onSubmit() {
    console.log(this.formulario.value)
    this.crear(this.formulario.value);
  }
  obtenerTickets() {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString();
    const size = 10;
    this.ticketService.getTicketsByDate(this.startDate, this.endDate, this.currentPage, size)
      .subscribe((response: any) => {
        this.lastPage = response.number;
        this.totalPages = response.totalPages;
        this.tickets$ = response['content']
      });
  }
  obtenerCategorias(){
    this.categoryService.obtenerTodos().subscribe((data:any)=>{
      this.categorias=data
    },
    (error:any)=>{
      console.log(error)
    })
  }
  obtenerUsuarios(){
    this.userService.obtenerTodos().subscribe((data:any)=>{
      this.usuarios=data
    },
    (error:any)=>{
      console.log(error)
    })
  }

  isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages - 1;
  }
  prevPage() {
    this.currentPage--;
    this.obtenerTickets();
  }

  nextPage() {
    this.currentPage++;
    this.obtenerTickets();
  }
  onDateChange(){
    this.getSelectedDateFormatted();
    this.obtenerTickets();
  }

  getSelectedDateFormatted() {
    const fecha=this.selectedDate.split('-')
    this.startDate = fecha[0] + '-' + fecha[1] + '-' + fecha[2] + 'T00:00:00';
    this.endDate = fecha[0] + '-' + fecha[1] + '-' + fecha[2] + 'T23:59:59';
  }
  getTodayFormatted(){
    const year = this.today.getFullYear();
    const month = this.today.getMonth() + 1;
    const day = this.today.getDate();
    this.startDate = year + '-' + this.pad(month) + '-' + this.pad(day) + 'T00:00:00';
    this.endDate = year + '-' + this.pad(month) + '-' + this.pad(day) + 'T23:59:59';

  }
  pad(n: number): string {
    return n < 10 ? '0' + n : '' + n;
  }

  misTickets(){
    if(this.userProfile?.id){
      this.ticketService.getTicketsByAssingToAndStatus(this.userProfile?.id,this.currentPage, 10).subscribe((data:any)=>{
        this.tickets$=data['content']
      })
    }
  }
}
