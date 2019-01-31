import { Injectable } from '@angular/core';
import { FirebaseFirestore } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class StocksServiceService {

  constructor(private db: FirebaseFirestore) { }
  
  updateStock() {

  }
}
