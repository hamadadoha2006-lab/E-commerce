import { Component, inject, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '../../../core/interface/products/product.interface';
import { CurrencyPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { CartService } from '../../../core/service/cart/cart.service';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [RouterLink , TitleCasePipe , CurrencyPipe , SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() item:Product={} as Product
  private readonly cartService = inject(CartService);
  readonly wishlistService = inject(WishlistService);

  addToCart(): void {
    this.cartService.addToCart(this.item.id).subscribe({
      next: (res) => {
        this.cartService.cartItemsCount.set(res.numOfCartItems);
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${this.item.title.slice(0, 30)}... has been added to your cart`,
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

  toggleWishlist(): void {
    if (this.wishlistService.isInWishlist(this.item.id)) {
      // Remove from wishlist
      this.wishlistService.removeFromWishlist(this.item.id).subscribe({
        next: (res) => {
          this.wishlistService.wishlistIds.set(res.data);
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
    } else {
      // Add to wishlist
      this.wishlistService.addToWishlist(this.item.id).subscribe({
        next: (res) => {
          this.wishlistService.wishlistIds.set(res.data);
          Swal.fire({
            icon: 'success',
            title: 'Added to Wishlist!',
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
}
