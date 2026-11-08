import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriaService {

  private urlLista = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  private urlBusqueda = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  constructor() { }

  // Obtener las categorías de comidas
  obtenerCategorias(): Promise<any> {
    return fetch(this.urlLista)
      .then(response => response.json())
      .then(data => {
        console.log('Categorías de comidas:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
        throw error;
      });
  }

  // Buscar comidas por categoría
  filtrarPorCategoria(categoria: string): Promise<any> {
    return fetch(this.urlBusqueda + encodeURIComponent(categoria))
      .then(response => response.json())
      .then(data => {
        console.log('Comidas por categoría:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al filtrar comidas:', error);
        throw error;
      });
  }
}

