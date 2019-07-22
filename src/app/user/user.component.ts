import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService,DataService]
})
export class UserComponent implements OnInit {
user:{name:string};
isLoggedIn=false;
data:string;
  constructor(private userservice:UserService,private dataService:DataService) { }

  ngOnInit() {
    this.user=this.userservice.user;
this.dataService.getDetails().then((data:string)=>{this.data=data})  //data:string type is stringn to avoid compilation errors
  }

}
