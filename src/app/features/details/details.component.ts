import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DetailsService } from '../../core/service/details/details.service';
import { ActivatedRoute } from '@angular/router';
import { productDetails } from '../../core/interface/details/details.interface';
import { CartService } from '../../core/service/cart/cart.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly detailsService=inject(DetailsService);
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly cartService=inject(CartService);
  
  productId:string|null=null;
  productDetailsData:WritableSignal<productDetails>=signal<productDetails>({} as productDetails)
  
  getSpecificProductData(){
    this.detailsService.getSpecificProduct(this.productId).subscribe({
      next:(res)=>{
        this.productDetailsData.set(res.data)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  getProductId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.productId=urlParams.get("id")
      },
      error:(err)=>{
        console.log(err);
      }
    }) 
  }
  
  ngOnInit(): void {
    this.getProductId();
    this.getSpecificProductData();
  }

  addToCart(): void {
    if (!this.productDetailsData().id) return;
    
    this.cartService.addToCart(this.productDetailsData().id).subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems);
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${this.productDetailsData().title.slice(0, 30)}... has been added to your cart`,
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to add product to cart',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      }
    });
  }
}
