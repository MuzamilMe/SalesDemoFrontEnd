import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  id:string="";
  product:Product = new Product();
  constructor(private productService:ProductService, private route:ActivatedRoute, private router:Router){

  }
  ngOnInit(): void {  
   this.id=this.route.snapshot.params['id'];
    this.productService.getById(this.id).subscribe(data=>{
     this.product=data;
    },error=>console.error());
  }
  onSubmit(){
console.log(this.product);
this.updateProduct();
  }
  updateProduct(){
    this.productService.updateProduct(this.product).subscribe(()=> {
      // console.log(data);
      this.goToProductList();
    },error=> console.log(error));
  }

  goToProductList(){
    this.router.navigate(['/listProducts'])
  }
}
