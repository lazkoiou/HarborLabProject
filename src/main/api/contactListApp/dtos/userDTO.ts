
export class UserDTO {
    
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    };

    static getDefault(): UserDTO {
        return new UserDTO(
            'TesterFirstName', 
            'TesterLastName', 
            'testerDefault123@example.com', 
            'testerDefaultPassword');
    }



}