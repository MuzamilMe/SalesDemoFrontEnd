import { Component,OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']

})
export class POSComponent implements OnInit{
  categories:string[]=[];
  products:Product[]=[];
  selectedCategory: string = '';
  selectedProduct: string = '';


 constructor(private productService:ProductService){}
ngOnInit(){
  this.loadData();
}
  loadData(){
  this.productService.getCategoriesOnly().subscribe((category:any)=>{
     this.categories=category.data; 
  })
}
getProductByCategory(category:string){
  this.productService.getProductByCategory(category).subscribe((product:any)=>{
    this.products=product.data;
  })
}
onCategoryChange() {
  this.products = []; // Reset selected product when category changes
}
get selectedCategoryProducts() {
  return this.productService.getListProducts().filter(product => product.category === this.selectedCategory);
}
}
