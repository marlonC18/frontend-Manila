import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiIngredienteService {

  private urlLista = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  private urlBusqueda = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  constructor() { }

  // Obtener la lista de ingredientes disponibles
  obtenerIngredientes(): Promise<any> {

    return fetch(this.urlLista)
      .then(response => response.json())
      .then(data => {
        console.log('Lista de ingredientes:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al obtener ingredientes:', error);
        throw error;
      });

  }

  // Buscar comidas por ingrediente
  buscarPorIngrediente(ingrediente: string): Promise<any> {

    return fetch(this.urlBusqueda + encodeURIComponent(ingrediente))
      .then(response => response.json())
      .then(data => {
        console.log('Comidas por ingrediente:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al buscar comidas por ingrediente:', error);
        throw error;
      });

  }

}

