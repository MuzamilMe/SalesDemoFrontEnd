import {Component} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {TableColumn} from "../TableCoulmn";

@Component({
  selector: 'app-less-products',
  templateUrl: './less-products.component.html',
  styleUrls: ['./less-products.component.css']
})
export class LessProductsComponent {
  products: Product[] = [];
  lowstock: Product[] = [];
  columns: TableColumn[] = [
    {'caption': 'Product Name', 'field': 'name'},
    {'caption': 'Quantity', 'field': 'qty'},
    {'caption': 'Category', 'field': 'category'},

  ];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getLowStockProducts();
  }

  public getLowStockProducts() {
    this.productService.getListProducts().subscribe((product: any) => {
      this.products = product.data;
      this.lowstock = this.products.filter(pro => pro.qty < '8');
    });
  }


}

