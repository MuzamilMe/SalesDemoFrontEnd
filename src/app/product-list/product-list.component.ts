import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import {TableColumn} from "../TableCoulmn";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products:Product[]=[];
  columns:TableColumn[]=[
    {'caption': 'Product Name', 'field': 'name'},
    {'caption': 'Price', 'field': 'price'},
    {'caption': 'Quantity', 'field': 'qty'},
    {'caption': 'Category', 'field': 'category'},
    {'caption': 'Action', 'field': 'edit , delete'}

  ];
  searchQuery: string = '';
  filteredProducts: any[] = [];

  constructor(private productService:ProductService,private router:Router){

  }
  ngOnInit(): void {
    this.getproducts();
  }
  applySearchFilter() {
    // console.log('Search term:', this.searchQuery);
    // console.log('Products:', this.products);

    // Check if the search term is empty
    if (this.searchQuery.trim() === '') {
      // If the search term is empty, display all products
       this.filteredProducts = this.products;
    } else {
      // If the search term is not empty, filter the products based on the search term
      // Check if this.products is an array before filtering
      if (Array.isArray(this.products)) {
        this.filteredProducts = this.products.filter(product =>
          product.name.toUpperCase().includes(this.searchQuery.toUpperCase())
        );
      } else {
        console.error('Products is not an array:', this.products);
        // Handle the case where products is not an array
      }
    }

    // console.log('Filtered products:', this.filteredProducts);
  }


  onSearch() {
    // console.log('Search term:', this.searchQuery);
    // Call applySearchFilter() or any other method to filter/search based on the search term
    this.applySearchFilter();
  }
   public getproducts(){
    this.productService.getListProducts().subscribe((product:any) => {
      this.products=product.data;
      this.applySearchFilter();

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
