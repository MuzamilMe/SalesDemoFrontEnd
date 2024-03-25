import { Product } from "./product";

export class sales {
    totalAmount: number;
    date:string;
    qty:number;
    product:Product [];

    constructor(){
      this.totalAmount=0;
      this.date='' ;
      this.qty=0;
      this.product=[];
    }
}
