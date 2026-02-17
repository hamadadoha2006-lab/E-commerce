import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/service/wishlist/wishlist.service';
import { WishlistProduct } from '../../core/interface/wishlist/wishlist.interface';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, TitleCasePipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  
  wishlistProducts: WritableSignal<WishlistProduct[]> = signal<WishlistProduct[]>([]);

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts.set(res.data);
        this.wishlistService.wishlistIds.set(res.data.map(product => product.id));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistService.wishlistIds.set(res.data);
        this.loadWishlist();
        Swal.fire({
          icon: 'success',
          title: 'Removed from Wishlist!',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems);
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          showConfirmButton: false,
          timer: 1500,
          position: 'top-end',
          toast: true
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
