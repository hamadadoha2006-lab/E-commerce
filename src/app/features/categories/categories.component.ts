import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../core/service/catogeries/category.service';
import { Category } from '../../core/interface/products/product.interface';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { categoryes } from '../../core/interface/categories/category.interface';

@Component({
  selector: 'app-categories',
  imports: [CategoryCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService=inject(CategoryService);
  categoryList:WritableSignal<Category[]>=signal<Category[]>([])
  getCategoriesData():void {
    this.categoryService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.getCategoriesData();
  }
}
