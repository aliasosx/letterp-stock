import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { VendorsComponent } from 'src/app/dialogs/vendors/vendors.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openVendor() {
    const dialogRef = this.dialog.open(VendorsComponent, {
      width: '600px',
    })
  }
}
