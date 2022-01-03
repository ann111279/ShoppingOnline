import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';
import { Page404Component } from './components/page404/page404.component';
import { ProductsMainComponent } from './components/products-main/products-main.component';
import { MainComponent } from './components/main/main.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { OrderMainComponent } from './components/order-main/order-main.component';
import { SuccessThankYouComponent } from './components/success-thank-you/success-thank-you.component';
const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:MainComponent},
  {path:"register",component:RegisterComponent},
  {path:"register2",component:Register2Component},
  {path:"products",component:ProductsMainComponent},
  {path:"addproduct",component:AddProductComponent},
  {path:"updateproduct",component:UpdateProductComponent},
  {path:"order",component:OrderMainComponent},
  {path:"thankyou",component:SuccessThankYouComponent},
  {path:"**", component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
