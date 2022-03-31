import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta    : string;
  nombnre : string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li {
      cursor: pointer
    }
    `
  ]
})
export class MenuComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombnre: 'FullScreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombnre: 'Zoom-Range'
    },
    {
      ruta: '/mapas/marcadores',
      nombnre: 'Marcadores'
    },
    {
      ruta: '/mapas/propiedades',
      nombnre: 'Propiedades'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
