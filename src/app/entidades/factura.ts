export interface ProductoFactura {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

export interface Factura {
  nombre: string;
  telefono: string;
  direccion: string;
  fecha: Date;
  productos: ProductoFactura[];
  total: number;
}