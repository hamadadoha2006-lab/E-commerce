import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BrandProductService } from '../../../core/service/brandsProduct/brand-product.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from "../../../shared/components/card/card.component";
import { Product } from '../../../core/interface/products/product.interface';

@Component({
  selector: 'app-brand-product',
  imports: [CardComponent],
  templateUrl: './brand-product.component.html',
  styleUrl: './brand-product.component.css',
})
export class BrandProductComponent {
  @Input() info!:Product
  private readonly brandProductService=inject(BrandProductService);
  private readonly activatedRoute=inject(ActivatedRoute);
  brandProducts:WritableSignal<any>=signal<any>([]);
  brandId:string|null=null;
  getBrandProductData():void{
    this.brandProductService.getBrandProduct(this.brandId).subscribe({
      next:(res)=>{
        console.log(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getBrandId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.brandId=urlParams.get("id")
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
