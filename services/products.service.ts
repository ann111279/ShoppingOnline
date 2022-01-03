import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductInterface } from '../models/product.interface';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:ProductInterface[] = []

  constructor(public _router:Router,public _users:UsersService) { }

  async getProducts(){
    let url:string = ""
    if(this._users.isAdmin){
      url = 'http://localhost:1000/admin/getproducts'
    }
    else{
      url = 'http://localhost:1000/products/getproducts'
    }

    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    this.products = data
  }

  async getProductById(prod_id:number){
    let url:string = ""
    if(this._users.isAdmin){
      url = 'http://localhost:1000/admin/getproductbyid?' + new URLSearchParams({prod_id: prod_id.toString()})
    }
    else{
      url = 'http://localhost:1000/products/getproductbyid?' + new URLSearchParams({prod_id: prod_id.toString()})
    }


    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    this.products = data
    
  }

  async getProductsByCategory(cat_id:number){
    let url:string = ""
    if(cat_id == 6){
            
        if(this._users.isAdmin){
          url = 'http://localhost:1000/admin/getproducts'
        }
        else{
          url = 'http://localhost:1000/products/getproducts'
        }
    }
    else{
      
        if(this._users.isAdmin){
          url = 'http://localhost:1000/admin/getproductbycategory?' + new URLSearchParams({
            cat_id: cat_id.toString()})
        }
        else{
          url = 'http://localhost:1000/products/getproductbycategory?' + new URLSearchParams({
            cat_id: cat_id.toString()})
        }
    }
    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    this.products = data
    
  }

  async getProductByName(prod_name:string){
    let url:string = ""
    if(prod_name == ""){
      if(this._users.isAdmin){
        url = 'http://localhost:1000/admin/getproducts'
      }
      else{
        url = 'http://localhost:1000/products/getproducts'
      }
    }
    else{
      if(this._users.isAdmin){
        url = "http://localhost:1000/admin/getproductbyname?" + new URLSearchParams({prod_name: prod_name})
      }
      else{
        url = "http://localhost:1000/products/getproductbyname?" + new URLSearchParams({prod_name: prod_name})
      } 
    }
    console.log(url)
    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    this.products = data
    
  }

  async addProduct(category:number,prod_name:string,price:number,img_url:string){
    
    const res = await fetch('http://localhost:1000/admin/add',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({cat_id:category,prod_name,price,img_url}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this._router.navigateByUrl("/products")
    }else{
      console.log(data.msg) 
    }
  }

  
  async updateProduct(prod_id:number,category:number,prod_name:string,price:number,img_url:string){
    
    const res = await fetch('http://localhost:1000/admin/update',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({prod_id,cat_id:category,prod_name,price,img_url}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this._router.navigateByUrl("/products")
    }else{
      console.log(data.msg) 
    }
  }
}
