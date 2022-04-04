import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MacadorColor {
  color   : string;
  marker?  : mapboxgl.Marker;
  centro?  : [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li {
      cursor: pointer;
    }

    `
  ]
})
export class MarcadoresComponent implements OnInit, AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] =[-74.158762, 4.646581];

  marcadores: MacadorColor[] = [];



  constructor() { }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel // starting zoom
      });

      // const markerHtml: HTMLElement = document.createElement('div');
      // markerHtml.innerHTML = 'Hola Mundo';

      // const marker = new mapboxgl.Marker()
      //   .setLngLat( this.center )
      //   .addTo(this.mapa);

      this.leerLocalStorage();

    }

  ngOnInit(): void {
  }

  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

      this.marcadores.push( {
        color,
        marker: nuevoMarcador
      } );

      this.guardarMacadoresLocalStorage()

      nuevoMarcador.on('dragend', () => {
        this.guardarMacadoresLocalStorage();
      });
  }

  irMarcador( marker: mapboxgl.Marker ){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMacadoresLocalStorage(){

    const lngLatArr: MacadorColor[]= []

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat  } = m.marker!.getLngLat()

      lngLatArr.push({
        color:color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerLocalStorage(){
    if( !localStorage.getItem('marcadores') )
    {
      return;
    }

    const lngLatArr: MacadorColor[] = JSON.parse(localStorage.getItem('marcadores')! );

    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color     : m.color,
        draggable : true
      })
        .setLngLat( m.centro! )
        .addTo( this.mapa )


        this.marcadores.push({
          marker: newMarker,
          color: m.color
        });


        newMarker.on('dragend', () => {
          this.guardarMacadoresLocalStorage();
        });

    });



  }

  borrarMarcador( i: number ){

    console.log('Borrar');


    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMacadoresLocalStorage();

  }

}
