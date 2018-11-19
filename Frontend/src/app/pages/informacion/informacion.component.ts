import { Component } from "@angular/core";
declare var ol: any;

@Component({
    selector: 'informacion',
    templateUrl: './informacion.component.html'
}) export class InformacionComponent {

    public latitude: number = -34.6627822;
    public longitude: number = -58.3652156;

    public map: any;

    ngOnInit() {
        this.map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
            source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([this.longitude, this.latitude]),
            zoom: 17
        })
        });
    }

}