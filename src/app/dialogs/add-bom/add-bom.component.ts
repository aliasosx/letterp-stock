import { Product } from './../../interfaces/product';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-bom',
  templateUrl: './add-bom.component.html',
  styleUrls: ['./add-bom.component.css']
})
export class AddBomComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.foodsRef = db.collection<Food>('foods');
    this.productsRef = db.collection<Product>('products', ref => {
      return ref.where('productTypeCode', '==', 'MATERIAL');
    });
  }

  addNewBOMForm: FormGroup;
  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  listOfProducts: any = [];

  productsRef: AngularFirestoreCollection<Product>;
  products: Observable<any[]>;
  showContent = "hidden";
  productSelected: any;

  ngOnInit() {
    this.addNewBOMForm = new FormGroup({
      food: new FormControl(),
      product: new FormControl(),
      quantity: new FormControl()
    });
    this.foods = this.foodsRef.valueChanges();
    this.products = this.productsRef.valueChanges();
  }
  addProduct() {
    this.db.collection<Product>('products', ref => {
      return ref.where('productName', '==', this.addNewBOMForm.get('product').value);
    }).get().subscribe(p => {
      p.docs.forEach(product => {
        this.listOfProducts.push(
          {
            'product': this.addNewBOMForm.get('product').value,
            'quantity': this.addNewBOMForm.get('quantity').value,
            'unit': product.data().unit
          }
        );
      });
    });

    let bom = {
      'food': this.addNewBOMForm.get('food').value,
      'products': this.listOfProducts
    }
    console.log(bom);
  }
  selectedProduct(e) {
    this.productSelected = e;
  }
  foodSelect(e) {
    if (e) {
      this.showContent = "";
    } else {
      this.showContent = "hidden";
    }
  }
}
