
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPedido } from '../entidades/item-pedido';
import { ServicioPedidoService } from '../servicios/servicio-pedido.service';
import { ServicioComidasService } from '../servicios/servicio-comidas/servicio-comidas.service';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comidas.component.html',
  styleUrl: './comidas.component.css'
})
export class ComidasComponent implements OnInit {

  private pedidoService = inject(ServicioPedidoService);
  private comidasService = inject(ServicioComidasService);

  comidas: any[] = [];
  categorias: any[] = [];

  nombreBusqueda: string = '';
  ingredienteBusqueda: string = '';

  cargando: boolean = false;
  mensajeError: string = '';
  servicioComidas: any;

  ngOnInit(): void {
    this.cargarTodasLasComidas();
  }

  // Cargar todas las categorías y sus comidas
  async cargarTodasLasComidas(): Promise<void> {

    this.cargando = true;
    this.mensajeError = '';

    try {

      const respuestaCategorias =
        await this.comidasService.obtenerCategorias();

      this.categorias = respuestaCategorias.meals || [];

      const consultas = this.categorias.map((categoria: any) =>
        this.comidasService.filtrarPorCategoria(categoria.strCategory)
      );

      const resultados = await Promise.all(consultas);

      const todasLasComidas = resultados.flatMap(
        (resultado: any) => resultado.meals || []
      );

      // Evitar comidas repetidas
      const comidasUnicas = Array.from(
        new Map(
          todasLasComidas.map((comida: any) => [comida.idMeal, comida])
        ).values()
      );

      this.prepararComidas(comidasUnicas);

    } catch (error) {

      console.error('Error al cargar comidas:', error);
      this.mensajeError = 'No se pudieron cargar las comidas.';

    } finally {

      this.cargando = false;

    }
  }

  // Preparar las comidas recibidas de la API
  prepararComidas(lista: any[]): void {

    this.comidas = lista.map((comida: any) => ({
      ...comida,
      precio: (Math.floor(Math.random() * 30) + 25) * 1000,
      cantidadSeleccionada: 1
    }));

  }

  // Buscar por nombre o ingrediente
  async buscarComidas(): Promise<void> {

    if (this.nombreBusqueda.trim() !== '') {

      try {

        this.cargando = true;
        this.mensajeError = '';

        const respuesta = await this.comidasService.buscarPorNombre(
          this.nombreBusqueda.trim()
        );

        this.prepararComidas(respuesta.meals || []);

      } catch (error) {

        console.error('Error al buscar por nombre:', error);
        this.mensajeError = 'Error al buscar comidas.';

      } finally {

        this.cargando = false;

      }

    } else if (this.ingredienteBusqueda.trim() !== '') {

      try {

        this.cargando = true;
        this.mensajeError = '';

        const respuesta = await this.comidasService.buscarPorIngrediente(
          this.ingredienteBusqueda.trim()
        );

        this.prepararComidas(respuesta.meals || []);

      } catch (error) {

        console.error('Error al buscar por ingrediente:', error);
        this.mensajeError = 'Error al buscar comidas.';

      } finally {

        this.cargando = false;

      }

    } else {

      await this.cargarTodasLasComidas();

    }
  }

  // Filtrar por categoría
  async filtrarPorCategoria(categoria: string): Promise<void> {

    if (categoria === 'Todas') {
      await this.cargarTodasLasComidas();
      return;
    }

    try {

      this.cargando = true;
      this.mensajeError = '';

      const respuesta = await this.comidasService.filtrarPorCategoria(categoria);

      this.prepararComidas(respuesta.meals || []);

    } catch (error) {

      console.error('Error al filtrar por categoría:', error);
      this.mensajeError = 'No se pudieron cargar las comidas de esta categoría.';

    } finally {

      this.cargando = false;

    }
  }

  // Modificar cantidad local
  modificarCantidadLocal(comida: any, cambio: number): void {

    if (!comida.cantidadSeleccionada) {
      comida.cantidadSeleccionada = 1;
    }

    const nuevaCantidad = comida.cantidadSeleccionada + cambio;

    if (nuevaCantidad >= 1) {
      comida.cantidadSeleccionada = nuevaCantidad;
    }

  }

  
  async mostrarIngredientes(comida: any) {

    // Si ya tenemos los ingredientes, los ocultamos o mostramos
    if (comida.ingredientesCargados) {
      comida.mostrarIngredientes = !comida.mostrarIngredientes;
      return;
    }

    comida.cargandoIngredientes = true;
    comida.errorIngredientes = '';

    try {
      // Consultamos los detalles de la comida por su ID
      const detalle = await this.comidasService.obtenerDetalle(comida.idMeal);

      const ingredientes: string[] = [];

      if (detalle) {
        for (let i = 1; i <= 20; i++) {

          const ingrediente = detalle['strIngredient' + i];
          const medida = detalle['strMeasure' + i];

          if (ingrediente && ingrediente.trim() !== '') {
            ingredientes.push(
              ingrediente + (medida?.trim() ? ' - ' + medida.trim() : '')
            );
          }
        }
      }

      comida.ingredientes = ingredientes;
      comida.ingredientesCargados = true;
      comida.mostrarIngredientes = true;

    } catch (error) {
      console.error('Error al obtener ingredientes:', error);
      comida.errorIngredientes = 'No se pudieron cargar los ingredientes.';
    } finally {
      comida.cargandoIngredientes = false;
    }
  }


  // Agregar comida al pedido
  agregarAlPedido(comida: any): void {

    const nuevoItem = new ItemPedido();

    nuevoItem.id = 'comida-' + (comida.idMeal || comida.id);
    nuevoItem.nombre = comida.strMeal || comida.nombre;
    nuevoItem.precio = comida.precio ?? 25;
    nuevoItem.imagen = comida.strMealThumb || comida.imagen;
    nuevoItem.cantidad = comida.cantidadSeleccionada || 1;
    nuevoItem.tipo = 'comida';

    this.pedidoService.agregar(nuevoItem);

    comida.cantidadSeleccionada = 1;

  }

}
