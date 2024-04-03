import {Component, EventEmitter, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {Product} from '../product';
import {Cart} from '../Cart';
import {TableColumn} from "../TableCoulmn";


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']

})
export class POSComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string = '';
  products: Product[] = [];
  cart: Cart = new Cart();
  selectedCategoryProducts: any[] = [];
  selectedProduct: string = '';
  total: number = 0;
  cName: string = '';
  pType: string = '';
  errorMessage: string = ''; // Variable to store error message

  columns: TableColumn[] = [
    {'caption': 'Product Name', 'field': 'name'},
    {'caption': 'Price', 'field': 'price'},
    {'caption': 'Quantity', 'field': 'qty'},
    {'caption': 'Amount', 'field': 'amount'},
    {'caption': 'Action', 'field': 'delete'},


  ];
  cartItems: Cart[] = [];
  onDelete: EventEmitter<{ index: number }> = new EventEmitter<{ index: number }>();
  onEdit: EventEmitter<{ index: number }> = new EventEmitter<{ index: number }>();
  product: Product = new Product();

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    //it loads your first dropdown data
    this.loadData();

  }

  loadData() {
    this.productService.getListProducts().subscribe((product: any) => {
      this.products = product.data;

      for (let pro of product.data) {
        this.categories.push(pro.category)
      }
      this.categories = Array.from(new Set(this.categories));


    })
  }

  editRow(index: number, newQty: number) {
    // Update the quantity of the item at the specified index
    this.cartItems[index].qty = newQty;

    // Recalculate the total sum
    this.calculateTotal();

    // Emit an event indicating the edit
    this.onEdit.emit({index});
  }

  //checks first dropdown value
  checkFirstDropdown(selectedCategory: string) {
    for (let pro of this.products) {
      if (selectedCategory == pro.category) {
        this.selectedCategoryProducts.push(pro.name);
        // console.log(selectedCategory);
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
    this.selectedCategoryProducts = [];
  }

  addProduct() {
    if (this.selectedCategory === '') {
      this.errorMessage = 'Select Category First';
      return;
    }
    if (this.selectedProduct === '') {
      this.errorMessage = 'Select Product';
      return;
    }
    if (!this.product.qty) {
      this.errorMessage = 'Please Enter Quantity';
      return;
    } else {
      let existingCartItemIndex = this.cartItems.findIndex(item => item.name === this.selectedProduct);

      if (existingCartItemIndex !== -1) {
        this.cartItems[existingCartItemIndex].qty += Number(this.product.qty);
        this.cartItems[existingCartItemIndex].amount += Number(this.product.qty) * this.cartItems[existingCartItemIndex].price;
      } else {
        for (let pro of this.products) {
          if (this.selectedProduct == pro.name) {
            if (pro.qty < this.product.qty) {
              this.errorMessage = 'Only ' + pro.qty + ' ' + pro.name + ' available';
            } else {
              this.errorMessage = '';
              this.cart.name = this.selectedProduct;
              this.cart.qty = Number(this.product.qty);
              this.cart.price = Number(pro.price);
              this.cart.amount = Number(pro.price) * Number(this.product.qty);
              this.cartItems.push(this.cart);
              //used for table auto refresh
              this.cartItems = [...this.cartItems];
              console.log(this.cartItems);

              this.calculateTotal(); // Recalculate total here
              this.cart = new Cart();
            }
          }
        }
        this.product.qty = '';
        this.selectedProduct = '';
      }
    }
  }

  deleteRow(index: number) {
    // Emit an object containing the index and product name
    this.cartItems.splice(index, 1);
    this.onDelete.emit({index});
    this.calculateTotal();
    //used for table auto refresh
    this.cartItems = [...this.cartItems];

  }

  calculateTotal() {
    let sum = 0;
    for (let item of this.cartItems) {
      sum += item.amount;
    }

    this.total = sum;
  }

  checkOut(cart: Cart[]) {
    if (this.cartItems == null) {
      this.errorMessage = 'Select Products First!'
    }
    if (this.cName == '') {
      this.errorMessage = 'Enter Customer Name!'
    }
    if (this.pType == '') {
      this.errorMessage = 'Select Payment Type!'
    }
    // console.log('check'+this.pType)
    this.productService.transactions(cart, this.cName, this.pType).subscribe(() => {

    }, error => console.log(error));

    this.cName = '';
    this.pType = '';
    this.errorMessage = '';
    this.cartItems = [];
    this.total = 0;
  }
}

