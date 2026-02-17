import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../core/service/catogeries/category.service';
import { Category } from '../../../core/interface/products/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoryService=inject(CategoryService);
  categorySlider:WritableSignal<Category[]>=signal<Category[]>([])
  getCategoriesData():void {
    this.categoryService.getCategories().subscribe({
      next:(res)=>{
        this.categorySlider.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.getCategoriesData();
  }



  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
        margin: 10
      },
      480: {
        items: 2,
        nav: false,
        dots: true,
        margin: 15
      },
      768: {
        items: 3,
        nav: true,
        dots: true,
        margin: 20
      },
      1024: {
        items: 4,
        nav: true,
        dots: true,
        margin: 25
      },
      1200: {
        items: 5,
        nav: true,
        dots: true,
        margin: 30
      }
    },
    nav: true
  }
}
