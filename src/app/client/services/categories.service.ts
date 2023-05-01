import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CategoryModel, ProductModel, TotalDataModel} from "../models/total-data.model";

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  categories = new BehaviorSubject<CategoryModel[]>([]);
  categories$ = this.categories.asObservable();

  products = new BehaviorSubject<ProductModel[]>([]);
  products$ = this.products.asObservable();

  profileDetails = new BehaviorSubject<any[]>([]);
  profileDetails$ = this.profileDetails.asObservable();

  constructor(private _http: HttpClient) { }

  setCategories(data: CategoryModel[]) {
    this.categories.next(data)
  }

  setProducts(data: ProductModel[]) {
    this.products.next(data)
  }

  setProfileDetails(data: any) {
    this.profileDetails.next(data)
  }

  getCaseListByPage(): Observable<any> {
    const url = 'https://test.dev.al/test/';
    return this._http.get<TotalDataModel>(url).pipe(
      map((data: TotalDataModel) => {
        this.setCategories(data.categories);
        this.setProfileDetails({nuis: data.nuis, businessName: data.businessName, logo: data.logo});
      }),
      catchError((error) => throwError(error)),
    );
  }
}
