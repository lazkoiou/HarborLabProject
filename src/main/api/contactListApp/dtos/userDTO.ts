
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

    static getRandomDefaultUser(): UserDTO {
        const randomNum = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
        return new UserDTO(
            'TesterFirstName', 
            'TesterLastName', 
            `testerdefault${randomNum}@example.com`, 
            'testerDefaultPassword');
    };

}