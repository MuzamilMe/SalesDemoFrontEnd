import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Cart } from '../Cart';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']

})
export class POSComponent implements OnInit {
  categories: string[] = [];
  products: Product[] = [];
  cart:Cart=new Cart();
  selectedCategory: string = '';
  selectedCategoryProducts: any[] = [];
  headArray=[
    {'Head':'Product Name','FieldName':'name'},
    {'Head':'Price','FieldName':'price'},
    {'Head':'Quantity','FieldName':'qty'},
    {'Head':'Total','FieldName':'total'},
    {'Head':'Action','FieldName':''}   
  ];
  cartItems:Cart[]=[];
  constructor(private productService: ProductService) { }
  ngOnInit() {
    //it loads your first dropdown data
    this.loadData();
  }
  loadData() {
    this.productService.getListProducts().subscribe((product: any) => {
      this.products=product.data;
     
      for(let pro of product.data){
        this.categories.push(pro.category)
      }
      this.categories = Array.from(new Set(this.categories));

      
    })
  }
  //checks first dropdown value 
  checkFirstDropdown(selectedCategory: string) {
    for(let pro of this.products){
      if(selectedCategory==pro.category){
        console.log(pro.name);
            this.selectedCategoryProducts.push(pro.name);
      }
    }
    // this.selectedCategoryProducts = this.products.filter(c => c.category === selectedCategory);
    // this.productService.getListProducts().subscribe(())
    // if (selectedCategory != null || selectedCategory != "Select") {
    //   this.getProductByCategory(selectedCategory);
    // }
  }
  // its an api call in service which gets data for 2nd list
  getProductByCategory(category: string) {
    this.productService.getProductByCategory(category).subscribe((product: any) => {
      this.products = product.data;
    })
  }
  // on changing category first it will empty the array of products
  onCategoryChange() {
    this.selectedCategoryProducts=[];
    //this.products = []; // Reset selected product when category changes
  }
  addProduct(product:Product){
    console.log(product);
    this.cart.name= product.name;
    this.cart.price= Number(product.price);
    this.cart.qty=Number(product.qty);
    this.cart.total=this.cart.qty*Number(product.price);
    this.cartItems.push(this.cart)
  }

}

