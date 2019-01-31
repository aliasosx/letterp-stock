import { BillOfMaterialsComponent } from './pages/bill-of-materials/bill-of-materials.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'billOfMaterial', component: BillOfMaterialsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
