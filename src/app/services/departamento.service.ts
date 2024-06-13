import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from '../departamentos/departamentos';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  apiURL = 'http://localhost:3000/departamentos';

  constructor(private http: HttpClient) {}

  getDepar(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiURL);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    if (!departamento.name) {
      return throwError('El departamento es requerido');
    }
    const { _id, ...newUser } = departamento;
    return this.http.post<Departamento>(this.apiURL, newUser).pipe(
      catchError((error: any) => {
        return throwError(`Error al crear el departamento: ${error}`);
      })
    );
  }

  deleteDepartamento(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
