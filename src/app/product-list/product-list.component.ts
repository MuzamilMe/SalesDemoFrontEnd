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
   public getproducts(){
    this.productService.getListProducts().subscribe((product:any) => {
     this.products=product.data;
    });
}
 public update(id:string,product:Product){
  this.router.navigate([`update-product`,id])
  this.productService.updateProduct(id,product);
  this.getproducts();


}
 public delete(name:string){
  this.productService.deleteProduct(name).subscribe(()=>{
    this.getproducts();

  },error=> console.log(error)
  );
  console.log(name);
}
public getByName(search:any) {
    this.products=[]
  this.productService.getByName(search).subscribe((product:any) => {
    console.log(product);
    this.products=product.data;
  });

}

}
