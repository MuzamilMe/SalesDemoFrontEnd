import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { sales } from '../sales';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  headArray = [
    {'Head': 'Product Name', 'FieldName': 'products[0].name'},
    {'Head': 'Price', 'FieldName': 'price'},
    {'Head': 'Quantity', 'FieldName': 'qty'},
    {'Head': 'Amount', 'FieldName': 'totalAmount'},
    {'Head': 'Date', 'FieldName': 'date'}
  ];
  sales:sales[]=[];
  sale:sales=new sales();

  constructor(private service:ProductService){}
  ngOnInit() {
    //it loads your first dropdown data
    this.loadData();
  }
  loadData(){
this.service.getSalesReport().subscribe((report:any)=>{
  console.log(report);
  this.sales= report;

//   for(let sa of report){
   
//      this.sale.product = sa.product;
//      this.sale.date=sa.date;
//      this.sale.qty=sa.qty;
//      this.sale.totalAmount=sa.totalAmount;
//   }
// this.sales.push(this.sale);
console.log(sales);

// this.sale=new sale();
// this.sales=new sales();
});
  }

}
