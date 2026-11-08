
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pedido } from '../entidades/pedido';
import { Factura } from '../entidades/factura';

import { ServicioPedidoService } from '../servicios/servicio-pedido.service';
import { ServicioFacturaPdfService } from '../servicios/servicio-factura-pdf.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

  // Servicios
  public pedidoService = inject(ServicioPedidoService);
  private facturaPdfService = inject(ServicioFacturaPdfService);

  // Datos del pedido
  pedido: Pedido = new Pedido();
  mensajeModal: string = '';

  // Obtener los productos del carrito
  obtenerItems() {
    return this.pedidoService.itemsSignal();
  }

  // Calcular el total del pedido
  obtenerTotal(): number {
    this.pedido.items = this.obtenerItems();
    return this.pedido.calcularTotal();
  }

  // Aumentar la cantidad de un producto
  aumentar(id: string): void {
    this.pedidoService.modificarCantidad(id, 1);
  }

  // Disminuir la cantidad de un producto
  disminuir(id: string): void {
    this.pedidoService.modificarCantidad(id, -1);
  }

  // Eliminar un producto del carrito
  eliminar(id: string): void {
    this.pedidoService.eliminarItem(id);
  }

  // Confirmar pedido y generar factura PDF
  async confirmar(): Promise<void> {

    // Validar los datos del cliente
    if (!this.pedido.nombreCliente?.trim() ||
        !this.pedido.telefonoCliente?.trim() ||
        !this.pedido.direccionCliente?.trim()) {

      this.mensajeModal =
        'Por favor completa tu nombre, celular y dirección de envío.';

      return;
      
    }

    // Obtener los productos del carrito
    const items = this.obtenerItems();

    if (items.length === 0) {
      this.mensajeModal = 'No hay productos en el pedido.';
      return;
    }

    // Calcular el total
    const total = this.obtenerTotal();

    // Crear la factura utilizando la interfaz
    
const factura: Factura = {
  nombre: this.pedido.nombreCliente.trim(),
  telefono: this.pedido.telefonoCliente.trim(),
  direccion: this.pedido.direccionCliente.trim(),
  fecha: new Date(),

  productos: items.map(item => ({
    id: item.id,
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
    imagen: item.imagen
  })),

  total: total
};

  // Generar y descargar el PDF desde el servicio

    // Generar y descargar el PDF desde el servicio
    try {

      await this.facturaPdfService.generarFactura(factura);

      // Mensaje cuando el pedido se realiza correctamente
      this.mensajeModal =
        `¡Gracias ${factura.nombre}! Tu pedido por $${total.toLocaleString('es-CO')} se realizó correctamente. Se ha generado tu factura PDF.`;

    } catch (error) {

      console.error('Error al generar la factura:', error);

      this.mensajeModal =
        'No se pudo generar la factura PDF. Inténtalo nuevamente.';

    }

  }


}
