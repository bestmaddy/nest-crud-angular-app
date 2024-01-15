import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { UserDto } from '../dto/userDto';
import { NgForm } from '@angular/forms';
import { UserTableComponent } from '../user-table/user-table.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userDto = new UserDto;
  userDetails!: NgForm;
  disableSubmit: boolean = true;
  disableUpdate: boolean = false;
  userData?: any[];

  constructor(public service: ServiceService, public table:UserTableComponent) {
    this.service.updateData.subscribe((data: UserDto) => {
      this.userDto = data;
    })
    this.service.disableSubmit.subscribe((data: boolean) => {
      this.disableSubmit = data
    })
    this.service.disableUpdate.subscribe((data: boolean) => {
      this.disableUpdate = data
    })
  }

  ngOnInit(): void {
  }

  saveUser(userData: UserDto) {
    console.log(JSON.stringify(userData));
    this.service.saveUser(userData).subscribe((data: any) => {
      console.log("data saved ", data);
      this.table.getUser()
    })
    this.clearForm();
  }

  clearForm() {
    this.userDto.Email = '';
    this.userDto.MobileNumber = '';
    this.userDto.Password = '';
    this.userDto.Address = '';
    this.userDto.UserName = '';
    this.disableUpdate = false;
    this.disableSubmit = true;

  }
  updateData(userData: UserDto) {
    console.log(JSON.stringify(userData));
    this.service.Update(userData.idUser, userData).subscribe((data: any) => {
      console.log("data saved ", data);
    })
  }

  getUser() {
    this.service.getUser().subscribe(data => {
      this.userData = data;
      console.log('user data ', data);
    })
  }
}
