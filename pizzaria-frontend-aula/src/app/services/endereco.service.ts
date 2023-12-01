import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Endereco } from '../model/endereco';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  API = 'http://18.188.69.71:8080/api/endereco'
  // API = 'http://localhost:8080/api/endereco'
  http = inject(HttpClient);

  constructor() { }

  getCepData(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  list(): Observable<Endereco[]> {
    return this.http.get<Endereco[]>(this.API);
  }

  edit(endereco: Endereco): Observable<Endereco> {
    return this.http.put<Endereco>(`${this.API}/editar/${endereco.id}`, endereco)
      .pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      );
  }

  save(endereco: Endereco): Observable<Endereco> {
    return this.http.post<Endereco>(this.API, endereco);
  }

  deletar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/deletar/${id}`);
  }

  verify(endereco: Endereco): Observable<Endereco> {
    if (endereco.id) {
      return this.http.put<Endereco>(`${this.API}/editar/${endereco.id}`, endereco)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
      return this.http.post<Endereco>(this.API, endereco);
    }
  }
}
