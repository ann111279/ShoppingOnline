import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { OrderMainComponent } from './components/order-main/order-main.component';
import { SearchOrderComponent } from './components/search-order/search-order.component';
import { CartOrderComponent } from './components/cart-order/cart-order.component';
import { CartItemOrderComponent } from './components/cart-item-order/cart-item-order.component';
import { ShippingDetailsComponent } from './components/shipping-details/shipping-details.component';
import { SuccessThankYouComponent } from './components/success-thank-you/success-thank-you.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainComponent,
    AboutComponent,
    DashboardComponent,
    RegisterComponent,
    Register2Component,
    ProductsListComponent,
    ProductsItemComponent,
    SearchComponent,
    CartComponent,
    CartItemComponent,
    ProductsMainComponent,
    CategoriesComponent,
    CategoryItemComponent,
    AddProductComponent,
    UpdateProductComponent,
    OrderMainComponent,
    SearchOrderComponent,
    CartOrderComponent,
    CartItemOrderComponent,
    ShippingDetailsComponent,
    SuccessThankYouComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
