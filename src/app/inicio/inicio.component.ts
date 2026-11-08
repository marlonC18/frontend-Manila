
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioComidasService } from '../servicios/servicio-comidas/servicio-comidas.service';
import { ServicioBebidasService } from '../servicios/servicio-bebidas/servicio-bebidas.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  private comidasService = inject(ServicioComidasService);
  private bebidasService = inject(ServicioBebidasService);

  comidaEstrella: any = null;
  bebidaEstrella: any = null;

  cargandoComida: boolean = false;
  cargandoBebida: boolean = false;

  ngOnInit(): void {
    this.cargarComidaEstrella();
    this.cargarBebidaEstrella();
  }


  
  async cargarComidaEstrella() {

    this.cargandoComida = true;


    try {

      const datos = await this.comidasService.buscarPorNombre('Gingerbread Waffles');

      if (datos.meals && datos.meals.length > 0) {

        this.comidaEstrella = {
          ...datos.meals[0],
          precio: 45000,
          cantidadSeleccionada: 1,

          descripcion:
            'Esponjosos waffles horneados con especias de jengibre y canela, bañados en un dulce almíbar dorado. La combinación perfecta entre el calor de las especias orientales y la dulzura de una mañana especial.'
        };

      }

    } catch (error) {
      console.error('Error al cargar comida estrella:', error);
    } finally {
      this.cargandoComida = false;
    }

  }

  
  async cargarBebidaEstrella() {

    this.cargandoBebida = true;

    try {

      const datos = await this.bebidasService.buscarPorNombre('Old Fashioned');

      if (datos.drinks && datos.drinks.length > 0) {

        this.bebidaEstrella = {
          ...datos.drinks[0],
          precio: 28000,
          cantidadSeleccionada: 1,

          descripcion:
            'Clásico cóctel de bourbon con un toque de angostura y azúcar, adornado con cáscara de naranja y cereza confitada. El equilibrio perfecto entre la elegancia occidental y el espíritu culinario de Manila.'
        };

      }

    } catch (error) {
      console.error('Error al cargar bebida estrella:', error);
    } finally {
      this.cargandoBebida = false;
    }

  }

 
  

  
}
