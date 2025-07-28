import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: any[] = [];
  cartItemsSubject = new BehaviorSubject<any>([]);
  sub = new Subject();

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems);
  }

  totalItems(): number {
    return this.cartItems.length;
  }

  getCartItems(): Observable<any> {
    return this.cartItemsSubject.asObservable();
  }

  removeItem(id: number) {
    this.cartItems.splice(id, 1);
    this.cartItemsSubject.next(this.cartItems);
  }
}
