import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../models/total-data.model";
import {ShoppingCartService} from "../../services/shopping-cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem!: ProductModel;
  @Input() productItemIndex!: number;

  firstCharacter: any;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.firstCharacter = this.productItem?.name.charAt(0);
  }

  addToCart() {
    this.shoppingCartService.addProduct(this.productItem);
  }

}
