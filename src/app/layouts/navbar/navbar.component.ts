import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component, OnInit } from '@angular/core';
import { Webmenu } from 'src/app/interfaces/webmenu';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFirestore) {
    this.webmenusRef = db.collection<Webmenu>('webmenus', ref => {
      return ref.orderBy('menuId', 'asc');
    });
  }
  webmenusRef: AngularFirestoreCollection<Webmenu>;
  webmenus: Observable<any[]>;
  ngOnInit() {
    this.webmenus = this.webmenusRef.valueChanges();
  }
}
