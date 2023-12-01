import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Pedido } from '../model/pedido';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'http://18.188.69.71:8080/api/pedido'
  // API = 'http://localhost:8080/api/pedido'
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  listAllAtivos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.API}/status`);
  }

  edit(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, pedido)
      .pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      );
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  deletar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/deletar/${id}`);
  }

  verify(pedido: Pedido): Observable<Pedido> {
    if (pedido.id) {
      return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, pedido)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
      return this.http.post<Pedido>(this.API, pedido);
    }

  }

  finalizar(pedido: Pedido): Observable<Pedido>{
      return this.http.put<Pedido>(`${this.API}/finalizar/${pedido.id}`,pedido).pipe(
        catchError(error =>{
          console.log(error);
          throw error;
        })
      );

  }


}
