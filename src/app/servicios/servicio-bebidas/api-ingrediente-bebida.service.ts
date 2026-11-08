import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiIngredienteBebidaService {

  private url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?i=';

  constructor() { }

  // Buscar bebidas por ingrediente
  buscarPorIngrediente(ingrediente: string): Promise<any> {

    return fetch(this.url + encodeURIComponent(ingrediente))
      .then(response => response.json())
      .then(data => {
        console.log('Bebidas encontradas por ingrediente:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al buscar bebidas por ingrediente:', error);
        throw error;
      });

  }

}

