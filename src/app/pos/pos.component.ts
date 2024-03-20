import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']

})
export class POSComponent implements OnInit {
  categories: string[] = [];
  products: Product[] = [];
  selectedCategory: string = '';
  selectedCategoryProducts: any[] = [];

  constructor(private productService: ProductService) { }
  ngOnInit() {
    //it loads your first dropdown data
    this.loadData();
  }
  loadData() {
    this.productService.getCategoriesOnly().subscribe((category: any) => {
      this.categories = category.data;
    })
  }
  //checks first dropdown value 
  checkFirstDropdown(selectedCategory: string) {
    this.selectedCategoryProducts = this.products.filter(c => c.category === selectedCategory);
    if (selectedCategory != null || selectedCategory != "Select") {
      this.getProductByCategory(selectedCategory);
    }
  }
  // its an api call in service which gets data for 2nd list
  getProductByCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe((product: any) => {
      this.products = product.data;
    })
  }
  // on changing category first it will empty the array of products
  onCategoryChange() {
    this.products = []; // Reset selected product when category changes
  }

}

