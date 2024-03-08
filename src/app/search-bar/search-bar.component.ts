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
  products: Product[] = [];
  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;
  // filteredData: Product[] = [];
  searchQuery: string = "";
  filteredData: Product[] = []; // Assuming this is your filtered data
  constructor(private productService: ProductService) {}
  onSearch(){ 
    this.productService.getByName(this.searchQuery).subscribe((product:any) => { 
      this.productListComponent.assignData(product); 
     

       });
}
assignDataToProductList() {
  // Call the assignData method of the ProductListComponent
  this.productListComponent.assignData(this.filteredData);
}


}

