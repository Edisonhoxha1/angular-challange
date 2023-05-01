import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesMenuComponent} from "./components/categories-menu/categories-menu.component";
import {CategoryProductsComponent} from "./components/category-products/category-products.component";
import {ProductItemComponent} from "./components/product-item/product-item.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {SuccessRequestComponent} from "./components/success-request/success-request.component";
import {ClientRoutingModule} from "./client.routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ClientRoutingModule,
    FormsModule,
    MatDialogModule,
    SharedModule,
  ],
    declarations: [
      CategoriesMenuComponent,
      CategoryProductsComponent,
      ProductItemComponent,
      ShoppingCartComponent,
      SuccessRequestComponent
    ]
})
export class ClientModule { }
