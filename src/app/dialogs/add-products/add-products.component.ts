import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Vendor } from 'src/app/interfaces/vendor';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/interfaces/productType';
import { Product } from 'src/app/interfaces/product';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore, private DialogRef: MatDialogRef<AddProductsComponent>) {
    this.vendorsRef = this.db.collection<Vendor>('vendors');
    this.productTypesRef = this.db.collection<ProductType>('productTypes');
    this.productsRef = this.db.collection<Product>('products');
  }
  showAlert = "hidden";
  addProductForm: FormGroup;
  vendor: Vendor;
  vendorsRef: AngularFirestoreCollection<Vendor>;
  vendorDoc: AngularFirestoreDocument<Vendor>;
  vendors: Observable<any[]>;

  productTypesRef: AngularFirestoreCollection<ProductType>;
  productTypeDoc: AngularFirestoreDocument<ProductType>;
  productType: ProductType;
  productTypes: Observable<any[]>;

  product: Product;
  productsRef: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;

  ngOnInit() {
    let uid = uuid.v4();
    this.addProductForm = new FormGroup({
      uuids: new FormControl(uid),
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
      updatedAt: new FormControl(new Date())
    });
    this.vendors = this.db.collection('vendors').valueChanges();
    this.productTypes = this.db.collection('productTypes').valueChanges();
    this.addProductForm.get('userId').setValue(18);
  }

  addProduct() {
    if (this.addProductForm.valid) {
      this.product = this.addProductForm.value;
      this.productsRef.add(this.product).then(res => {
        this.DialogRef.close('success');
      });
    }
  }
  checkProductCode(productCode) {
    console.log(productCode);

  }
}
