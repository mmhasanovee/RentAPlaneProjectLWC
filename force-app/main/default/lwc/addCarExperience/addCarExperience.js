import { LightningElement, api } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c'
    
export default class AddCarExperience extends LightningElement {
    //hold title
    title;
    //hold description
    description;
    @api carId;

    
    handleTitleChange(event){
        this.title = event.target.value;
    }

    handleDescriptionChange(event){
        this.description = event.target.value;
    }

    addNewExperience(event){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.title;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.description;
        fields[CAR_FIELD.fieldApiName] = this.carId;
        
        const recordInput = {apiName: EXPERIENCE_OBJECT.objectApiName, fields};
        createRecord(recordInput).then( carExperience =>{
            console.log('life is kekw, sucessfully inserted the record');
        }).catch(error =>{
            console.log('life is not kekw, error inserting the record');
        })
    }
}