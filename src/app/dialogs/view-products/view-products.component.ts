import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Vendor } from 'src/app/interfaces/vendor';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/interfaces/productType';
import { Product } from 'src/app/interfaces/product';
import * as uuid from 'uuid';
import { Unit } from 'src/app/interfaces/unit';
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore, private DialogRef: MatDialogRef<ViewProductsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.vendorsRef = this.db.collection<Vendor>('vendors');
    this.productTypesRef = this.db.collection<ProductType>('productTypes');
    this.productsRef = this.db.collection<Product>('products');
    this.unitsRef = this.db.collection<Unit>('units');
  }
  vendor: Vendor;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;
  vendors: Observable<any[]>;

  unitsRef: AngularFirestoreCollection<Unit>;
  unitDoc: AngularFirestoreDocument<Unit>;
  units: Observable<any[]>;

  productTypesRef: AngularFirestoreCollection<ProductType>;
  productTypeDoc: AngularFirestoreDocument<ProductType>;
  productType: ProductType;
  productTypes: Observable<any[]>;

  product: Product;
  productsRef: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;
  addProductForm: FormGroup;

  ngOnInit() {
    let uid = uuid.v4();
    this.addProductForm = new FormGroup({
      uuids: new FormControl(uid),
      id: new FormControl(),
      barcode: new FormControl(),
      productCode: new FormControl(),
      productName: new FormControl(),
      cost: new FormControl(),
      minimumQuantity: new FormControl(0),
      currentQuantity: new FormControl(0),
      productTypeCode: new FormControl(),
      userId: new FormControl(),
      vendorId: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      unit: new FormControl(),
    });


    this.vendors = this.db.collection('vendors').valueChanges();
    this.productTypes = this.db.collection('productTypes').valueChanges();
    this.units = this.db.collection('units').valueChanges();

    this.addProductForm.setValue(this.data);
  }

  updateProduct() {
    if (this.addProductForm.valid) {
      this.db.collection('products').doc(this.data.id).update(this.addProductForm.value);
      this.DialogRef.close('success');
    }

  }
}
