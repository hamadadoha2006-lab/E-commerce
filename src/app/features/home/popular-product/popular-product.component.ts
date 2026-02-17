import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../core/service/products/product.service';
import { Product } from '../../../core/interface/products/product.interface';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-popular-product',
  imports: [CardComponent],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css',
})
export class PopularProductComponent implements OnInit{
    private readonly productService=inject(ProductService);
  productList:WritableSignal<Product[]>=signal<Product[]>([]);
  getProductData():void{
    this.productService.getProduct().subscribe({
      next: (res)=>{
        this.productList.set(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
   
  }
  ngOnInit(): void {
    this.getProductData()
  }
}
