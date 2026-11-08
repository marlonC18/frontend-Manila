import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComidasComponent } from './comidas/comidas.component';
import { BebidasComponent } from './bebidas/bebidas.component';
import { PedidoComponent } from './pedido/pedido.component';
import { JuegoComponent } from './juego/juego.component';
import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'comidas', component: ComidasComponent },
  { path: 'bebidas', component: BebidasComponent },
  { path: 'pedido', component: PedidoComponent },
  { path: 'juego', component: JuegoComponent },
  {path: 'footer', component: FooterComponent},
  { path: '**', redirectTo: 'inicio' },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', redirectTo: 'inicio' }
];
