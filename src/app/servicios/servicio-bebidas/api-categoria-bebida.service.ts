import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriaBebidaService {

  private url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  private urlBusqueda = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  constructor() { }

  // Obtener todas las categorías de bebidas
  obtenerCategorias(): Promise<any> {
    return fetch(this.url)
      .then(response => response.json())
      .then(data => {
        console.log('Categorías de bebidas:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al obtener las categorías:', error);
        throw error;
      });
  }

  // Buscar bebidas según la categoría seleccionada
  filtrarPorCategoria(categoria: string): Promise<any> {
    return fetch(this.urlBusqueda + encodeURIComponent(categoria))
      .then(response => response.json())
      .then(data => {
        console.log('Bebidas por categoría:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al filtrar por categoría:', error);
        throw error;
      });
  }
}


