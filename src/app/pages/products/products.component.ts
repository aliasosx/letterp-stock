import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddProductsComponent } from 'src/app/dialogs/add-products/add-products.component';
import { ViewProductsComponent } from 'src/app/dialogs/view-products/view-products.component';
declare var swal: any;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.productsRef = db.collection<Product>('products');
  }

  title: string = 'Products';
  productsRef: AngularFirestoreCollection<Product>;
  private productDoc: AngularFirestoreDocument<Product>;
  product: Product;
  products: Observable<any[]>;
  ngOnInit() {
    //this.products = this.db.collection('products').valueChanges();
    this.products = this.db.collection('products').snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data['id'] = a.payload.doc.id;
        return data;
      });
    }));

  }

  openAddNewDialog() {
    const dialogRef = this.dialog.open(AddProductsComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'success') {
        swal('Products has been saved', 'Product add', 'success');
      } else {
        return;
      }

    });
  }

  deleteProduct(product) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        this.db.collection('products').doc(product.id).delete();
        //swal('Products has been deleted', 'Product', 'success');
      } else {
        swal("Delete canceled");
      }
    });
  }
  updateProduct(product) {
    const dialogRef = this.dialog.open(ViewProductsComponent, {
      width: '600px',
      data: product
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res == 'success') {
        swal('Products has been saved', 'Test', 'success');
      }
    })
  }

}
