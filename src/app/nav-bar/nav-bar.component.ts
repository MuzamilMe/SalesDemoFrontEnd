import {Component} from '@angular/core';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private productService: ProductService) {
  }

  ngOnInit() {

  }

}
