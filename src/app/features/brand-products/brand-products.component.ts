import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/service/products/product.service';
import { Product } from '../../core/interface/products/product.interface';
import { CardComponent } from "../../shared/components/card/card.component";

@Component({
  selector: 'app-brand-products',
  imports: [CardComponent],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export class BrandProductsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  
  brandId: string = '';
  productList: WritableSignal<Product[]> = signal<Product[]>([]);
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brandId = params['id'];
      this.getBrandProducts();
    });
  }
  
  getBrandProducts(): void {
    this.productService.getProductsByBrand(this.brandId).subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
