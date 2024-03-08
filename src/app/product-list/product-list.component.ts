import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:Product[]=[];
  constructor(private productService:ProductService,private router:Router){  
  
  }
  ngOnInit(): void {
    this.getproducts();
    
  
  }
   getproducts(){ 
    this.productService.getListProducts().subscribe((product:any) => {
      // console.log(this.getproducts());
    //   console.log(data);
     this.products=product.data;
    });
}
 update(id:string){
  this.router.navigate([`update-product`,id])
  // this.productService.updateProduct(product);
  // this.getproducts();

   
}
 public delete(name:string){
  this.productService.deleteProduct(name).subscribe(()=>{
    this.getproducts();

  },error=> console.log(error)
  );  
  
  console.log(name);
  
  
}  
}
