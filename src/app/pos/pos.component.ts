import { Component, EventEmitter, OnInit } from '@angular/core';
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
  selectedProduct:string='';
  total:number=0;
  headArray=[
    {'Head':'Product Name','FieldName':'name'},
    {'Head':'Price','FieldName':'price'},
    {'Head':'Quantity','FieldName':'qty'},
    {'Head':'Amount','FieldName':'total'},
    {'Head':'Action','FieldName':''}   
  ];
  cartItems:Cart[]=[];
  onDelete: EventEmitter<{ index: number}> = new EventEmitter<{ index: number }>();

  product:Product=new Product();
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
            this.selectedCategoryProducts.push(pro.name);
            console.log(selectedCategory);
      }
    }
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
  }

  addProduct(){
    if(!this.product.qty){

    }else{
      let existingCartItemIndex = this.cartItems.findIndex(item => item.name === this.selectedProduct);
      if (existingCartItemIndex !== -1) {
        this.cartItems[existingCartItemIndex].qty += Number(this.product.qty);
        this.cartItems[existingCartItemIndex].total += Number(this.product.qty) * this.cartItems[existingCartItemIndex].price;
      }
      else{
      for(let pro of this.products){
      if(this.selectedProduct==pro.name){
   this.cart.name=this.selectedProduct;
   this.cart.price=Number(pro.price);
   this.cart.qty=Number(this.product.qty);
   this.cart.total=Number(pro.price)*Number(this.product.qty);
   this.calculateTotal();
   this.cartItems.push(this.cart);
   this.cart=new Cart();
   
      }
  }
}
this.product.qty='';
   this.selectedProduct='';
}}
deleteRow(index: number) {
  // Emit an object containing the index and product name
  this.onDelete.emit({ index });
  // Remove the row at the specified index from the selectedProducts array
  this.cartItems.splice(index, 1);
}
calculateTotal(){
this.total+=this.cart.total;
}
}

