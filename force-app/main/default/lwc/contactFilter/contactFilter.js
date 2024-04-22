import { LightningElement, wire } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class ContactFilter extends NavigationMixin(LightningElement) {
    selectedAccountId = "";
    isButtonDisabled = true;
    selectedIndustry = "";

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues, { recordTypeId: "$accountInfo.data.defaultRecordTypeId", fieldApiName: ACCOUNT_INDUSTRY })
    industryPicklist;

    selectedRecordHandler(event){
       this.selectedAccountId =  event.detail;
       console.log("this.selectedAccountId: ", this.selectedAccountId);
       if (this.selectedAccountId) {
        this.isButtonDisabled = false;
       }else{
        this.isButtonDisabled = true;
       }
       this.notifyFilterChange();
    }
    handleChange(event){
        this.selectedIndustry = event.target.value;
        this.notifyFilterChange();
    }
     
    addNewContact(){
        let defaultValue = encodeDefaultFieldValues({
            AccountId: this.selectedAccountId
        });
        let pageRef = {
        type: 'standard__objectPage',
        attributes: {
        objectApiName: 'Contact',
        actionName: 'new'
        },
        state: {
        defaultFieldValues : defaultValue,
        nooverride: '1'}
    };
    this[NavigationMixin.Navigate](pageRef);
}

notifyFilterChange(){
    let myCustomEvent = new CustomEvent("filterchange", {
        detail : {
            accountId : this.selectedAccountId,
            industry : this.selectedIndustry
        }
    });
    this.dispatchEvent(myCustomEvent);
}


}