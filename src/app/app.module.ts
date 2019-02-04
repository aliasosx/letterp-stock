import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, FirestoreSettingsToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule, MatDialogModule, MatDividerModule, MatProgressBarModule,
  MatFormFieldModule,
  MatTabsModule
} from '@angular/material';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { AddProductsComponent } from './dialogs/add-products/add-products.component';
import { ViewProductsComponent } from './dialogs/view-products/view-products.component';
import { AddpurchaseComponent } from './dialogs/addpurchase/addpurchase.component';
import { ViewaddpurchaseComponent } from './dialogs/viewaddpurchase/viewaddpurchase.component';
import { BillOfMaterialsComponent } from './pages/bill-of-materials/bill-of-materials.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { VendorsComponent } from './dialogs/vendors/vendors.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { AddFoodComponent } from './dialogs/add-food/add-food.component';
import { StockHistoryComponent } from './pages/stock-history/stock-history.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AddBomComponent } from './dialogs/add-bom/add-bom.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProductsComponent,
    PurchasesComponent,
    AddProductsComponent,
    ViewProductsComponent,
    AddpurchaseComponent,
    ViewaddpurchaseComponent,
    BillOfMaterialsComponent,
    SettingsComponent,
    VendorsComponent,
    FoodsComponent,
    AddFoodComponent,
    StockHistoryComponent,
    TransactionsComponent,
    AddBomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule, MatDialogModule, MatDividerModule, MatProgressBarModule, MatTabsModule,
    ReactiveFormsModule, MatFormFieldModule,
    FormsModule,
  ],
  entryComponents:
    [
      AddProductsComponent,
      ViewProductsComponent,
      AddpurchaseComponent,
      ViewaddpurchaseComponent,
      VendorsComponent,
      AddFoodComponent,
      AddBomComponent,
    ]
  ,
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
