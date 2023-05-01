import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {distinctUntilChanged, tap} from "rxjs";
import {ShoppingCartItemsModel} from "../../models/shopping-cart.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SuccessRequestComponent} from "../success-request/success-request.component";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartItems$ = this.shoppingCartService.shoppingCartItems$.pipe(
    distinctUntilChanged(),
    tap((data: ShoppingCartItemsModel[]) => {
      this.totalPrice = this.getTotalPrice(data)
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
    return cartItems.reduce((total, item) => total + (item.totalPrice * item.quantity), 0);
  }

  finishInvoice() {
    this.dialogRef.close()
    this.matDialog.open(SuccessRequestComponent, {})

  }

}
