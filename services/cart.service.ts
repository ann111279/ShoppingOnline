import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartInterface } from '../models/cart_item.interface';   
import { Subscription } from 'rxjs/internal/Subscription';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public _router:Router) { }
 
  cart_items:CartInterface[] = []
  cart_order_items:CartInterface[] = []
  cart_id:number = 0
  total:number = 0
  numOfOrdersPerDay:number = 0

  async openCartForUser(){
    const res = await fetch('http://localhost:1000/cart/opencart',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({user_id:window.sessionStorage.getItem("userId")}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_id = data[0].id
      
    }else{
     console.log(data.msg) 
    }
  }
  
  async getCartForUser(){
    let url:string = 'http://localhost:1000/cart/getcartforuser?' + new URLSearchParams({
            user_id: window.sessionStorage.getItem("userId")!.toString()})

    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    if(!data.err){
      
      if(data && data.length > 0){
        
        this.cart_id = data[0].id

        let url_str:string = 'http://localhost:1000/cart/getCartProductsForUser?' + new URLSearchParams({
              cart_id:this.cart_id.toString()})

        const res1 = await fetch(url_str,{
          method:"get",
          headers: {"content-type":"application/json"},
          credentials:"include"
        })

        const data1 = await res1.json()
        this.cart_items = data1
        this.setTotal()
      }
      else{
        
        this.openCartForUser()
      }
    }else{
      console.log(data.msg) 
    }
  }


  async saveToCart(prod_id:number,qt:number,price:number){
    
    let total_price = qt*price
    const res = await fetch('http://localhost:1000/cart/saveCart',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({prod_id:prod_id,qt:qt,total_price:total_price,
                           cart_id:this.cart_id}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_items = data
      this.setTotal()

    }else{
     console.log(data.msg) 
    }
  }

  async removeProductFromCart(cart_item_id:number){
    const res = await fetch('http://localhost:1000/cart/removeProductFromCart',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({cart_item_id,cart_id:this.cart_id}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_items = data
      this.setTotal()

    }else{
     console.log(data.msg) 
    }
  }

  setTotal(){
    this.total = 0
    if(this.cart_items.length > 0){
      for (const cart_item of this.cart_items) {
        this.total += cart_item.price*cart_item.qt
      }
    }
  }

  async removeAllProductsFromCart(){
    const res = await fetch('http://localhost:1000/cart/removeAllProductsFromCart',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({cart_id:this.cart_id}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_items = data
      this.total = 0

    }else{
     console.log(data.msg) 
    }
  }

  async addQt(cart_item_id:number){
    const res = await fetch('http://localhost:1000/cart/addQt',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({cart_item_id,cart_id:this.cart_id}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_items = data
      this.setTotal()

    }else{
     console.log(data.msg) 
    }
  }

  async substructQt(cart_item_id:number){
    const res = await fetch('http://localhost:1000/cart/substructQt',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({cart_item_id,cart_id:this.cart_id}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.cart_items = data
      this.setTotal()
    }else{
     console.log(data.msg) 
    }
  }

  async getNumOfOrdersPerDay(shipping_date:string){
    let url_str:string = 'http://localhost:1000/cart/getNumOfOrdersPerDay?' + new URLSearchParams({shipping_date})

    const res = await fetch(url_str,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this.numOfOrdersPerDay = data[0].numOfOrdersPerDay
    }else{
     console.log(data.msg) 
    }
  }

  
  async order(city:string,street:string,shipping_date:Date,credit_card:string){
    
    const res = await fetch('http://localhost:1000/cart/order',{
      method:"post",
      headers: {"content-type":"application/json"},
      body:JSON.stringify({city,street,shipping_date,credit_card,cart_id:this.cart_id,total_price:this.total}),
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      this._router.navigateByUrl("/thankyou")
    }else{
     console.log(data.msg) 
    }
  }

  async filterProdName(str:string){
    let url:string = 'http://localhost:1000/cart/filterProdName?' + new URLSearchParams({
      cart_id:this.cart_id.toString(),str})

    const res = await fetch(url,{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    if(!data.err){
      
      this.cart_order_items = data
    }else{
     console.log(data.msg) 
    }
  }


  private subject = new Subject<any>();
  sendClickEvent(str:string) {
    this.subject.next(str);
  }
  getClickEvent(): Observable<any>{ 
    return this.subject.asObservable();
  }  
  
}
