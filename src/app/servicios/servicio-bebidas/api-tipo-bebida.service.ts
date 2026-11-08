
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiTipoBebidaService {

  private urlLista = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
  private urlBusqueda = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=';

  constructor() { }

  // Obtener los tipos de bebidas
  obtenerTipos(): Promise<any> {
    return fetch(this.urlLista)
      .then(response => response.json())
      .then(data => {
        console.log('Tipos de bebidas:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al obtener los tipos:', error);
        throw error;
      });
  }

  // Filtrar bebidas por tipo
  filtrarPorTipo(tipo: string): Promise<any> {
    return fetch(this.urlBusqueda + encodeURIComponent(tipo))
      .then(response => response.json())
      .then(data => {
        console.log('Bebidas según el tipo:', data);
        return data;
      })
      .catch(error => {
        console.error('Error al filtrar bebidas por tipo:', error);
        throw error;
      });
  }
}
