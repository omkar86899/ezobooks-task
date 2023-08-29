import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllProductResponse } from '../common/productTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<GetAllProductResponse>(`https://db.ezobooks.in/kappa/image/task`);
  }
}
