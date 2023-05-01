import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {distinctUntilChanged, tap} from "rxjs";
import {CategoryModel, ProductModel} from "../../models/total-data.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";
import {ShoppingCartItemsModel} from "../../models/shopping-cart.model";
import {ShoppingCartComponent} from "../shopping-cart/shopping-cart.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  elementSelectedFirstly: any;
  categoriesList$ = this.categoriesService.categories$.pipe(
    distinctUntilChanged(),
    tap((data: CategoryModel[]) => {
      // set default menu item active on first time when page is open
      if (data && data[0]) {
        this.categoriesService.setProducts(data[0].products);
        this.elementSelectedFirstly = data[0].id;
      }
      return data;
    })
  );

  productsList$ = this.categoriesService.products$.pipe(
    distinctUntilChanged(),
    tap((data: ProductModel[]) => data)
  );

  shoppingCartItems$ = this.shoppingCartService.shoppingCartItems$.pipe(
    distinctUntilChanged(),
    tap((data: ShoppingCartItemsModel[]) => data)
  );
  constructor(public categoriesService: CategoriesService,
              public shoppingCartService: ShoppingCartService,
              public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriesService.getCaseListByPage().subscribe();
  }

  openCart() {
    const dialogRef = this.matDialog.open(ShoppingCartComponent, {
      panelClass: 'shopping-cart-dialog',
      maxWidth: '100vw'
    }).afterClosed()
  }

}
