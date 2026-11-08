
import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ItemPedido } from '../entidades/item-pedido';

@Injectable({
  providedIn: 'root'
})
export class ServicioPedidoService {
  private platformId = inject(PLATFORM_ID);

  // Signal que mantiene el estado global de los ítems en el carrito
  public itemsSignal = signal<ItemPedido[]>(this.obtenerInicial());

  private obtenerInicial(): ItemPedido[] {
    if (isPlatformBrowser(this.platformId)) {
      const guardado = localStorage.getItem('manilaPedido');
      return guardado ? JSON.parse(guardado) : [];
    }
    return [];
  }

  // Agregar productos al pedido
  agregar(item: ItemPedido): void {
    const lista = [...this.itemsSignal()];

    const existe = lista.some(i => i.id === item.id);

    const nuevaLista = existe
      ? lista.map(i =>
          i.id === item.id
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i
        )
      : [...lista, item];

    this.actualizar(nuevaLista);
  }

  // Modificar cantidad de un producto
  modificarCantidad(id: string, cambio: number): void {
    let lista = [...this.itemsSignal()];

    const item = lista.find(i => i.id === id);

    if (item) {
      const nuevaCantidad = item.cantidad + cambio;

      if (nuevaCantidad <= 0) {
        lista = lista.filter(i => i.id !== id);
      } else {
        lista = lista.map(i =>
          i.id === id
            ? { ...i, cantidad: nuevaCantidad }
            : i
        );
      }

      this.actualizar(lista);
    }
  }

  // Eliminar producto completamente de la lista
  eliminarItem(id: string): void {
    const lista = this.itemsSignal().filter(i => i.id !== id);
    this.actualizar(lista);
  }

  // Limpiar el pedido
  limpiar(): void {
    this.itemsSignal.set([]);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('manilaPedido');
    }
  }

  // Actualizar Signal y localStorage
  private actualizar(lista: ItemPedido[]): void {
    this.itemsSignal.set(lista);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('manilaPedido', JSON.stringify(lista));
    }
  }
}
