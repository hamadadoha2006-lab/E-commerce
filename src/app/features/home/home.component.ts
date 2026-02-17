import { Component } from '@angular/core';
import { MainSliderComponent } from "./main-slider/main-slider.component";
import { PopularCategoriesComponent } from "./popular-categories/popular-categories.component";
import { PopularProductComponent } from "./popular-product/popular-product.component";

@Component({
  selector: 'app-home',
  imports: [PopularProductComponent, MainSliderComponent, PopularCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {
 
}
