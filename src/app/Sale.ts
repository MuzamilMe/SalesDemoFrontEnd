import {Product} from "./product";

export class Sale {
  totalAmount: number;
  date: string;
  qty: number;
  productName: string;
  price: number;
  products: Product [];

  constructor() {
    this.price = 0;
    this.productName = "";
    this.totalAmount = 0;
    this.date = "";
    this.qty = 0;
    this.products = [];
  }

}
