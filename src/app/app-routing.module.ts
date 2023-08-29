import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ATMComponent } from './components/atm/atm.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'atm', component: ATMComponent },
  { path: '',   redirectTo: '/products', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
