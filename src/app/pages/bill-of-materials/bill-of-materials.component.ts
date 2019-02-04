import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBomComponent } from 'src/app/dialogs/add-bom/add-bom.component';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  title: string = 'Bill Of Material'
  ngOnInit() {
  }
  addNewBom() {
    const dialogRef = this.dialog.open(AddBomComponent, {
      width: '800px'
    });
  }
}
