import {Component, OnInit} from '@angular/core';
import { ProductService } from '../product.service';
import { Sale } from '../Sale';
import { TableColumn } from "../TableCoulmn";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  columns: TableColumn[] = [
    {'caption': 'Product Name', 'field': 'productName'},
    {'caption': 'Price', 'field': 'price'},
    {'caption': 'Quantity', 'field': 'qty'},
    {'caption': 'Amount', 'field': 'totalAmount'},
    {'caption': 'Date', 'field': 'date'},
    {'caption': 'Customer Name', 'field': 'cname'},
    {'caption': 'Payment Type', 'field': 'payType'}


  ];

  sales: Sale[] = [];
  sal: Sale = new Sale();
  date: Date = new Date();
  myDate: string = '';
  errorMessage: string = '';

  constructor(private service: ProductService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  formatDate(date: Date) {
    const currentDate = this.date;
    const year = currentDate.getFullYear(); // Get the year component
    let month = (currentDate.getMonth() + 1).toString(); // Get the month component (Note: month is zero-based, so we add 1)
    let day = currentDate.getDate().toString(); // Get the day component
    // console.log(this.date)
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    this.myDate = `${year}-${month}-${day}`

  }

  loadData(): void {
    this.formatDate(this.date);
    this.errorMessage = ''; // Reset error message before loading data

    this.service.getSalesReport().subscribe((sales: any) => {
      let salesFound = false; // Flag to indicate if any sales are found
      this.sales = []; // Reset sales array before loading new data

      sales.forEach((sale: any) => {
        sale.products.forEach((product: any) => {
          if (sale.date === this.myDate) {
            const newSale = new Sale();
            newSale.productName = product.name;
            newSale.price = product.price;
            newSale.qty = sale.qty;
            newSale.date = sale.date;
            newSale.totalAmount = sale.totalAmount;
            newSale.cname=sale.cname;
            newSale.payType=sale.payType;
            this.sales.push(newSale);
            salesFound = true; // Set flag to true if sales are found
          }
        });
      });

      if (salesFound) {
        this.errorMessage = 'Sales found on ' + this.myDate;
      } else {
        this.errorMessage = 'Sales not found on ' + this.myDate;
      }
    });
  }
}
