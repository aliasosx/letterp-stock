import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBomComponent } from 'src/app/dialogs/add-bom/add-bom.component';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Bom } from 'src/app/interfaces/bom';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {

  constructor(private dialog: MatDialog, private db: AngularFirestore) {
    this.bomsRef = db.collection<Bom>('BillOfMaterials');
  }
  title: string = 'Bill Of Material'
  bomsRef: AngularFirestoreCollection<Bom>;
  boms: Observable<any[]>;

  ngOnInit() {
    this.boms = this.bomsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const data = a.payload.doc.data() as Bom;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));
  }
  addNewBom() {
    const dialogRef = this.dialog.open(AddBomComponent, {
      width: '800px'
    });
  }
}
