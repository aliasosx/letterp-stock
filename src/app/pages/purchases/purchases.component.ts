import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { Purchase } from 'src/app/interfaces/purchase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddpurchaseComponent } from 'src/app/dialogs/addpurchase/addpurchase.component';
import { ViewaddpurchaseComponent } from 'src/app/dialogs/viewaddpurchase/viewaddpurchase.component';
declare var swal: any;

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.purchasesRef = db.collection<Purchase>('purchases');
  }

  purchasesRef: AngularFirestoreCollection<Purchase>;
  purchaseDoc: AngularFirestoreDocument<Purchase>;
  purchases: Observable<any[]>;

  ngOnInit() {
    this.purchases = this.db.collection('purchases').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Purchase;
        data['id'] = a.payload.doc.id;
        return data;
      })
    }))
  }
  addPurchase() {
    const dialogAddRef = this.dialog.open(AddpurchaseComponent, {
      width: '600px',
    });
  }
  deletePurchase(purchase) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.db.collection('purchases').doc(purchase.id).delete();
        swal('purchases has been deleted', 'Purchase', 'success');
      } else {
        //swal("Delete canceled");
        return;
      }
    });
  }
  updatePurchase(purchase) {
    const dialogRef = this.dialog.open(ViewaddpurchaseComponent, {
      width: '600px',
      data: purchase
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'success') {
        swal('Purchase has been saved', 'Test', 'success');
      }
    })
  }
}
