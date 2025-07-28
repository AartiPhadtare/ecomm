import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../shared/product.service";
import { CartService } from "../../shared/cart.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.html'
})
export class Header{
    productService = inject(ProductService);
    cartService = inject(CartService);

    router = inject(Router);
    changeRoute(path:string){
        this.router.navigate([path]);
    }
}
