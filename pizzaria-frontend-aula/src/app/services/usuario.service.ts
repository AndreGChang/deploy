import { Usuario } from 'src/app/model/usuario';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = 'http://localhost:8080/api/usuario';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  deletar(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.API}/deletar/${id}`);
  }

  verify(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
      console.log("a")
      console.log(usuario)
    return this.http.put<Usuario>(`${this.API}/editar/${usuario.id}`, usuario)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
      console.log("b")
      console.log(usuario)
      return this.http.post<Usuario>(this.API + "/cadastro", usuario);
    }

  }
}
