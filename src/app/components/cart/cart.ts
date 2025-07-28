import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../shared/cart.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [JsonPipe, AsyncPipe],
})
export class Cart implements OnInit {
  cartService = inject(CartService);
  cartItems: any = [];

  ngOnInit(): void {
    this.cartService.cartItemsSubject.subscribe({
      next: (res) => {

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
