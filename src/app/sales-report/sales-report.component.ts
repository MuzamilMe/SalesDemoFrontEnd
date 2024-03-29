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
    {'caption': 'Product Name', 'field': 'productName', 'label': '', isClickable: false, 'imageSrc': ''},
    {'caption': 'Price', 'field': 'price', 'label': '', isClickable: false, 'imageSrc': ''},
    {'caption': 'Quantity', 'field': 'qty', 'label': '', isClickable: false, 'imageSrc': ''},
    {'caption': 'Amount', 'field': 'totalAmount', 'label': '', isClickable: false, 'imageSrc': ''},
    {'caption': 'Date', 'field': 'date', 'label': '', isClickable: false, 'imageSrc': ''},

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
  // loadData() {
  //   this.service.getSalesReport().subscribe((sales: any) => {
  //     sales.forEach((sale: any) => {
  //       sale.products.forEach((product: any) => {
  //         this.sal.productName=product.name;
  //         this.sal.price=product.price;
  //         this.sal.qty=sale.qty;
  //         this.sal.date=sale.date;
  //         this.sal.totalAmount=sale.totalAmount;
  //         this.sales.push(this.sal);
  //         this.sal=new Sale();
  //       });
  //     });
  //   });
  // }}
