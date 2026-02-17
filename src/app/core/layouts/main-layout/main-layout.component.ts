import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { CartService } from '../../../core/service/cart/cart.service';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';


@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Check if user is logged in before loading cart and wishlist
    const token = isPlatformBrowser(this.platformId) 
      ? localStorage.getItem('userToken') 
      : null;

    if (token) {
      // Load cart count
      this.cartService.getCart().subscribe({
        next: (res) => {
          this.cartService.cartItemsCount.set(res.numOfCartItems);
        },
        error: (err) => {
          console.log('Cart loading error:', err);
        }
      });

      // Load wishlist IDs
      this.wishlistService.getWishlist().subscribe({
        next: (res) => {
          this.wishlistService.wishlistIds.set(res.data.map(product => product.id));
        },
        error: (err) => {
          console.log('Wishlist loading error:', err);
        }
      });
    }
  }
}
