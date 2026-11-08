import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCoctelNombreService {

   private url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  constructor() { }


  buscarPorNombre(nombre: string): Promise<any> {

    return fetch(this.url + encodeURIComponent(nombre))
      .then(response => response.json())
      .then(data => {
        console.log('Cócteles encontradas:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al buscar Cócteles por nombre:', error);
        throw error;
      });

}
}
