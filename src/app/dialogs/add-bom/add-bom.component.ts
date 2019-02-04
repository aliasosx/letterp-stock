import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  }

  addNewBOMForm: FormGroup;
  foodsRef: AngularFirestoreCollection<Food>;
  foods: Observable<any[]>;
  listOfProducts: any;

  ngOnInit() {
    this.addNewBOMForm = new FormGroup({

    });
    this.foods = this.foodsRef.valueChanges();
  }
  addProduct() {
    if (this.listOfProducts) {
      this.listOfProducts.push(
        {
          'product': 'Coke',
          'quantity': 20
        }
      );
    } else {
      this.listOfProducts = [{
        'product': 'Pepsi',
        'quantity': 25
      }];
    }
    console.log(this.listOfProducts);
  }
}
