import {Component} from '@angular/core';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  err: Boolean = false;
  product: Product = new Product();
  categories: string[] = [];

  constructor(private productService: ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.productService.getListProducts().subscribe((products: any) => {
      for (let pro of products.data) {
        this.categories.push(pro.category)
      }
      this.categories = Array.from(new Set(this.categories));


    })
  }

  onSubmit() {
    if (this.product.name == "" || this.product.price == "" || this.product.qty == "") {
      this.err = true;
    } else {
      console.log(this.product);
      this.saveProduct();
    }
  }

  saveProduct() {
    this.productService.addNewProduct(this.product).subscribe(() => {
      // console.log(data);
      this.goToProductList();
    }, error => console.log(error));
  }

  goToProductList() {
    this.router.navigate(['/listProducts'])
  }

}
