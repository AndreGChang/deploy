import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Sabores } from '../model/sabores';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaborService {

  API: string = "http://localhost:8080/api/sabores";
  http = inject(HttpClient);

  constructor() { }


  listAll():Observable<Sabores[]>{
    return this.http.get<Sabores[]>(this.API);
  }

  deletar(id : number):Observable<Sabores>{
    return this.http.delete<Sabores>(`${this.API}/deletar/${id}`);
  }

  verify(sabores : Sabores): Observable<Sabores>{
    if(sabores.id){
      return this.http.put<Sabores>(`${this.API}/editar/${sabores.id}`,sabores)
      .pipe(
        catchError(error =>{
          console.error("Error", error);
            throw error;
        })
      );
    }else{
      return this.http.post<Sabores>(this.API,sabores);
    }
  }

}
