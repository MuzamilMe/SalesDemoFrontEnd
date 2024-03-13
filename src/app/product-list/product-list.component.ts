import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:Product[]=[];
  headArray=[
    {'Head':'Product Name','FieldName':'name'},
    {'Head':'Price','FieldName':'price'},
    {'Head':'Quantity','FieldName':'qty'},
    {'Head':'Category','FieldName':'category'},
    {'Head':'Action','FieldName':''}   
   
  ];
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
 public update(id:string){
  this.productService.getById(id).subscribe((product:any)=>{
    this.products=product.data;
  })
  this.router.navigate([`update-product`,id])
  this.productService.updateProduct(id,this.products[0]);
  this.getproducts();
 }
 public delete(name:string){
  this.productService.deleteProduct(name).subscribe(()=>{
    this.getproducts();

  },error=> console.log(error)
  );
}
public getByName(search:any) {
    this.products=[]
  this.productService.getByName(search).subscribe((product:any) => {
    this.products=product.data;
  });

}

}
