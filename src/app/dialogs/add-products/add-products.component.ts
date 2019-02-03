import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Vendor } from 'src/app/interfaces/vendor';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/interfaces/productType';
import { Product } from 'src/app/interfaces/product';
import * as uuid from 'uuid';
import { Unit } from 'src/app/interfaces/unit';
import { Food } from 'src/app/interfaces/food';

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
    this.unitsRef = this.db.collection<Unit>('units');
    this.foodsRef = db.collection<Food>('foods');
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

  unitsRef: AngularFirestoreCollection<Unit>
  unitsDoc: AngularFirestoreDocument<Unit>
  units: Observable<any[]>;

  foodsRef: AngularFirestoreCollection<Food>;
  foodsDoc: AngularFirestoreDocument<Food>;
  foods: Observable<any[]>;

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
      foodId: new FormControl(),
      createdAt: new FormControl(new Date()),
      updatedAt: new FormControl(new Date()),
      unit: new FormControl(),
    });
    this.vendors = this.db.collection('vendors').valueChanges();
    this.productTypes = this.db.collection('productTypes').valueChanges();
    this.units = this.unitsRef.valueChanges();
    this.foods = this.foodsRef.valueChanges();
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
