import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subject } from 'rxjs';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-productlisting',
  templateUrl: './productListing.html',
})
export class ProductListing {
  productService = inject(ProductService);
  cartService = inject(CartService);

  addToCart(product: any) {
    this.cartService.addToCart(product)
  }
}
