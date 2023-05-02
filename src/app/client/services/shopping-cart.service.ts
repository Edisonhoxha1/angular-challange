import { Injectable } from '@angular/core';
import {ProductModel} from "../models/total-data.model";
import {BehaviorSubject} from "rxjs";
import {ShoppingCartItemsModel} from "../models/shopping-cart.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCartItems = new BehaviorSubject<ShoppingCartItemsModel[]>([]);
  shoppingCartItems$ = this.shoppingCartItems.asObservable();

  constructor() { }

  addProduct(product: ProductModel) {
    const currentCart = this.shoppingCartItems.getValue();
    const itemIndex = currentCart.findIndex(item => item.name === product.name);
    if (itemIndex >= 0) {
      const updatedCart = [...currentCart];
      const totalQuantity = updatedCart[itemIndex].quantity + 1;
      updatedCart[itemIndex] = {
        ...product,
        quantity: totalQuantity,
        totalPrice: totalQuantity * product.unitPrice
      };
      this.shoppingCartItems.next(updatedCart);
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        totalPrice: product.unitPrice
      };
      this.shoppingCartItems.next([...currentCart, newItem]);
    }
  }
}
