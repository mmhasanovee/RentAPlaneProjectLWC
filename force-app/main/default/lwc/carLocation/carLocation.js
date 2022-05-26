import { LightningElement, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import LL from '@salesforce/resourceUrl/Leaflet';
import {loadStyle, loadScript} from 'lightning/platformResourceLoader';

export default class CarLocation extends LightningElement {
    car;
    leafletloaded = false;
    
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener('carSelected',this.fetchCarDetails, this);
    }
    
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    
    renderedCallback(){
        if(!this.leafletloaded){
            Promise.all([
                loadScript(this, LL + '/leaflet.js'),
                loadStyle(this, LL + '/leaflet.css')
            ]).then(()=>{
                this.leafletloaded = true;
            }).catch((error =>{
                console.log('ERROR', error.body.message,'error');
            }));
        }
    }
    fetchCarDetails(payload){
        this.car = payload.car;
        if(!this.leafletLoaded){
            if(!this.leafletMap){
                const map = this.template.querySelector('.map');
                if(map){
                    this.leafletMap = L.map(map, {zoomControl : true} ).setView([42.356045, -71.085650], 13);
                    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Tiles For Rent A Car'}).addTo(this.leafletMap);
                }
            }
                if(this.car){
                    const location = [this.car.Geolocation__Latitude__s, this.car.Geolocation__Longitude__s];

                    const leafletMarker = L.marker(location);
                    leafletMarker.addTo(this.leafletMap);
                    this.leafletMap.setView(location);
                }
            
        }
    }
    
    get hasCar(){
        if(this.car){
            return 'slds-is-expanded';
        }
        return 'slds-is-collapsed';
    }
}