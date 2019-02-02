import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FormGroup, FormControl } from '@angular/forms';
import { Purchase } from 'src/app/interfaces/purchase';
import { Observable } from 'rxjs';
import { Vendor } from 'src/app/interfaces/vendor';
import { Product } from 'src/app/interfaces/product';
import { StockHistory } from 'src/app/interfaces/stockHistory';
import { StocksServiceService } from 'src/app/services/stocks-service.service';
import { AngularFireStorage } from 'angularfire2/storage';
declare var swal: any;

@Component({
  selector: 'app-addpurchase',
  templateUrl: './addpurchase.component.html',
  styleUrls: ['./addpurchase.component.css']
})
export class AddpurchaseComponent implements OnInit {
  constructor(private db: AngularFirestore, private DialogRef: MatDialogRef<AddpurchaseComponent>, private stockService: StocksServiceService, private storage: AngularFireStorage) {
    this.purchasesRef = db.collection<Purchase>('purchases');
    this.vendorsRef = db.collection<Vendor>('vendors');
    this.productsRef = db.collection<Product>('products');
    this.stockHistoriesRef = db.collection<StockHistory>('stockHistories');
  }
  saveDisabled = false;
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

  file: File;

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
      bills: new FormControl(),
    });
    this.vendors = this.db.collection('vendors').valueChanges();
    this.products = this.db.collection('products').valueChanges();
  }

  productsForUpdate: Observable<Product[]>;
  productForUpdateCollect: AngularFirestoreCollection<Product>;

  addPurchase() {
    if (this.addFormPurchase.valid) {
      this.addFormPurchase.get('userName').setValue('Administrator');
      this.saveDisabled = true;
      this.purchasesRef.add(this.addFormPurchase.value).then(res => {
        if (res) {
          this.productForUpdateCollect = this.db.collection('products', ref => {
            return ref.where('productName', '==', this.addFormPurchase.get('productName').value);
          });
          this.productForUpdateCollect.get().subscribe(products => {
            products.docs.forEach(product => {
              this.updateStock(product.data(), res);
            });
          });
        } else {
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
  progressBarValue;
  uploadBills(event) {
    let selectedFiles: FileList;
    selectedFiles = event;
    if (selectedFiles.item(0)) {
      let file = selectedFiles.item(0);
      let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
      const uploadTask = this.storage.upload('/bills/' + uniqkey, file);

      uploadTask.percentageChanges().subscribe((value) => {
        this.progressBarValue = value.toFixed(2);
      });
      uploadTask.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
        snapshot.ref.getDownloadURL().then(url => {
          this.addFormPurchase.get('bills').setValue(url); // Image url
        })
      });
    }
  }
  productsNote: Observable<Product[]>;
  productNotesCollect: AngularFirestoreCollection<Product>;

  async testQuery() {
    /*
    this.productNotesCollect = this.db.collection('products', ref => {
      return ref.where('cost', '>=', 10000);
    });
    this.productNotesCollect.get().subscribe(p => {
      p.docs.forEach(o => {
        this.updateStock(o.data(), '1111111');
      });
    });
    */
    const c = await this.stockService.getLatestQuantityByProductName(this.addFormPurchase.get('productName')).then(resp => {
      console.log(resp);
    });
  }
  updateStock(product, purchase) {
    console.log(product);
    const stockhist = {
      productName: product.productName,
      beforeQuantity: product.currentQuantity,
      stockChange: parseInt(this.addFormPurchase.get('quantity').value),
      currentQuantity: (parseInt(this.addFormPurchase.get('quantity').value) + parseInt(product.currentQuantity)),
      updateDate: new Date(),
      updateSource: 'Purchase',
      purchaseDetailId: purchase,
      createdAt: new Date(),
    }
    this.db.collection('stockHistories').add(stockhist).then((resp) => {
      //console.log(resp.id);
      this.updateCurrentStock(product, stockhist.currentQuantity);
    });
  }
  updateCurrentStock(product, CurrentQuantity) {
    const _product: Product = product;
    _product.currentQuantity = CurrentQuantity;
    this.db.collection('products').doc(product.id).update(_product).then((resp) => {
      this.DialogRef.close('success');
    });
  }
}
