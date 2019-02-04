import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/interfaces/vendor';
import { Purchase } from 'src/app/interfaces/purchase';
import { Product } from 'src/app/interfaces/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-viewaddpurchase',
  templateUrl: './viewaddpurchase.component.html',
  styleUrls: ['./viewaddpurchase.component.css']
})
export class ViewaddpurchaseComponent implements OnInit {

  constructor(private db: AngularFirestore, private DialogRef: MatDialogRef<ViewaddpurchaseComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.purchasesRef = db.collection<Purchase>('purchases');
    this.vendorsRef = db.collection<Vendor>('vendors');
    this.productsRef = db.collection<Product>('products');
  }

  purchasesRef: AngularFirestoreCollection<Purchase>;
  purchasesDoc: AngularFirestoreDocument<Purchase>;
  purchases: Observable<any[]>;

  vendors: Observable<any[]>;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;

  products: Observable<any[]>;
  productsRef: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;

  addFormPurchase: FormGroup;
  ngOnInit() {
    this.addFormPurchase = new FormGroup({
      id: new FormControl(),
      billNo: new FormControl(),
      productName: new FormControl(),
      quantity: new FormControl(0),
      price: new FormControl(0),
      total: new FormControl(0),
      purchaseDate: new FormControl(new Date()),
      vendor: new FormControl(),
      userName: new FormControl(),
      noted: new FormControl(),
      bills: new FormControl(),
    });
    //console.log(this.data);
    this.vendors = this.db.collection('vendors').valueChanges();
    this.products = this.db.collection('products').valueChanges();
    this.addFormPurchase.setValue(this.data);
  }
  updatePurchase() {
    this.addFormPurchase.get('userName').setValue('administrator');
    if (this.addFormPurchase.valid) {
      this.db.collection('purchases').doc(this.data.id).update(this.addFormPurchase.value);
      this.DialogRef.close('success');
    }
  }
  totalCal() {
    this.addFormPurchase.get('total').setValue(parseInt(this.addFormPurchase.get('quantity').value) * parseInt(this.addFormPurchase.get('price').value));
  }

}
