import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../../client/services/categories.service";
import {distinctUntilChanged, tap} from "rxjs";

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  logoUrl: any;

  profileDetails$ = this.categoriesService.profileDetails$.pipe(
    distinctUntilChanged(),
    tap(data => {
      this.profileDetails = data
      this.logoUrl = this.profileDetails.logo
      return data
    })
  );

  profileDetails: any;

  constructor(public categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.profileDetails$.subscribe()
  }

  darkMode() {
    document.body.classList.toggle('dark-theme');
  }

}
