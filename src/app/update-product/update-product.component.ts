import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService} from "../product.service";
import {Product} from "../product";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id: any;
  product:Product=new Product();
  categories: string[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getById(this.id).subscribe((product:any
      ) => {
        this.product=product.data;
      },
      (error) => {
        console.error('Error retrieving product:', error);
      }
    );
    this.loadData();
  }
  loadData() {
    this.productService.getListProducts().subscribe((product: any) => {
      // this.product = product.data;

      for (let pro of product.data) {
        this.categories.push(pro.category)
      }
      this.categories = Array.from(new Set(this.categories));


    })
  }
updateProduct(product:Product){
    this.productService.updateProduct(this.id,this.product).subscribe(()=> {
      this.router.navigate(['/listProducts']);
    },error=> console.log(error));
  }

  goToProductList(){
    this.router.navigate(['/listProducts'])
  }
}
