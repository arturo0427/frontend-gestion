import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../users/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURL);
  }

  createUsers(user: User): Observable<User> {
    if (!user.name) {
      return throwError('El nombre es requerido');
    }
    const { _id, ...newUser } = user;
    return this.http.post<User>(this.apiURL, newUser).pipe(
      catchError((error: any) => {
        return throwError(`Error al crear el usuario: ${error}`);
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
