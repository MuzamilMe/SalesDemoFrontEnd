import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService} from "../product.service";
import {Product} from "../product";
import {ResponseUtil} from "../response-util";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id: any;
  product: any = {};



  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {

  }
  handleResponse(): void {
    this.goToProductList();
    const response = ResponseUtil.returnResponse('success', 'Update Product', this.product);
    console.log('Response:', response);
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getById(this.id).subscribe((data) => {
        console.log(data);
        this.product=data;
        // return ResponseUtil.returnResponse('success', ' Product', this.product);
      },
      (error) => {
        console.error('Error retrieving product:', error);
      }
    );
  }
updateProduct(product:Product){
    this.productService.updateProduct(this.id,this.product).subscribe(()=> {
      this.router.navigate(['/listProducts']);
      // this.handleResponse();
    },error=> console.log(error));
  }

  goToProductList(){
    this.router.navigate(['/listProducts'])
  }

}
