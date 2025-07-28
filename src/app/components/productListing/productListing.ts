import { Component, inject } from "@angular/core";
import { ProductService } from "../../shared/product.service";

@Component({
    selector:'app-productlisting',
    templateUrl:'./productListing.html',
})
export class ProductListing {


productService = inject(ProductService);

}