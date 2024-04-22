import { LightningElement, wire } from 'lwc';
import getContactListByFilter from '@salesforce/apex/ContactBrowserController.getContactListByFilter';

export default class ContactBrowser extends LightningElement {
    selectedAccounntId = "";
    selectedIndustry = "";
    @wire(getContactListByFilter, { accountId: "$selectedAccounntId", industry: "$selectedIndustry" })
        contactsFunction({data, error}){
            if (data) {
                console.log("Selected Contacts", data);
            }else if (error) {
                console.log("Selected contacts failed", error);
            }
        };

    handleFilterChange(event) {
        this.selectedAccounntId = event.detail.accountId;
        this.selectedIndustry = event.detail.industry;
    }
}