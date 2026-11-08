
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {

  casillas: any[] = [];

  juegoIniciado: boolean = false;
  juegoTerminado: boolean = false;

  comidaEncontrada: boolean = false;
  bebidaEncontrada: boolean = false;

  intentos: number = 0;
  
imagenComida: string = '';
imagenBebida: string = '';

async cargarImagenes() {

  try {

    const respuestaComida = await fetch(
      'https://www.themealdb.com/api/json/v1/1/search.php?s=Gingerbread%20Waffles'
    );

    const datosComida = await respuestaComida.json();

    if (datosComida.meals && datosComida.meals.length > 0) {
      this.imagenComida = datosComida.meals[0].strMealThumb;
    }

    const respuestaBebida = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Old%20Fashioned'
    );

    const datosBebida = await respuestaBebida.json();

    if (datosBebida.drinks && datosBebida.drinks.length > 0) {
      this.imagenBebida = datosBebida.drinks[0].strDrinkThumb;
    }

  } catch (error) {
    console.error('Error al cargar las imágenes del juego:', error);
  }

}


  constructor() {
    this.crearMatriz();
    this.cargarImagenes();
  }

  // Crear las 16 casillas
  crearMatriz(): void {

    this.casillas = [];

    for (let i = 0; i < 16; i++) {
      this.casillas.push({
        tipo: 'vacio',
        descubierta: false
      });
    }

  }

  // Iniciar una nueva partida
  iniciarJuego(): void {

    this.crearMatriz();

    this.juegoIniciado = true;
    this.juegoTerminado = false;

    this.comidaEncontrada = false;
    this.bebidaEncontrada = false;

    this.intentos = 0;

    // Elegir dos posiciones aleatorias diferentes
    const posicionComida = Math.floor(Math.random() * 16);

    let posicionBebida = Math.floor(Math.random() * 16);

    while (posicionBebida === posicionComida) {
      posicionBebida = Math.floor(Math.random() * 16);
    }

    // Ubicar las imágenes
    this.casillas[posicionComida].tipo = 'comida';
    this.casillas[posicionBebida].tipo = 'bebida';

  }

  // Descubrir una casilla
  descubrirCasilla(posicion: number): void {

    if (!this.juegoIniciado || this.juegoTerminado) {
      return;
    }

    const casilla = this.casillas[posicion];

    if (casilla.descubierta) {
      return;
    }

    casilla.descubierta = true;
    this.intentos++;

    if (casilla.tipo === 'comida') {
      this.comidaEncontrada = true;
    }

    if (casilla.tipo === 'bebida') {
      this.bebidaEncontrada = true;
    }

    // Comprobar si encontró las dos imágenes
    if (this.comidaEncontrada && this.bebidaEncontrada) {
      this.juegoTerminado = true;
    }

  }

}
