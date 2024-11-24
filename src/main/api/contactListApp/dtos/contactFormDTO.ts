
/**
 * DTO with the fields for Add Contact form
 */
export class ContactFormDTO {

    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    };

    static getDefaultContactForm(): ContactFormDTO {
        return new ContactFormDTO(
            'FirstName', 
            'LastName' 
        )
    };

}