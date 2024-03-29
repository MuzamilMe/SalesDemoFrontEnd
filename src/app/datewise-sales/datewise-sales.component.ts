import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../product.service';
import {Sale} from '../Sale';
import {TableColumn} from "../TableCoulmn";


@Component({
  selector: 'app-datewise-sales',
  templateUrl: './datewise-sales.component.html',
  styleUrls: ['./datewise-sales.component.css']
})
export class DatewiseSalesComponent implements OnInit {
  dateForm: FormGroup = this.formBuilder.group({
    selectedDate: [null]
  });
  selectedDate = new Date();

  columns: TableColumn[] = [
    {'caption': 'Product Name', 'field': 'productName'},
    {'caption': 'Price', 'field': 'price'},
    {'caption': 'Quantity', 'field': 'qty',},
    {'caption': 'Amount', 'field': 'totalAmount'},
    {'caption': 'Date', 'field': 'date'}
  ];

  sales: Sale[] = [];
  errorMessage: string = '';
  date: string = '';

  constructor(private formBuilder: FormBuilder, private service: ProductService) {
    this.dateForm = this.formBuilder.group({

      selectedDate: [null]
    });

    // const formattedDate: string = this.formatDate(this.selectedDate);
    // console.log('fm'+formattedDate); // Output example: "2024-03-29"

  }

  ngOnInit(): void {
    // this.loadData();

  }

  dateChanged($event: any) {
    this.selectedDate = $event.target.value;
    this.formatDate(this.selectedDate);
    this.sales=[];
    this.loadData();


  }

  // formatDate(date: Date): string {
  //   const year: number = date.getFullYear();
  //   const month: number = date.getMonth() + 1; // Adding 1 because getMonth returns zero-based month
  //   const day: number = date.getDate();
  //
  //   // Ensure leading zeros for month and day if necessary
  //   const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
  //   const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
  //
  //   return `${year}-${formattedMonth}-${formattedDay}`;
  // }
  formatDate(date: Date) {
    const currentDate = this.selectedDate;
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
    this.date = `${year}-${month}-${day}`

  }
  loadData(): void {
    this.errorMessage = ''; // Reset error message before loading data

    this.service.getSalesReport().subscribe((sales: any) => {
      let salesFound = false; // Flag to indicate if any sales are found
      this.sales = []; // Reset sales array before loading new data

      sales.forEach((sale: any) => {
        sale.products.forEach((product: any) => {
          if (sale.date === this.date) {
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
        this.errorMessage = 'Sales found on ' + this.date;
      } else {
        this.errorMessage = 'Sales not found on ' + this.date;
      }
    });
  }

  }

