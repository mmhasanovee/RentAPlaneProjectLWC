public with sharing class PlaneSearchFormController {
    public PlaneSearchFormController() {

    }

    @AuraEnabled(cacheable = true)
    public static List<Car_Type__c> getPlaneTypes(){
        return [Select Id, Name from Car_Type__c With Security_Enforced];
    }

    //return the list of planes
    @AuraEnabled(cacheable = true)
    public static List<Car__c> getPlanes(String planeTypeId){
        try {
            if(String.isEmpty(planeTypeId)){
                return [SELECT ID,
                               Name,Picture__c, Contact__r.Name, Geolocation__Latitude__s, Geolocation__Longitude__s
                        FROM   Car__c
                        WHERE Available_For_Rent__c = true
                        WITH SECURITY_ENFORCED

                ];
            }
            else {
                return [SELECT ID,
                               Name,Picture__c, Contact__r.Name, Geolocation__Latitude__s, Geolocation__Longitude__s
                        FROM   Car__c
                        WHERE Available_For_Rent__c = true
                        AND Car_Type__c = :planeTypeId
                        WITH SECURITY_ENFORCED

                ];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
