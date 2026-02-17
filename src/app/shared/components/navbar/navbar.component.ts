import { Component, Inject, inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { stored_key } from '../../../core/constant/storedKey';
import { CartService } from '../../../core/service/cart/cart.service';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';
import { FlowbiteService } from '../../../core/service/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() isLogin!: boolean;
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  readonly cartService = inject(CartService);
  readonly wishlistService = inject(WishlistService);

  private readonly flowbiteService=inject(FlowbiteService)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(stored_key.userToken);
    }
    this.router.navigate(['/login']);
  }
}
