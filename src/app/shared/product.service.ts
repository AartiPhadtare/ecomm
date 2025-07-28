import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'Noise-cancelling over-ear headphones',
      imageUrl: '../wireless headphones.png',
      category: 'Electronics',
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 149.99,
      description: 'Fitness tracking smartwatch',
      imageUrl: '../smartWatch.png',
      category: 'Wearables',
    },
    {
      id: 3,
      name: 'Gaming Mouse',
      price: 39.99,
      description: 'Ergonomic RGB gaming mouse',
      imageUrl: '../gamingMouse.png',
      category: 'Accessories',
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      price: 59.99,
      description: 'Portable waterproof speaker',
      imageUrl: '../speaker.png',
      category: 'Audio',
    },
  ];
  addToCart() {
    alert('Product added to the cart');
  }
}
