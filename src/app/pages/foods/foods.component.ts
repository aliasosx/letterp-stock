import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Food } from 'src/app/interfaces/food';
import { Observable } from 'rxjs';
import { AddFoodComponent } from 'src/app/dialogs/add-food/add-food.component';
import { map } from 'rxjs/operators';
declare var swal: any;

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore) {
    this.foodsRef = db.collection<Food>('foods');
  }

  foodsRef: AngularFirestoreCollection<Food>;
  foodsDoc: AngularFirestoreDocument<Food>;
  foods: Observable<any[]>;

  ngOnInit() {
    this.foods = this.db.collection('foods', ref => {
      return ref.orderBy('foodId', 'asc');
    }).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Food;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddFoodComponent, { width: '800px' });
  }
  deleteFood(id) {
    swal({
      title: "ທ່ານຕ້ອງການລຶບແທ້ບໍ?",
      text: "ຫຼັງຈາກລືບລາຍການແລ້ວບໍ່ສາມາທີ່ຈະຈກູ້ຄືນໄດ້",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.foodsRef.doc(id).delete();
      } else {
        return;
      }
    });

  }
}
