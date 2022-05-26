import { LightningElement, wire } from 'lwc';
import getPlaneTypes from '@salesforce/apex/PlaneSearchFormController.getPlaneTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class PlaneSearchForm extends NavigationMixin(LightningElement) {
    planeTypes;

    @wire(getPlaneTypes)
    wiredPlaneTypes({error, data}){
        if(data){
            this.planeTypes = [{value:'',label:'All Types'}];
            data.forEach(element => {
                const planeType = {};
                planeType.value = element.Id;
                planeType.label = element.Name;
                this.planeTypes.push(planeType);
            });
        }
        else if(error){
            console.log('Error', error.body.message,'error');
        }
    }

    handlePlaneTypeChange(event) {
        const planeTypeId = event.detail.value;

        const planeTypeSelectionChangeEvent = new CustomEvent('planetypeselect',{detail:planeTypeId});
        this.dispatchEvent(planeTypeSelectionChangeEvent);
    }

    createNewPlaneType(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        })
    }

    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}