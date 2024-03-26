import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Sale } from '../Sale';
import { Product } from '../product';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  headArray = [
    {'Head': 'Product Name', 'FieldName': 'productname'},
    {'Head': 'Price', 'FieldName': 'price'},
    {'Head': 'Quantity', 'FieldName': 'qty'},
    {'Head': 'Amount', 'FieldName': 'totalAmount'},
    {'Head': 'Date', 'FieldName': 'date'}
  ];
  sales:Sale[]=[];
  sale:Sale=new Sale(); 
  products:Product[]=[];
  product:Product=new Product();
  // productname:string="";


  constructor(private service:ProductService){}
  ngOnInit() {
    //it loads your first dropdown data
    this.loadData();
  }
  getFieldNamesFromProducts(product:Product[]) {
    // Assuming products array is populated somewhere
    // Iterate over the products array
    product.forEach((product: Product) => {
      // Get the FieldName value from each product
      // this.sale.products.push(product);
      console.log(product);
      this.sale.products.push(product);
        
      console.log(this.sale.products); // You can do whatever you need with fieldName
    });
    this.sales.push(this.sale);
    // console.log(this.sales);
  }

  loadData(){
this.service.getSalesReport().subscribe((sale:any)=>{
  this.sales=sale;
  console.log(this.sales);
  // this.sale.products=sale;
  // this.getFieldNamesFromProducts(this.sale.products);
  this.sales.forEach((sale: Sale) => {
    // Get the FieldName value from each product
    // this.sale.products.push(product);
    this.sale=sale;

    console.log(sale);
    // this.sale.products.push(product);
        });
  // this.sales.push(this.sale);

 //ex loop
//  for (let pro of product.data) {
//   this.categories.push(pro.category)
// }
// this.categories = Array.from(new Set(this.categories));


// })


  // for(let sale of this.sales){
  //     //  this.products.push(sale.products)
  //     for(let spr of sale.products){
  //       this.products.push(spr)
  //     }


  //   }
    // console.log(this.products);

    // this.products.push(this.product);


    // for(let pro of this.products){
    //   console.log(pro.name);
    // }
 
})

}

}
