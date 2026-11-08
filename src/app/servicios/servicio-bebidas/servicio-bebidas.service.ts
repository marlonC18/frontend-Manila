import { Injectable } from '@angular/core';
import { ApiCoctelNombreService } from './api-coctel-nombre.service';
import { ApiIngredienteBebidaService } from './api-ingrediente-bebida.service';
import { ApiTipoBebidaService } from './api-tipo-bebida.service';
import { ApiCategoriaBebidaService } from './api-categoria-bebida.service';
import { ApiDetalleBebidaService } from './api-detalle-bebida.service';


@Injectable({
  providedIn: 'root'
})
export class ServicioBebidasService {

  constructor(
    private apiNombre: ApiCoctelNombreService,
    private apiIngrediente: ApiIngredienteBebidaService,
    private apiTipo: ApiTipoBebidaService,
    private apiCategoria: ApiCategoriaBebidaService,
    private apiDetalle: ApiDetalleBebidaService
  ) { }

  // Buscar bebidas por nombre
  buscarPorNombre(nombre: string): Promise<any> {
    return this.apiNombre.buscarPorNombre(nombre);
  }

  // Buscar bebidas por ingrediente
  buscarPorIngrediente(ingrediente: string): Promise<any> {
    return this.apiIngrediente.buscarPorIngrediente(ingrediente);
  }

  // Obtener los tipos de bebidas
  obtenerTipos(): Promise<any> {
    return this.apiTipo.obtenerTipos();
  }

  // Filtrar bebidas por tipo
  filtrarPorTipo(tipo: string): Promise<any> {
    return this.apiTipo.filtrarPorTipo(tipo);
  }

  // Obtener las categorías
  obtenerCategorias(): Promise<any> {
    return this.apiCategoria.obtenerCategorias();
  }

  // Filtrar bebidas por categoría
  filtrarPorCategoria(categoria: string): Promise<any> {
    return this.apiCategoria.filtrarPorCategoria(categoria);
  }

  
  obtenerDetalle(id: string): Promise<any> {
    return this.apiDetalle.obtenerDetalle(id);
  }

}

