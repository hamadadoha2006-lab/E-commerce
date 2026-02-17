import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/service/cart/cart.service';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartData } from '../../core/interface/cart/cart.interface';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, SlicePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  
  cartData: WritableSignal<CartData | null> = signal<CartData | null>(null);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeItem(productId: string): void {
    this.cartService.removeCartItem(productId).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateQuantity(productId: string, count: number): void {
    if (count <= 0) {
      this.removeItem(productId);
      return;
    }

    this.cartService.updateCartItemQuantity(productId, count).subscribe({
      next: (res) => {
        this.cartData.set(res.data);
        this.cartService.cartItemsCount.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  increaseQuantity(productId: string, currentCount: number): void {
    this.updateQuantity(productId, currentCount + 1);
  }

  decreaseQuantity(productId: string, currentCount: number): void {
    this.updateQuantity(productId, currentCount - 1);
  }

  createCashOrder(): void {
    const cartId = this.cartData()?._id;
    if (!cartId) return;

    const orderDetails = {
      shippingAddress: {
        details: "details",
        phone: "01010800921",
        city: "Cairo"
      }
    };

    this.cartService.createCashOrder(cartId, orderDetails).subscribe({
      next: (res) => {
        console.log('Cash order created:', res);
        this.cartService.cartItemsCount.set(0);
        this.router.navigate(['/allorders']);
      },
      error: (err) => {
        console.log('Error creating cash order:', err);
      }
    });
  }
}
