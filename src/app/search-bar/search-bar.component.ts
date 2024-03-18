import { Component,ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductListComponent } from '../product-list/product-list.component';
import { MyTableComponent } from '../my-table/my-table.component';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  products:Product[]=[];
  headArray=[
    {'Head':'Product Name','FieldName':'name'},
    {'Head':'Price','FieldName':'price'},
    {'Head':'Quantity','FieldName':'qty'},
    {'Head':'Category','FieldName':'category'},
    {'Head':'Action','FieldName':''}   
   
  ];
  @ViewChild(ProductListComponent) productListComponent!: ProductListComponent;
  searchQuery: string="";
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
    
  }
  onSearch(searchQuery:string){
    this.productService.getByName(searchQuery).subscribe((product:any) => {
      this.products= product.data;
      console.log(product)


    });
  }
}