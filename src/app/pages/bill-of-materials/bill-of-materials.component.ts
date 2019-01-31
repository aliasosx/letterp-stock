import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {

  constructor() { }
  title: string = 'Bill Of Material'
  ngOnInit() {
  }

}
