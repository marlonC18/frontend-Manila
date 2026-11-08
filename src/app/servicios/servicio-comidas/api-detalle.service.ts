import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiDetalleService {

  private url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  constructor() { }

  async obtenerDetalle(id: string): Promise<any> {
    const respuesta = await fetch(this.url + encodeURIComponent(id));
    const datos = await respuesta.json();

    return datos.meals ? datos.meals[0] : null;
  }
}
