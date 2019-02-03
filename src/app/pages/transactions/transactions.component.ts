import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Transaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
declare var swal: any;
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.transactionsRef = db.collection<Transaction>('transactions');
  }

  transactionsRef: AngularFirestoreCollection<Transaction>;
  transactionsDoc: AngularFirestoreDocument<Transaction>;
  transactions: Observable<any[]>;
  ngOnInit() {
    //this.transactions = this.transactionsRef.valueChanges();
    this.transactions = this.db.collection('transactions').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Transaction;
        data['id'] = a.payload.doc.id;
        console.log(data);
        return data;
      })
    }));
  }
  deleteTransction(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.db.collection('transactions').doc(id).delete();
      } else {
        return;
      }
    });
  }

}
