import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  users:UserInterface[] = []
  user_name:string = ""
  phone:string = ""
  username:string =""
  user_city:string = ""
  user_street:string = ""
  isUserLoggedIn:boolean = false
  numOfProducts:number = 0
  numOfOrders:number = 0
  msgToUser:string = ""
  isAdmin:boolean = false
  isBtnContinue:boolean = false
  isBtnStart:boolean = false
  
  async getUserDetails(){
    const res = await fetch('http://localhost:1000/dashboard/userdetails',{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()

    this.users = data
    this.user_name = data[0].first_name + " " + data[0].last_name
    this.phone = data[0].phone
    this.username = data[0].username
    this.user_city = data[0].city
    this.user_street = data[0].street
    this.isUserLoggedIn = true
    
    if(window.sessionStorage.getItem("role") == "1"){
      this.isAdmin = true
    }else{
      this.isAdmin = false
    }
  }

  async getNumOfProducts(){
    const res = await fetch('http://localhost:1000/dashboard/allproducts',{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    this.numOfProducts = data[0].all_products
    
  }

  async getNumOfOrders(){
    const res = await fetch('http://localhost:1000/dashboard/allorders',{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    this.numOfOrders = data[0].all_orders
    
  }

  
  async getOpenCart(){
    const res = await fetch('http://localhost:1000/dashboard/opencart',{
      method:"get",
      headers: {"content-type":"application/json"},
      credentials:"include"
    })

    const data = await res.json()
    if(data && data[0]){
      let datePipe = new DatePipe("en-US");
    
      this.msgToUser = "You have open cart from " +  datePipe.transform(data[0].creation_date, 'dd/MM/yyyy')
      this.isBtnContinue = true
      this.isBtnStart = false
    }
    else{
      const res1 = await fetch('http://localhost:1000/dashboard/lastpurchase',{
        method:"get",
        headers: {"content-type":"application/json"},
        credentials:"include"
      })

      const data1 = await res1.json()
      if(data1 && data1[0]){
        let datePipe = new DatePipe("en-US");
        this.msgToUser = "Your last purchase was on " +  datePipe.transform(data1[0].order_date, 'dd/MM/yyyy')
        this.isBtnContinue = false
        this.isBtnStart = true
      }
      else{
        this.msgToUser = "Welcome " + this.user_name
        this.isBtnContinue = false
        this.isBtnStart = true
      }
    }
  }

  
}
