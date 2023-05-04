import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TablesComponent } from './components/tables/tables.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'tables', component: TablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
