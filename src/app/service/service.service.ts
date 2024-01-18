import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { UserDto } from '../dto/userDto';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = "http://localhost:3000/user/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  userDto = new UserDto;
  userData?: UserDto[];

  public updateData = new Subject<UserDto>();
  public disableSubmit = new Subject<boolean>();
  public disableUpdate = new Subject<boolean>();
  private getUpdateUserTable = new Subject<any>();
  constructor(private httpClient: HttpClient) {

  }

  updateForm(data: UserDto, disableSubmit: boolean, disableUpdate: boolean) {
    this.updateData.next(data);
    this.disableSubmit.next(disableSubmit);
    this.disableUpdate.next(disableUpdate);
  }

  updateUserTable() {
    this.getUpdateUserTable.next(1);
  }

  setUpdateUserTable(): Observable<UserDto> {
    return this.getUpdateUserTable.asObservable();
  }

  getUser() {
    return this.httpClient.get<any[]>(`${this.baseUrl}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  saveUser(data: any) {
    console.log(data)
    const SaveUser = this.httpClient.post<any[]>(`${this.baseUrl}create`, data, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
    return (SaveUser)
  }

  Update(id: any, status: any): Observable<UserDto> {
    console.log(status)
    const Update = this.httpClient.put<UserDto>(`${this.baseUrl}${id}/update`, status)
      .pipe(
        catchError(this.errorHandler)
      )
    return (Update)
  }

  deleteUser(data: any) {
    console.log(data)
    const DeleteUser = this.httpClient.delete<any>(`${this.baseUrl}${data}/delete`)
      .pipe(
        catchError(this.errorHandler)
      )
    console.log(DeleteUser)
    return (DeleteUser)
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage)
  }
}
