import { Component,ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductListComponent } from '../product-list/product-list.component';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  product: any = {};
  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;
  // filteredData: Product[] = [];
  searchQuery: string="";
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    this.productService.getByName(this.searchQuery).subscribe((data) => {
        console.log(data);
        this.product=data;
        // return ResponseUtil.returnResponse('success', ' Product', this.product);
      },
      (error) => {
        console.error('Error retrieving product:', error);
      }
    );
  }
  onSearch(searchQuery:string){
    this.productListComponent.getByName(this.searchQuery);
      // this.productListComponent.assignData(searchQuery);
            // this.products.productListComponent.products.at(0)=data;
}
}

