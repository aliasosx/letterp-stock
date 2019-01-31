import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Purchase } from 'src/app/interfaces/purchase';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/interfaces/vendor';
import { Product } from 'src/app/interfaces/product';
import { StockHistory } from 'src/app/interfaces/stock_history';
declare var swal: any;

@Component({
  selector: 'app-addpurchase',
  templateUrl: './addpurchase.component.html',
  styleUrls: ['./addpurchase.component.css']
})
export class AddpurchaseComponent implements OnInit {

  constructor(private db: AngularFirestore, private DialogRef: MatDialogRef<AddpurchaseComponent>) {
    this.purchasesRef = db.collection<Purchase>('purchases');
    this.vendorsRef = db.collection<Vendor>('vendors');
    this.productsRef = db.collection<Product>('products');
    this.stockHistoriesRef = db.collection<StockHistory>('stockHistories');
  }

  addFormPurchase: FormGroup;
  purchasesRef: AngularFirestoreCollection<Purchase>;
  purchasesDoc: AngularFirestoreDocument<Purchase>;
  purchases: Observable<any[]>;

  vendors: Observable<any[]>;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;

  products: Observable<any[]>;
  productsRef: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;

  stockHistoriesRef: AngularFirestoreCollection<StockHistory>;
  stockHistoriesDoc: AngularFirestoreDocument<StockHistory>;
  stockHistories: Observable<any[]>;




  ngOnInit() {
    this.addFormPurchase = new FormGroup({
      billNo: new FormControl(),
      productName: new FormControl(),
      quantity: new FormControl(0),
      price: new FormControl(0),
      total: new FormControl(0),
      purchaseDate: new FormControl(new Date()),
      vendor: new FormControl(),
      userName: new FormControl(),
      noted: new FormControl(),
    });
    this.vendors = this.db.collection('vendors').valueChanges();
    this.products = this.db.collection('products').valueChanges();
  }

  addPurchase() {
    if (this.addFormPurchase.valid) {
      this.purchasesRef.add(this.addFormPurchase.value).then(res => {
        if (res) {
          this.DialogRef.close('success');
        } else {
          swal('something went wrong!', 'Please correct data info', 'error');
          return
        }
      });
    } else {
      swal('something went wrong!', 'Please correct data info before submit', 'error');
      return;
    }
  }
  totalCal() {
    this.addFormPurchase.get('total').setValue(parseInt(this.addFormPurchase.get('quantity').value) * parseInt(this.addFormPurchase.get('price').value));
  }

  productsNote: Observable<Product[]>;
  productNotesCollect: AngularFirestoreCollection<Product>;

  testQuery() {
    this.productNotesCollect = this.db.collection('products', ref => {
      return ref.where('cost', '>=', 10000);
    });
    this.productsNote = this.productNotesCollect.valueChanges();
  }
}
