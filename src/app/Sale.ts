import { Product } from "./product";

export class Sale {
    totalAmount: number;
    date:string;
    qty:number;
    productname:string;
    products:Product [];
constructor(){
    this.productname="";
    this.totalAmount=0;
    this.date="";
    this.qty=0;
    this.products=[];
}
  
}
