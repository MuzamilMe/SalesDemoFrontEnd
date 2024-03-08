import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  searchTerm: string = '';
  items: Observable<Product[]>;
  filteredItems: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Fetch items when the component initializes
    this.items = this.productService.getListProducts();
  }
  onSubmit() {
    // Filter items based on the search term
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
