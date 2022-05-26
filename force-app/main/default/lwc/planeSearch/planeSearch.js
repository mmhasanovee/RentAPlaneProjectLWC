import { LightningElement } from 'lwc';

export default class PlaneSearch extends LightningElement {
    //holding the id for the planeType
    planeTypeId;
    
    planeTypeSelectHandler(event){
        this.planeTypeId = event.detail;
    }
}