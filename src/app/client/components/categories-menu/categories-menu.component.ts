import {Component, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {CategoryModel, ProductModel} from "../../models/total-data.model";

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent implements OnInit {

  @Input() categoriesList!: CategoryModel[];
  @Input() selectedCategory!: number;
  constructor(public categoriesService: CategoriesService,
              private elRef: ElementRef,
              private renderer: Renderer2) { }
  ngOnInit(): void {
    console.log(this.selectedCategory)
  }

  getProductList(productList: ProductModel[]) {
    this.categoriesService.setProducts(productList);
  }

  scrollMovie() {
    const container = this.elRef.nativeElement.querySelector('.menu');
    const inputwidth = this.elRef.nativeElement.querySelector('#slide');
    container.scrollLeft += inputwidth.offsetWidth;

  }
}
