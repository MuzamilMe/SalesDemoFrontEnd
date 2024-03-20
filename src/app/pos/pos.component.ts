import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import {  EMPTY, toArray } from 'rxjs';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']

})
export class POSComponent implements OnInit{
  categories:string[]=[];
   products:Product[]=[];
  selectedCategory: string = '';
  selectedCategoryProducts: any[] = [];


 constructor(private productService:ProductService){}
ngOnInit(){
  this.loadData();
}
  loadData(){
  this.productService.getCategoriesOnly().subscribe((category:any)=>{
     this.categories=category.data; 
    this.productService.getListProducts().subscribe((pr:any)=>{
      this.products=pr.data;
    })
  })
}
checkFirstDropdown(selectedCategory: string) {
  this.selectedCategoryProducts = this.products.filter(c => c.category === selectedCategory);
  if(selectedCategory!=null||selectedCategory!="Select"){
  this.getProductByCategory(selectedCategory);
  }
}
getProductByCategory(category:string){
  this.productService.getProductByCategory(category).subscribe((product:any)=>{
    this.products=product.data;
  })
}
onCategoryChange() {
  this.products = []; // Reset selected product when category changes
}

}

