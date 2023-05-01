export interface TotalDataModel {
  nuis: string;
  businessName: string
  logo: string;
  categories: CategoryModel[]
}

export interface CategoryModel {
  id: number;
  name: string;
  products: ProductModel[]
}


export interface ProductModel {
  name: string;
  unitPrice: number;
}



