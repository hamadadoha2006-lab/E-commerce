import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { DetailsComponent } from './features/details/details.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { CategoriesDetailsComponent } from './features/categories-details/categories-details.component';
import { defaultRedirectGuard } from './core/auth/guards/default-redirect.guard';
import { authGuard } from './core/auth/guards/auth.guard';
import { RedirectComponent } from './core/redirect/redirect.component';
import { BrandProductsComponent } from './features/brand-products/brand-products.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { AllordersComponent } from './features/allorders/allorders.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [defaultRedirectGuard],
        component: RedirectComponent,
    },
    {
        path: 'allorders',
        pathMatch: 'full',
        component: AllordersComponent,
        title: 'Order Success',
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                title: 'Login',
            },
            {
                path: 'register',
                component: RegisterComponent,
                title: 'Register',
            },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                title: 'Home',
            },
            {
                path: 'products',
                component: ProductsComponent,
                title: 'Products',
            },
            {
                path: 'category',
                component: CategoriesComponent,
                title: 'Categories',
            },
            {
                path: 'brands',
                component: BrandsComponent,
                title: 'Brands',
            },
            {
                path: 'brand-products/:id',
                component: BrandProductsComponent,
                title: 'Brand Products',
            },
            {
                path: 'categories-details/:id',
                component: CategoriesDetailsComponent,
                title: 'Categories Details',
            },
            {
                path: 'details/:slug/:id',
                component: DetailsComponent,
                title: 'Details',
            },
            {
                path: 'cart',
                component: CartComponent,
                title: 'Cart',
            },
            {
                path: 'wishlist',
                component: WishlistComponent,
                title: 'Wishlist',
            },
            {
                path: 'checkout/:id',
                component: CheckoutComponent,
                title: 'Check-out',
            },
        ],
    },
    {
        path: '**',
        component: NotfoundComponent,
        title: 'Not-found Data',
    },
];
