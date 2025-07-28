import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../shared/product.service";

@Component({
    selector:'app-header',
    templateUrl:'./header.html'
})
export class Header{
    productService = inject(ProductService);

    router = inject(Router);
    changeRoute(path:string){
        this.router.navigate([path]);
    }
}