import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit{
  categories: any;
  users:any;
  formulario!: FormGroup;
  constructor(private categoryService:CategoryService,
              private userService: UserService,
              private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.obtenerCategorias();
    this.obtenerUsuarios();
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  obtenerCategorias(){
    this.categoryService.obtenerTodos().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  obtenerUsuarios(){
    this.userService.obtenerTodosPorEstado("active").subscribe(
      (data: any) => {
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    console.log(this.formulario.value);
    this.categoryService.crear(this.formulario.value).subscribe((data:any)=>{
      this.obtenerCategorias()
    })
  }

}
