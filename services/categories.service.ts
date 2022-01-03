import { Injectable } from '@angular/core';
import { CategoryInterface } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  categories:CategoryInterface[] = []

  async getCategories(){
    const res = await fetch('http://localhost:1000/categories',{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    this.categories = data
    
  }
}
