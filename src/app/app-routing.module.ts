import { BillOfMaterialsComponent } from './pages/bill-of-materials/bill-of-materials.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FoodsComponent } from './pages/foods/foods.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'billOfMaterial', component: BillOfMaterialsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'foods', component: FoodsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
