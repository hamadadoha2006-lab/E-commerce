import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute=inject(ActivatedRoute);
  private readonly fb=inject(FormBuilder);
  private readonly cartService=inject(CartService)
  cartId:string|null=null;
  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=> {
        this.cartId=urlParams.get("id");       
      },
    })
  }
  checkOutForm!:FormGroup
  checkOutFormInit():void{
    this.checkOutForm=this.fb.group({
    shippingAddress:this.fb.group({
      details:[null, [Validators.required]],
      phone:[null, [Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)]],
      city:[null, [Validators.required]],
    })
  })
  }
  onSubmitCheckOutForm():void{
    if (  this.checkOutForm.valid) {
      // console.log(this.checkOutForm.value);
      // console.log(this.cartId)
      this.cartService.checkOutSession(this.cartId,this.checkOutForm.value).subscribe({
        next:(res)=>{
          if (res.status==="success") {
            window.open(res.session.url , "_self")
          }
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

   ngOnInit(): void {
    this.checkOutFormInit()
    this.getCartId();
  }
}
