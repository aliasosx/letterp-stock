import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class StocksServiceService {
  constructor(private db: AngularFirestore) { }
  productsRef: AngularFirestoreCollection<Product>;
  productsDoc: AngularFirestoreDocument<Product>;
  CurrentQuantity: number;
  getLatestQuantityByProductName(productName): Promise<Product> {
    return new Promise((resolve, reject) => {
      return this.db.collection('products', ref => {
        return ref.where('productName', '==', productName);
      });
    });
  }
}
