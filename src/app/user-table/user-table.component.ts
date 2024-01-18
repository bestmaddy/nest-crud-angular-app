import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { UserDto } from '../dto/userDto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class UserTableComponent implements OnInit {
  userData?: UserDto[];
  setUpdateUserTable: Subscription | undefined;
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(private service: ServiceService) {
    this.setUpdateUserTable = this.service.setUpdateUserTable().subscribe((data) => {
      if (data) {
        this.getUser();
      }
    })
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.service.getUser().subscribe(data => {
      this.userData = data;
      console.log('user data ', data);
    })
  }

  deleteUser(user: UserDto) {
    console.log(user);
    this.service.deleteUser(user.idUser).subscribe((data: any) => {
      console.log("data saved", data);
      this.getUser();
    })
  }

  update(user: UserDto) {
    console.log("update", user);
    this.service.updateForm(user, false, true);
  }

  public exportToPdf(): void {
    let DATA: any = document.getElementById('uData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('u_data.pdf');
    });
  }

}
