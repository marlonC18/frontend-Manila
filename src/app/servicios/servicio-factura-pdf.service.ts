
import { Injectable } from '@angular/core';
import { Factura } from '../entidades/factura';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ServicioFacturaPdfService {

  // Colores del restaurante MANILA
  private readonly colorDorado = '#d4af37';
  private readonly colorEsmeralda = '#144f3d';
  private readonly colorOscuro = '#080a0c';

  constructor() { }

  // Generar y descargar la factura
  async generarFactura(factura: Factura): Promise<void> {

    const pdf = new jsPDF();

    // Cargar el logo del restaurante
    let logo: string | null = null;

    try {
      logo = await this.cargarLogo();
    } catch (error) {
      console.error('No se pudo cargar el logo:', error);
    }

    // Formato de precios colombianos
    const formatoPrecio = (precio: number): string => {
      return '$' + precio.toLocaleString('es-CO');
    };

    // =====================================
    // ENCABEZADO DE LA FACTURA
    // =====================================

    pdf.setFillColor(this.colorOscuro);
    pdf.rect(0, 0, 210, 45, 'F');

    // Logo
    if (logo) {
      pdf.addImage(logo, 'PNG', 15, 7, 30, 30);
    }

    // Nombre del restaurante
    pdf.setTextColor(this.colorDorado);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(25);

    pdf.text('MANILA', 120, 18, {
      align: 'center'
    });

    pdf.setFontSize(10);

    pdf.text('RESTAURANTE Y COCTELERIA', 120, 28, {
      align: 'center'
    });

    // Título de la factura
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);

    pdf.text('FACTURA DE COMPRA', 120, 37, {
      align: 'center'
    });

    // =====================================
    // FECHA Y HORA
    // =====================================

    pdf.setTextColor(40, 40, 40);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    pdf.text(
      'Fecha: ' + factura.fecha.toLocaleDateString('es-CO'),
      15,
      55
    );

    pdf.text(
      'Hora: ' + factura.fecha.toLocaleTimeString('es-CO'),
      15,
      62
    );

    // =====================================
    // DATOS DEL CLIENTE
    // =====================================

    pdf.setTextColor(this.colorEsmeralda);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(13);

    pdf.text('DATOS DEL CLIENTE', 15, 76);

    pdf.setTextColor(40, 40, 40);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);

    pdf.text('Nombre: ' + factura.nombre, 15, 85);
    pdf.text('Telefono: ' + factura.telefono, 15, 93);

    const direccion = pdf.splitTextToSize(
      'Direccion: ' + factura.direccion,
      175
    );

    pdf.text(direccion, 15, 101);

    // =====================================
    // TABLA DE PRODUCTOS
    // =====================================

    let y = 117 + (direccion.length - 1) * 5;

    // Encabezado de la tabla
    const encabezadoTabla = (): void => {

      pdf.setFillColor(this.colorEsmeralda);
      pdf.rect(15, y - 7, 180, 11, 'F');

      pdf.setTextColor(255, 255, 255);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);

      pdf.text('Producto', 20, y);

      pdf.text('Precio', 110, y, {
        align: 'right'
      });

      pdf.text('Cantidad', 145, y, {
        align: 'right'
      });

      pdf.text('Subtotal', 190, y, {
        align: 'right'
      });

      y += 12;
    };

    encabezadoTabla();

    // =====================================
    // PRODUCTOS COMPRADOS
    // =====================================

    factura.productos.forEach((producto, indice) => {

      const nombre = pdf.splitTextToSize(
        producto.nombre,
        65
      );

      const altoFila = Math.max(
        12,
        nombre.length * 5 + 5
      );

      // Crear nueva página si es necesario
      if (y + altoFila > 265) {

        pdf.addPage();
        y = 25;

        encabezadoTabla();
      }

      // Alternar el color de las filas
      if (indice % 2 === 0) {

        pdf.setFillColor(245, 245, 245);

        pdf.rect(
          15,
          y - 5,
          180,
          altoFila,
          'F'
        );
      }

      pdf.setTextColor(40, 40, 40);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);

      // Nombre del producto
      pdf.text(nombre, 20, y);

      // Precio unitario
      pdf.text(
        formatoPrecio(producto.precio),
        110,
        y,
        { align: 'right' }
      );

      // Cantidad
      pdf.text(
        String(producto.cantidad),
        145,
        y,
        { align: 'right' }
      );

      // Subtotal
      pdf.text(
        formatoPrecio(
          producto.precio * producto.cantidad
        ),
        190,
        y,
        { align: 'right' }
      );

      y += altoFila;

    });

    // =====================================
    // TOTAL DEL PEDIDO
    // =====================================

    if (y + 40 > 280) {

      pdf.addPage();
      y = 25;

    }

    y += 8;

    // Línea dorada
    pdf.setDrawColor(this.colorDorado);
    pdf.setLineWidth(0.7);

    pdf.line(115, y, 195, y);

    y += 12;

    // Total destacado
    pdf.setTextColor(this.colorEsmeralda);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);

    pdf.text(
      'TOTAL: ' + formatoPrecio(factura.total),
      190,
      y,
      { align: 'right' }
    );

    // =====================================
    // MENSAJE DE AGRADECIMIENTO
    // =====================================

    pdf.setTextColor(40, 40, 40);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(11);

    pdf.text(
      'Gracias por comprar en MANILA',
      105,
      y + 12,
      { align: 'center' }
    );

    // =====================================
    // DESCARGAR FACTURA
    // =====================================

    pdf.save('Factura_MANILA.pdf');

  }

  // =====================================
  // CARGAR LOGO DEL RESTAURANTE
  // =====================================

  private cargarLogo(): Promise<string> {

    return new Promise((resolve, reject) => {

      const imagen = new Image();

      imagen.onload = () => {

        const canvas = document.createElement('canvas');

        canvas.width = imagen.naturalWidth;
        canvas.height = imagen.naturalHeight;

        const contexto = canvas.getContext('2d');

        if (!contexto) {
          reject(new Error('No se pudo procesar el logo'));
          return;
        }

        contexto.drawImage(imagen, 0, 0);

        resolve(canvas.toDataURL('image/png'));

      };

      imagen.onerror = () => {
        reject(new Error('No se pudo cargar el logo'));
      };

      imagen.src = 'assets/Manila1.jpg';

    });

  }

}
