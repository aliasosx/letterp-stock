import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Currency } from 'src/app/interfaces/currency';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { Food } from 'src/app/interfaces/food';
import { Kitchen } from 'src/app/interfaces/kitchen';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddFoodComponent>, private db: AngularFirestore, private storage: AngularFireStorage) {
    this.currenciesRef = db.collection<Currency>('currencies');
    this.foodsRef = db.collection<Food>('foods');
    this.kitchensRef = db.collection<Kitchen>('kitchens');
  }

  addFoodForm: FormGroup;
  showAlert = "hidden";
  photoSrc = "../../../assets/images/icons/search.svg";
  progressBarValue;

  currenciesRef: AngularFirestoreCollection<Currency>;
  currenciesDoc: AngularFirestoreDocument<Currency>;
  currencies: Observable<any[]>;

  kitchensRef: AngularFirestoreCollection<Kitchen>;
  kitchens: Observable<any[]>;


  foodsRef: AngularFirestoreCollection<Food>;
  foodsDoc: AngularFirestoreDocument<Food>;

  saveDisabled = false;

  ngOnInit() {
    this.addFoodForm = new FormGroup({
      'foodId': new FormControl(),
      'food_name': new FormControl(),
      'food_name_en': new FormControl(),
      'cost': new FormControl(0),
      'price': new FormControl(0),
      'photo': new FormControl(),
      'currency': new FormControl('KIP'),
      'createdAt': new FormControl(new Date()),
      'updatedAt': new FormControl(new Date()),
      'username': new FormControl('Administrator'),
      'kitchenName': new FormControl(),
    });
    this.currencies = this.currenciesRef.valueChanges();
    this.kitchens = this.kitchensRef.valueChanges();
  }

  uploadPhoto(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      let file = selectedFiles.item(0);
      let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/foods/' + uniqkey, file);
      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.photoSrc = url; // Image url
          console.log(url);
        })
      });
    }
  }
  createFood() {
    this.addFoodForm.get('photo').setValue(this.photoSrc);
    if (this.addFoodForm.valid) {
      this.saveDisabled = true;
      this.showAlert = "hidden";
      this.foodsRef.add(this.addFoodForm.value).then((resp) => {
        this.dialogRef.close('success');
      }).catch((err) => {
        console.log(err);
        this.showAlert = "";
        return;
      });
    } else {
      this.showAlert = "";
    }
  }
}
