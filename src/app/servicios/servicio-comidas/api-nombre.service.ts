import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiNombreService {

  private url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  constructor() { }

  buscarPorNombre(nombre: string): Promise<any> {

    return fetch(this.url +  encodeURIComponent(nombre))
      .then(response => response.json())
      .then(data => {
        console.log('Comidas encontradas:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al buscar comida por nombre:', error);
        throw error;
      });

  }

}

