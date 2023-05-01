import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppHeaderComponent} from "./components/app-header/app-header.component";
import {AppFooterComponent} from "./components/app-footer/app-footer.component";
import {RouterOutlet} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterOutlet
  ],
  exports: [
    AppHeaderComponent,
    AppFooterComponent
  ],
    declarations: [
        AppHeaderComponent,
        AppFooterComponent,
    ]
})
export class SharedModule { }
