import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPedido } from '../entidades/item-pedido';
import { ServicioPedidoService } from '../servicios/servicio-pedido.service';
import { ServicioBebidasService } from '../servicios/servicio-bebidas/servicio-bebidas.service';

@Component({
  selector: 'app-bebidas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css'
})
export class BebidasComponent implements OnInit {

  private pedidoService = inject(ServicioPedidoService);
  private bebidasService = inject(ServicioBebidasService);

  bebidas: any[] = [];
  categorias: any[] = [];
  tipos: any[] = [];

  nombreBusqueda: string = '';
  ingredienteBusqueda: string = '';
  tipoSeleccionado: string = '';
  categoriaSeleccionada: string = '';

  cargando: boolean = false;
  mensajeError: string = '';

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }

  // Cargar categorías, tipos y bebidas
  async cargarDatosIniciales(): Promise<void> {

    this.cargando = true;
    this.mensajeError = '';

    try {

      const [respuestaCategorias, respuestaTipos] = await Promise.all([
        this.bebidasService.obtenerCategorias(),
        this.bebidasService.obtenerTipos()
      ]);

      this.categorias = respuestaCategorias.drinks || [];
      this.tipos = respuestaTipos.drinks || [];

      await this.cargarTodasLasBebidas();

    } catch (error) {

      console.error('Error al cargar datos de bebidas:', error);
      this.mensajeError = 'No se pudieron cargar las bebidas.';

    } finally {

      this.cargando = false;

    }
  }

  // Cargar bebidas de todas las categorías
  async cargarTodasLasBebidas(): Promise<void> {

    const consultas = this.categorias.map((categoria: any) =>
      this.bebidasService.filtrarPorCategoria(categoria.strCategory)
    );

    const resultados = await Promise.all(consultas);

    const todasLasBebidas = resultados.flatMap(
      (resultado: any) => resultado.drinks || []
    );

    // Evitar bebidas repetidas
    const bebidasUnicas = Array.from(
      new Map(
        todasLasBebidas.map((bebida: any) => [bebida.idDrink, bebida])
      ).values()
    );

    this.prepararBebidas(bebidasUnicas);
  }

  // Preparar las bebidas recibidas
  prepararBebidas(lista: any[]): void {

    this.bebidas = lista.map((bebida: any) => ({
      ...bebida,
      precio: (Math.floor(Math.random() * 15) + 15) * 1000,
      cantidadSeleccionada: 1
    }));

  }

  // Buscar por nombre o ingrediente
  async buscarBebidas(): Promise<void> {

    try {

      this.cargando = true;
      this.mensajeError = '';

      if (this.nombreBusqueda.trim() !== '') {

        const respuesta = await this.bebidasService.buscarPorNombre(
          this.nombreBusqueda.trim()
        );

        this.prepararBebidas(respuesta.drinks || []);

      } else if (this.ingredienteBusqueda.trim() !== '') {

        const respuesta = await this.bebidasService.buscarPorIngrediente(
          this.ingredienteBusqueda.trim()
        );

        this.prepararBebidas(respuesta.drinks || []);

      } else {

        await this.aplicarFiltros();

      }

    } catch (error) {

      console.error('Error al buscar bebidas:', error);
      this.mensajeError = 'No se pudieron buscar las bebidas.';

    } finally {

      this.cargando = false;

    }
  }

  // Filtrar por tipo
  async filtrarPorTipo(tipo: string): Promise<void> {

    this.tipoSeleccionado = tipo;
    await this.aplicarFiltros();

  }

  // Filtrar por categoría
  async filtrarPorCategoria(categoria: string): Promise<void> {

    this.categoriaSeleccionada = categoria;
    await this.aplicarFiltros();

  }

  // Aplicar los filtros seleccionados
  async aplicarFiltros(): Promise<void> {

    try {

      this.cargando = true;
      this.mensajeError = '';

      let resultados: any[] = [];

      if (this.categoriaSeleccionada && this.tipoSeleccionado) {

        const [porCategoria, porTipo] = await Promise.all([
          this.bebidasService.filtrarPorCategoria(this.categoriaSeleccionada),
          this.bebidasService.filtrarPorTipo(this.tipoSeleccionado)
        ]);

        const idsPorTipo = new Set(
          (porTipo.drinks || []).map((bebida: any) => bebida.idDrink)
        );

        resultados = (porCategoria.drinks || []).filter(
          (bebida: any) => idsPorTipo.has(bebida.idDrink)
        );

      } else if (this.categoriaSeleccionada) {

        const respuesta = await this.bebidasService.filtrarPorCategoria(
          this.categoriaSeleccionada
        );

        resultados = respuesta.drinks || [];

      } else if (this.tipoSeleccionado) {

        const respuesta = await this.bebidasService.filtrarPorTipo(
          this.tipoSeleccionado
        );

        resultados = respuesta.drinks || [];

      } else {

        await this.cargarTodasLasBebidas();
        return;

      }

      this.prepararBebidas(resultados);

    } catch (error) {

      console.error('Error al aplicar filtros:', error);
      this.mensajeError = 'No se pudieron aplicar los filtros.';

    } finally {

      this.cargando = false;

    }
  }

  // Modificar cantidad local
  modificarCantidadLocal(bebida: any, cambio: number): void {

    if (!bebida.cantidadSeleccionada) {
      bebida.cantidadSeleccionada = 1;
    }

    const nuevaCantidad = bebida.cantidadSeleccionada + cambio;

    if (nuevaCantidad >= 1) {
      bebida.cantidadSeleccionada = nuevaCantidad;
    }

  }

  
  async mostrarIngredientes(bebida: any) {

    // Si ya consultamos los ingredientes, solo mostramos u ocultamos
    if (bebida.ingredientesCargados) {
      bebida.mostrarIngredientes = !bebida.mostrarIngredientes;
      return;
    }

    bebida.cargandoIngredientes = true;
    bebida.errorIngredientes = '';

    try {

      // Consultamos los detalles de la bebida
      const detalle = await this.bebidasService.obtenerDetalle(bebida.idDrink);

      const ingredientes: string[] = [];

      if (detalle) {

        // TheCocktailDB tiene hasta 15 ingredientes
        for (let i = 1; i <= 15; i++) {

          const ingrediente = detalle['strIngredient' + i];
          const medida = detalle['strMeasure' + i];

          if (ingrediente && ingrediente.trim() !== '') {

            ingredientes.push(
              ingrediente + (medida?.trim() ? ' - ' + medida.trim() : '')
            );

          }
        }
      }

      bebida.ingredientes = ingredientes;
      bebida.ingredientesCargados = true;
      bebida.mostrarIngredientes = true;

    } catch (error) {

      console.error('Error al obtener ingredientes de la bebida:', error);
      bebida.errorIngredientes = 'No se pudieron cargar los ingredientes.';

    } finally {

      bebida.cargandoIngredientes = false;

    }
  }


  // Agregar bebida al pedido
  agregarAlPedido(bebida: any): void {

    const nuevoItem = new ItemPedido();

    nuevoItem.id = 'bebida-' + (bebida.idDrink || bebida.id);
    nuevoItem.nombre = bebida.strDrink || bebida.nombre;
    nuevoItem.precio = bebida.precio ?? 18;
    nuevoItem.imagen = bebida.strDrinkThumb || bebida.imagen;
    nuevoItem.cantidad = bebida.cantidadSeleccionada || 1;
    nuevoItem.tipo = 'bebida';

    this.pedidoService.agregar(nuevoItem);

    bebida.cantidadSeleccionada = 1;

  }

}
