import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../core/service/products/product.service';
import { Product } from '../../core/interface/products/product.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule, PaginationInstance} from 'ngx-pagination';


@Component({
  selector: 'app-products',
  imports: [CardComponent, SearchPipe, FormsModule , NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
     private readonly productService=inject(ProductService);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);
  getProductData(page: number = 1 , limit: number = 20):void{
    this.productService.getProduct(this.pagination.currentPage).subscribe({
      next: (res)=>{
        this.productList.set(res.data);
        this.pagination.totalItems=res.results;
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
  }
  text:string="";
  categoryText:string="";
  ngOnInit(): void {
    this.getProductData()
  }

  pagination:PaginationInstance = { 
    id: 'products',
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: 0 
  }
    pageChanged(page:number):void{
      this.pagination.currentPage=page;
      this.getProductData(this.pagination.currentPage,this.pagination.itemsPerPage);
    }
}