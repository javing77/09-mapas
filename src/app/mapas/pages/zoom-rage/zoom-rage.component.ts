import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl  from 'mapbox-gl';


@Component({
  selector: 'app-zoom-rage',
  templateUrl: './zoom-rage.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      position: fixed;

      z-index: 999;
    }
    `
  ]
})
export class ZoomRageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] =[-74.158762, 4.646581];

  constructor() { }

  // Cuando se use un evnet listneter hay que destruirlo cuando el componente se destruya
  // De lo contrario se seguirá nuevos y events y esto consume recursos
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('move', () => {});
    this.mapa.off('zoomend', () => {});
  }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
      });

      // Listener zoom mapa
      this.mapa.on('zoom', () => {
        this.zoomLevel = this.mapa.getZoom();
      })

      this.mapa.on('zoomend', (ev) => {
        if (this.mapa.getZoom() > 18 ) {
          this.mapa.zoomTo(18);
        }
      })

      // Listener moviento Mapa
      this.mapa.on('move', (event) => {
          const target = event.target;
          const { lng, lat } = target.getCenter();
          this.center = [lng, lat];
      })

  }

  ngOnInit(): void {

  }

  zoomOut(){
    this.mapa.zoomOut();

  }


  zoomIn(){
    this.mapa.zoomIn()
  }

  zoomCambio( valor: string){
    this.mapa.zoomTo( Number(valor) )
  }



}
