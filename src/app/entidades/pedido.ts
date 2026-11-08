import { ItemPedido } from "./item-pedido";

export class Pedido {
    nombreCliente: string = "";
    telefonoCliente: string = "";
    direccionCliente: string = "";

    items: ItemPedido[] = [];
    total: number = 0;

    constructor() {}

    calcularTotal(): number {
        this.total = this.items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        return this.total;
    }
}
