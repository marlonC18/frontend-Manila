import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiDetalleBebidaService {

  private url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  constructor() { }

  async obtenerDetalle(id: string): Promise<any> {

    const respuesta = await fetch(this.url + encodeURIComponent(id));

    if (!respuesta.ok) {
      throw new Error('Error al consultar los detalles de la bebida');
    }

    const datos = await respuesta.json();

    return datos.drinks ? datos.drinks[0] : null;
  }
}
