import { Injectable } from '@angular/core';
import { ApiNombreService } from './api-nombre.service';
import { ApiIngredienteService } from './api-ingrediente.service';
import { ApiCategoriaService } from './api-categoria.service';
import { ApiDetalleService } from './api-detalle.service';


@Injectable({
  providedIn: 'root'
})
export class ServicioComidasService {

   constructor(
    private apiNombre: ApiNombreService,
    private apiIngrediente: ApiIngredienteService,
    private apiCategoria: ApiCategoriaService,
    private apiDetalle: ApiDetalleService
  ) { }

  // Buscar comidas por nombre
  buscarPorNombre(nombre: string): Promise<any> {
    return this.apiNombre.buscarPorNombre(nombre);
  }

  // Obtener la lista de ingredientes
  obtenerIngredientes(): Promise<any> {
    return this.apiIngrediente.obtenerIngredientes();
  }

  // Buscar comidas por ingrediente
  buscarPorIngrediente(ingrediente: string): Promise<any> {
    return this.apiIngrediente.buscarPorIngrediente(ingrediente);
  }

  // Obtener las categorías de comidas
  obtenerCategorias(): Promise<any> {
    return this.apiCategoria.obtenerCategorias();
  }

  // Filtrar comidas por categoría
  filtrarPorCategoria(categoria: string): Promise<any> {
    return this.apiCategoria.filtrarPorCategoria(categoria);
  }

  
obtenerDetalle(id: string): Promise<any> {
  return this.apiDetalle.obtenerDetalle(id);
}

}

