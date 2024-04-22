public with sharing class ContactBrowserController{
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContactListByFilter(String accountId, String industry){
        String query = 'SELECT Id, Name, Title, Email, Phone, PhotoUrl FROM Contact';
        List<String> filters = new List<String>();

        if (String.isNotBlank(accountId)){
            filters.add('accountId = :accountId');
        }

        if (String.isNotBlank(industry)){
            filters.add('Contact.Account.Industry = :industry');
        }
        if (!filters.isEmpty()){
            query += ' WHERE ' + String.join(filters, ' AND ');
        }
        query += ' WITH USER_MODE ';
        query += ' ORDER BY Name';
        System.debug('query ' + query);
        List<Contact> contactList = Database.query(query);
        return contactList;
    }

}