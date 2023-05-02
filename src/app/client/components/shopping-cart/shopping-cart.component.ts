import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {distinctUntilChanged, elementAt, tap} from "rxjs";
import {ShoppingCartItemsModel} from "../../models/shopping-cart.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessRequestComponent} from "../success-request/success-request.component";
import * as events from "events";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  allProducts!: ShoppingCartItemsModel[];

  shoppingCartItems$ = this.shoppingCartService.shoppingCartItems$.pipe(
    distinctUntilChanged(),
    tap((data: ShoppingCartItemsModel[]) => {
      this.totalPrice = this.getTotalPrice(data)
      this.allProducts = data;
      return data
    })
  );

  totalPrice!: number;

  constructor(public shoppingCartService: ShoppingCartService,
              public dialogRef: MatDialogRef<ShoppingCartComponent>,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  getTotalPrice(cartItems: ShoppingCartItemsModel[]): number {
    let totalPrice = cartItems.map(item => item.totalPrice);
    return totalPrice.reduce((acc, curr) => acc + curr, 0);
  }

  changeQuantityValue(value: any) {
    const currentCart = this.shoppingCartService.shoppingCartItems.getValue();
    const itemIndex = currentCart.findIndex(item => item.name === value.name);
    if(value.quantity != null) {
      if(Number(value.quantity) == 0) {
        this.allProducts.splice(itemIndex, 1);
      } else if(value.quantity) {
        const updatedArray = this.allProducts.map((value) => {
          let product = currentCart.find(el => el.name === value.name)
          if(product) {
            product.totalPrice = product.unitPrice * Number(product.quantity);
          }
          return product;
        });
      }
      this.totalPrice = this.getTotalPrice(this.allProducts);
    }

  }

  finishInvoice() {
    this.dialogRef.close();
    this.shoppingCartService.shoppingCartItems.next([]);
    this.matDialog.open(SuccessRequestComponent, {})
  }

  protected readonly events = events;
}
